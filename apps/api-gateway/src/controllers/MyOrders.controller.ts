import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Inject,
    Param,
    ParseUUIDPipe,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { type JwtPayload } from '../common/types/jwt-payload.type';
import { CheckoutDto, DELIVERY_METHODS } from '../dto/Checkout.dto';
import { CancelOrderBodyDto, CreateReturnDto } from '../dto/Returns.dto';

interface ProductSnapshot {
    id: string;
    sku: string;
    name: string;
    price: string | number;
    costPrice?: string | number | null;
    isActive: boolean;
    isInStock: boolean;
    images?: { url: string }[];
}

/**
 * Shopper-facing orders. Any authenticated user can place and read their
 * OWN orders — scoped to their JWT `sub`, no admin permission required.
 * (Admin order management lives in Order.controller.ts under /orders.)
 */
@Controller('me/orders')
@UseGuards(JwtAuthGuard)
export class MyOrdersController {
    constructor(
        @Inject('ORDER_SERVICE') private readonly orderClient: ClientProxy,
        @Inject('PRODUCT_SERVICE') private readonly productClient: ClientProxy,
    ) { }

    @Post()
    async checkout(@CurrentUser() user: JwtPayload, @Body() dto: CheckoutDto) {
        if (dto.paymentMethod === 'cod' && dto.deliveryMethod !== 'same-day') {
            throw new HttpException('Pay on delivery is only available for same-day delivery in Nairobi', HttpStatus.BAD_REQUEST);
        }
        const phone = normalizeKenyanPhone(dto.phone);
        if (!phone) {
            throw new HttpException('Enter a valid phone number, e.g. 0712 345 678', HttpStatus.BAD_REQUEST);
        }

        // merge duplicate lines, then price each one from the product service
        const qty = new Map<string, number>();
        for (const i of dto.items) qty.set(i.productId, (qty.get(i.productId) ?? 0) + i.quantity);

        const items = await Promise.all(
            [...qty].map(async ([productId, quantity]) => {
                const p = await this.send<ProductSnapshot>(this.productClient, 'product.find.one', { id: productId })
                    .catch((e: HttpException) => {
                        if (e.getStatus?.() === HttpStatus.NOT_FOUND) return null;
                        throw e;
                    });
                if (!p || !p.isActive) {
                    throw new HttpException('One of the items in your cart is no longer available', HttpStatus.CONFLICT);
                }
                if (!p.isInStock) {
                    throw new HttpException(`${p.name} is out of stock`, HttpStatus.CONFLICT);
                }
                return {
                    productId: p.id,
                    sku: p.sku,
                    name: p.name,
                    image: p.images?.[0]?.url,
                    unitPrice: Number(p.price),
                    // snapshot the cost so profit reports stay right after cost prices change
                    ...(p.costPrice != null ? { unitCost: Number(p.costPrice) } : {}),
                    quantity,
                };
            }),
        );

        const delivery = DELIVERY_METHODS[dto.deliveryMethod];
        const order = await this.send(this.orderClient, 'order.place', {
            customerId: user.sub,
            customerEmail: user.email,
            customerName: dto.fullName.trim(),
            customerPhone: phone,
            items,
            shippingAddress: {
                fullName: dto.fullName.trim(),
                line1: dto.address.trim(),
                line2: dto.landmark?.trim() || undefined,
                city: dto.city.trim(),
                country: 'Kenya',
                phone,
            },
            paymentMethod: dto.paymentMethod,
            shippingAmount: delivery.fee,
            currency: 'KES',
            customerNote: [`Delivery: ${delivery.label}`, dto.note?.trim()].filter(Boolean).join(' — '),
        });

        // the order is placed — empty the saved cart (best effort; the storefront clears its copy too)
        await this.send(this.productClient, 'cart.clear', { userId: user.sub }).catch(() => undefined);
        return order;
    }

    @Get()
    async list(
        @CurrentUser() user: JwtPayload,
        @Query('page') page?: string,
        @Query('limit') limit?: string,
        @Query('status') status?: string,
    ) {
        return this.send(this.orderClient, 'order.find.by.customer', {
            customerId: user.sub,
            page: Math.max(1, Number(page) || 1),
            limit: Math.min(50, Math.max(1, Number(limit) || 20)),
            status: status || undefined,
        });
    }

    /** Cancel before the order is being prepared (PENDING / CONFIRMED). */
    @Post(':id/cancel')
    async cancel(@CurrentUser() user: JwtPayload, @Param('id', ParseUUIDPipe) id: string, @Body() dto: CancelOrderBodyDto) {
        await this.send(this.orderClient, 'order.customer.cancel', { orderId: id, customerId: user.sub, reason: dto.reason });
        return { success: true };
    }

    /** What can be returned from this order, until when, and existing returns. */
    @Get(':id/returns')
    async returnEligibility(@CurrentUser() user: JwtPayload, @Param('id', ParseUUIDPipe) id: string) {
        return this.send(this.orderClient, 'return.eligibility', { orderId: id, customerId: user.sub });
    }

    @Post(':id/returns')
    async createReturn(@CurrentUser() user: JwtPayload, @Param('id', ParseUUIDPipe) id: string, @Body() dto: CreateReturnDto) {
        return this.send(this.orderClient, 'return.create', { ...dto, orderId: id, customerId: user.sub });
    }

    @Get(':id')
    async findOne(@CurrentUser() user: JwtPayload, @Param('id', ParseUUIDPipe) id: string) {
        const order = await this.send<{
            customerId: string;
            statusHistory?: { isPublic?: boolean; type?: string; status: string; note?: string; location?: string; createdAt: string; id: string }[];
            allowedTransitions?: string[];
            _count?: unknown;
            cancelReason?: string | null;
        }>(this.orderClient, 'order.find.one', { id });
        // 404 rather than 403 so order ids of other customers aren't confirmed to exist
        if (order.customerId !== user.sub) {
            throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
        }
        // strip admin-only data: internal timeline entries, who made each change, admin actions
        const { allowedTransitions: _t, _count: _c, ...rest } = order;
        return {
            ...rest,
            statusHistory: (order.statusHistory ?? [])
                .filter((h) => h.isPublic !== false)
                .map(({ id, type, status, note, location, createdAt }) => ({ id, type, status, note, location, createdAt })),
        };
    }

    private send<T = unknown>(client: ClientProxy, pattern: string, payload: unknown): Promise<T> {
        return firstValueFrom(
            client.send<T>(pattern, payload).pipe(
                catchError((error) => {
                    const status =
                        typeof error?.statusCode === 'number'
                            ? error.statusCode
                            : typeof error?.status === 'number'
                                ? error.status
                                : HttpStatus.INTERNAL_SERVER_ERROR;
                    const message = error?.message || 'Order service error';
                    throw new HttpException(
                        {
                            statusCode: status,
                            message,
                            error: error?.error || HttpStatus[status] || 'Error',
                            timestamp: new Date().toISOString(),
                            path: pattern,
                        },
                        status,
                    );
                }),
            ),
        );
    }
}

/** "0712 345 678" / "254712345678" / "+254 712…" → "+254712345678"; null if unrecognisable. */
function normalizeKenyanPhone(raw: string): string | null {
    let d = raw.replace(/[\s\-()]/g, '');
    if (/^0[17]\d{8}$/.test(d)) d = '+254' + d.slice(1);
    else if (/^254[17]\d{8}$/.test(d)) d = '+' + d;
    else if (/^[17]\d{8}$/.test(d)) d = '+254' + d;
    return /^\+\d{10,15}$/.test(d) ? d : null;
}
