// apps/order-service/src/order.service.ts
import { randomUUID } from 'crypto';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { PrismaService } from '../libs/prisma/prisma.service';
import { Prisma } from './generated/prisma';
import {
    CreateOrderDto,
    UpdateOrderDto,
    UpdateOrderStatusDto,
    UpdatePaymentStatusDto,
    UpdateTrackingDto,
    AddTrackingEventDto,
    CancelOrderDto,
    CreateOrderNoteDto,
    UpdateOrderNoteDto,
    OrderQueryDto,
} from './dto/order.dto';

/**
 * Order lifecycle — the only moves an admin can make. Enforced here so the
 * dashboard, bulk actions and any future client all obey the same rules.
 * Cancelling after dispatch is a return, which isn't modelled yet.
 */
const TRANSITIONS: Record<string, string[]> = {
    PENDING: ['CONFIRMED', 'CANCELLED'],
    CONFIRMED: ['PROCESSING', 'CANCELLED'],
    PROCESSING: ['SHIPPED', 'CANCELLED'],
    SHIPPED: ['DELIVERED'],
    DELIVERED: ['REFUNDED'],
    CANCELLED: ['REFUNDED'], // only when money was taken — see allowedTransitions()
    REFUNDED: [],
};

/** Customer-facing default line for each status when the admin leaves the note blank. */
const DEFAULT_STATUS_NOTE: Record<string, string> = {
    CONFIRMED: 'Your order has been confirmed',
    PROCESSING: "We're picking and packing your parts",
    SHIPPED: 'Your order is on its way',
    DELIVERED: 'Your order has been delivered',
    CANCELLED: 'Your order has been cancelled',
    REFUNDED: 'Your refund has been issued',
};

export function allowedTransitions(order: { status: string; paymentStatus: string }): string[] {
    return (TRANSITIONS[order.status] ?? []).filter(
        (next) => next !== 'REFUNDED' || ['PAID', 'PARTIALLY_REFUNDED'].includes(order.paymentStatus),
    );
}

type TimelineEvent = {
    type?: 'STATUS' | 'TRACKING' | 'PAYMENT' | 'UPDATE';
    status: string;
    note?: string | null;
    location?: string | null;
    isPublic?: boolean;
    changedBy?: string;
    actor?: string;
};

@Injectable()
export class OrderService {
    private readonly logger = new Logger(OrderService.name);

    constructor(
        private readonly prisma: PrismaService,
        @Inject('PRODUCT_SERVICE') private readonly productClient: ClientProxy,
        @Inject('NOTIFICATION_SERVICE') private readonly notificationClient: ClientProxy,
        private readonly config: ConfigService,
    ) { }

    /**
     * Tell the customer about an order event (email, + SMS when configured).
     * Fire-and-forget: a notification problem must never fail the order action.
     */
    private notifyCustomer(
        event: 'order.placed' | 'order.status.changed',
        order: {
            id: string; orderNumber: string; customerId: string; customerEmail: string; customerName: string;
            customerPhone?: string | null; status: string; paymentStatus: string; paymentMethod?: string | null;
            currency: string; subtotal: unknown; shippingAmount: unknown; discountAmount: unknown; total: unknown;
            shippingAddress: unknown; trackingCarrier?: string | null; trackingNumber?: string | null;
            estimatedDeliveryAt?: Date | null; cancelReason?: string | null;
            items?: { name: string; sku: string; quantity: number; unitPrice: unknown; subtotal: unknown }[];
        },
        extra: { note?: string | null; location?: string | null } = {},
    ) {
        try {
            const storefront = (this.config.get<string>('STOREFRONT_URL') || 'http://localhost:3000').replace(/\/$/, '');
            const address = order.shippingAddress as { line1?: string; line2?: string; city?: string } | null;
            this.notificationClient.emit(event, {
                orderId: order.id,
                orderNumber: order.orderNumber,
                customerId: order.customerId,
                email: order.customerEmail,
                name: order.customerName,
                phone: order.customerPhone ?? null,
                status: order.status,
                paymentStatus: order.paymentStatus,
                paymentMethod: order.paymentMethod ?? null,
                currency: order.currency,
                subtotal: Number(order.subtotal),
                shipping: Number(order.shippingAmount),
                discount: Number(order.discountAmount),
                total: Number(order.total),
                items: (order.items ?? []).map((i) => ({ name: i.name, sku: i.sku, quantity: i.quantity, unitPrice: Number(i.unitPrice), lineTotal: Number(i.subtotal) })),
                address: address ? [address.line1, address.line2 && `near ${address.line2}`, address.city].filter(Boolean).join(', ') : null,
                carrier: order.trackingCarrier ?? null,
                trackingNumber: order.trackingNumber ?? null,
                estimatedDeliveryAt: order.estimatedDeliveryAt ?? null,
                cancelReason: order.cancelReason ?? null,
                note: extra.note ?? null,
                location: extra.location ?? null,
                orderUrl: `${storefront}/account/orders/${order.id}`,
            }).subscribe({ error: (e) => this.logger.warn(`Notification for ${order.orderNumber} not queued: ${(e as Error)?.message}`) });
        } catch (e) {
            this.logger.warn(`Notification for ${order.orderNumber} not queued: ${(e as Error)?.message}`);
        }
    }

    private product<T>(pattern: string, payload: unknown): Promise<T> {
        return firstValueFrom(this.productClient.send<T>(pattern, payload).pipe(timeout(10_000)));
    }

    // ============================================
    // HELPERS
    // ============================================

    private async generateOrderNumber(): Promise<string> {
        const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        for (let attempt = 0; attempt < 5; attempt++) {
            const random = Math.floor(1000 + Math.random() * 9000);
            const candidate = `GNS-${datePart}-${random}`;
            const existing = await this.prisma.order.findUnique({ where: { orderNumber: candidate } });
            if (!existing) return candidate;
        }
        // Extremely unlikely fallback
        return `GNS-${datePart}-${Date.now().toString().slice(-6)}`;
    }

    /** `seq` spaces rows written together 1ms apart so the timeline keeps their order. */
    private timelineRow(orderId: string, e: TimelineEvent, seq = 0): Prisma.OrderStatusHistoryCreateManyInput {
        return {
            orderId,
            createdAt: new Date(Date.now() + seq),
            type: e.type ?? 'STATUS',
            status: e.status,
            note: e.note?.trim() || null,
            location: e.location?.trim() || null,
            isPublic: e.isPublic ?? true,
            changedBy: e.changedBy,
            actor: e.actor,
        };
    }

    private async findOrThrow(id: string) {
        const order = await this.prisma.order.findUnique({ where: { id } });
        if (!order) {
            throw new RpcException({ statusCode: 404, message: 'Order not found', error: 'Not Found' });
        }
        return order;
    }

    private badRequest(message: string): never {
        throw new RpcException({ statusCode: 400, message, error: 'Bad Request' });
    }

    // ============================================
    // ORDER CRUD
    // ============================================

    /**
     * @param initial optional starting state — used by shopper checkout to
     * record the (simulated) payment in the same write as the order itself.
     */
    async createOrder(
        dto: CreateOrderDto,
        initial?: { id?: string; status: string; paymentStatus: string; history: { status: string; note: string; actor?: string; type?: string }[] },
    ) {
        try {
            const subtotal = dto.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
            const taxAmount = dto.taxAmount ?? 0;
            const shippingAmount = dto.shippingAmount ?? 0;
            const discountAmount = dto.discountAmount ?? 0;
            const total = subtotal + taxAmount + shippingAmount - discountAmount;

            const orderNumber = await this.generateOrderNumber();

            const order = await this.prisma.order.create({
                data: {
                    id: initial?.id,
                    orderNumber,
                    customerId: dto.customerId,
                    customerEmail: dto.customerEmail,
                    customerName: dto.customerName,
                    customerPhone: dto.customerPhone,
                    currency: dto.currency || 'KES',
                    subtotal,
                    taxAmount,
                    shippingAmount,
                    discountAmount,
                    total,
                    couponCode: dto.couponCode,
                    customerNote: dto.customerNote,
                    paymentMethod: dto.paymentMethod,
                    status: initial?.status,
                    paymentStatus: initial?.paymentStatus,
                    shippingAddress: dto.shippingAddress as unknown as Prisma.InputJsonValue,
                    billingAddress: (dto.billingAddress ?? dto.shippingAddress) as unknown as Prisma.InputJsonValue,
                    items: {
                        create: dto.items.map((item) => ({
                            productId: item.productId,
                            variantId: item.variantId,
                            sku: item.sku,
                            name: item.name,
                            image: item.image,
                            unitPrice: item.unitPrice,
                            unitCost: item.unitCost ?? null,
                            quantity: item.quantity,
                            subtotal: item.unitPrice * item.quantity,
                            attributes: item.attributes as unknown as Prisma.InputJsonValue,
                        })),
                    },
                    statusHistory: {
                        create: initial?.history.map((h, i) => ({ ...h, createdAt: new Date(Date.now() + i) }))
                            ?? { status: 'PENDING', note: 'Order created' },
                    },
                },
                include: { items: true },
            });

            this.logger.log(`Order created: ${order.orderNumber} (${order.id})`);
            return order;
        } catch (error) {
            this.logger.error('Error creating order:', error);
            if (error instanceof RpcException) throw error;
            throw new RpcException({
                statusCode: 500,
                message: 'Failed to create order',
                error: 'Internal Server Error',
            });
        }
    }

    /**
     * Shopper checkout. Payment is SIMULATED for now: M-Pesa / card orders are
     * marked PAID immediately, cash-on-delivery stays PENDING until delivery.
     * Swap this for a real gateway callback (e.g. M-Pesa STK) later.
     */
    async placeOrder(dto: CreateOrderDto) {
        // Take stock first (all lines or none) under the id the order will get,
        // so a sold-out part fails checkout instead of creating an unfulfillable order.
        const orderId = randomUUID();
        try {
            await this.product('inventory.order.commit', {
                orderId,
                items: dto.items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
            });
        } catch (e) {
            const err = e as { statusCode?: number; message?: string };
            if (err?.statusCode === 409 || err?.statusCode === 400) {
                throw new RpcException({ statusCode: err.statusCode, message: err.message, error: 'Conflict' });
            }
            this.logger.error(`Stock reservation failed for ${orderId}`, e as Error);
            throw new RpcException({ statusCode: 503, message: "We couldn't confirm stock right now. Please try again.", error: 'Service Unavailable' });
        }
        try {
            const order = await this.placeOrderRecord(orderId, dto);
            this.notifyCustomer('order.placed', order);
            return order;
        } catch (e) {
            await this.product('inventory.order.release', { orderId, reason: 'ORDER_FAILED' })
                .catch((re) => this.logger.error(`Stock for failed order ${orderId} NOT released — fix manually`, re as Error));
            throw e;
        }
    }

    private async placeOrderRecord(orderId: string, dto: CreateOrderDto) {
        const payOnDelivery = dto.paymentMethod === 'cod';
        const method = { mpesa: 'M-Pesa', card: 'card', cod: 'cash on delivery' }[dto.paymentMethod ?? ''] ?? dto.paymentMethod;
        return this.createOrder(dto, {
            id: orderId,
            status: 'CONFIRMED',
            paymentStatus: payOnDelivery ? 'PENDING' : 'PAID',
            history: [
                { status: 'PENDING', note: 'Order placed', actor: 'customer' },
                {
                    status: 'CONFIRMED',
                    actor: 'system',
                    note: payOnDelivery
                        ? 'Order confirmed — payment due on delivery'
                        : `Payment received via ${method} (simulated)`,
                },
            ],
        });
    }

    async findAllOrders(query: OrderQueryDto) {
        try {
            const {
                search,
                status,
                paymentStatus,
                customerId,
                dateFrom,
                dateTo,
                sortBy = 'createdAt',
                sortOrder = 'desc',
                page = 1,
                limit = 20,
            } = query;

            const where: Prisma.OrderWhereInput = {};

            if (search) {
                where.OR = [
                    { orderNumber: { contains: search, mode: 'insensitive' } },
                    { customerEmail: { contains: search, mode: 'insensitive' } },
                    { customerName: { contains: search, mode: 'insensitive' } },
                    { customerPhone: { contains: search, mode: 'insensitive' } },
                ];
            }

            if (status) where.status = status;
            if (paymentStatus) where.paymentStatus = paymentStatus;
            if (query.productId) where.items = { some: { productId: query.productId } };
            if (customerId) where.customerId = customerId;

            if (dateFrom || dateTo) {
                where.createdAt = {};
                if (dateFrom) where.createdAt.gte = new Date(dateFrom);
                if (dateTo) where.createdAt.lte = new Date(dateTo);
            }

            const orderBy: Prisma.OrderOrderByWithRelationInput = {};
            orderBy[sortBy] = sortOrder;

            const skip = (page - 1) * limit;

            const [orders, total] = await Promise.all([
                this.prisma.order.findMany({
                    where,
                    orderBy,
                    skip,
                    take: limit,
                    include: {
                        // with a product filter, return that product's line so callers can show qty / line total
                        ...(query.productId ? { items: { where: { productId: query.productId } } } : {}),
                        _count: { select: { items: true, notes: true } },
                    },
                }),
                this.prisma.order.count({ where }),
            ]);

            return {
                data: orders,
                meta: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit),
                },
            };
        } catch (error) {
            this.logger.error('Error finding orders:', error);
            throw new RpcException({
                statusCode: 500,
                message: 'Failed to fetch orders',
                error: 'Internal Server Error',
            });
        }
    }

    async findOrderById(id: string) {
        const order = await this.prisma.order.findUnique({
            where: { id },
            include: {
                items: true,
                statusHistory: { orderBy: { createdAt: 'desc' } },
                _count: { select: { notes: true } },
            },
        });

        if (!order) {
            throw new RpcException({
                statusCode: 404,
                message: 'Order not found',
                error: 'Not Found',
            });
        }

        // the dashboard renders its action buttons from this list
        return { ...order, allowedTransitions: allowedTransitions(order) };
    }

    async findOrderByNumber(orderNumber: string) {
        const order = await this.prisma.order.findUnique({
            where: { orderNumber },
            include: { items: true, statusHistory: { orderBy: { createdAt: 'desc' } } },
        });

        if (!order) {
            throw new RpcException({
                statusCode: 404,
                message: 'Order not found',
                error: 'Not Found',
            });
        }

        return order;
    }

    async findOrdersByCustomer(customerId: string, page = 1, limit = 20, status?: string) {
        const where: Prisma.OrderWhereInput = { customerId };
        if (status) where.status = status;

        const skip = (page - 1) * limit;

        const [orders, total] = await Promise.all([
            this.prisma.order.findMany({
                where,
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
                include: { items: true },
            }),
            this.prisma.order.count({ where }),
        ]);

        return {
            data: orders,
            meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
        };
    }

    async updateOrder(id: string, dto: UpdateOrderDto) {
        const existing = await this.prisma.order.findUnique({ where: { id } });
        if (!existing) {
            throw new RpcException({ statusCode: 404, message: 'Order not found', error: 'Not Found' });
        }

        const order = await this.prisma.order.update({
            where: { id },
            data: {
                shippingAddress: dto.shippingAddress
                    ? (dto.shippingAddress as unknown as Prisma.InputJsonValue)
                    : undefined,
                billingAddress: dto.billingAddress
                    ? (dto.billingAddress as unknown as Prisma.InputJsonValue)
                    : undefined,
                paymentMethod: dto.paymentMethod,
                customerNote: dto.customerNote,
                couponCode: dto.couponCode,
            },
            include: { items: true },
        });

        return order;
    }

    // ============================================
    // STATUS / PAYMENT / TRACKING
    // ============================================

    async updateOrderStatus(id: string, dto: UpdateOrderStatusDto) {
        const existing = await this.findOrThrow(id);
        const next = dto.status;

        if (next === existing.status) this.badRequest(`Order is already ${next.toLowerCase()}`);
        const allowed = allowedTransitions(existing);
        if (!allowed.includes(next)) {
            this.badRequest(
                allowed.length
                    ? `Can't move a ${existing.status.toLowerCase()} order to ${next.toLowerCase()}. Next step: ${allowed.map((s) => s.toLowerCase()).join(' or ')}.`
                    : `A ${existing.status.toLowerCase()} order can't be changed.`,
            );
        }

        const data: Prisma.OrderUpdateInput = { status: next };
        const events: TimelineEvent[] = [];
        const actorFields = { changedBy: dto.changedBy, actor: dto.actor };

        if (next === 'SHIPPED') {
            const carrier = dto.trackingCarrier?.trim() || existing.trackingCarrier;
            if (!carrier) this.badRequest('Add the courier or rider before marking the order as shipped.');
            data.shippedAt = new Date();
            data.trackingCarrier = carrier;
            if (dto.trackingNumber?.trim()) data.trackingNumber = dto.trackingNumber.trim();
            if (dto.estimatedDeliveryAt) data.estimatedDeliveryAt = new Date(dto.estimatedDeliveryAt);
        }
        if (next === 'DELIVERED') {
            data.deliveredAt = new Date();
            if (dto.paymentCollected && existing.paymentStatus === 'PENDING') {
                data.paymentStatus = 'PAID';
                events.push({ type: 'PAYMENT', status: next, note: 'Payment collected on delivery', isPublic: false, ...actorFields });
            }
        }
        if (next === 'CANCELLED') {
            data.cancelledAt = new Date();
            data.cancelReason = dto.note?.trim() || null;
        }
        if (next === 'REFUNDED') {
            data.paymentStatus = 'REFUNDED';
        }

        const carrierLine = next === 'SHIPPED' ? ` with ${data.trackingCarrier as string}` : '';
        events.unshift({
            type: 'STATUS',
            status: next,
            note: dto.note?.trim() || `${DEFAULT_STATUS_NOTE[next] ?? next}${carrierLine}`,
            location: dto.location,
            isPublic: dto.isPublic ?? true,
            ...actorFields,
        });

        const [order] = await this.prisma.$transaction([
            this.prisma.order.update({ where: { id }, data, include: { items: true } }),
            this.prisma.orderStatusHistory.createMany({ data: events.map((e, i) => this.timelineRow(id, e, i)) }),
        ]);

        if (next === 'CANCELLED') await this.restock(order.id, order.status);

        // confirmed / processing are visible on the tracker but not worth an email
        if (['SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED'].includes(next)) {
            const isPublic = dto.isPublic ?? true;
            this.notifyCustomer('order.status.changed', order, {
                note: isPublic ? dto.note?.trim() || null : null,
                location: isPublic ? dto.location?.trim() || null : null,
            });
        }

        this.logger.log(`Order ${order.orderNumber} status: ${existing.status} -> ${next} by ${dto.actor ?? 'unknown'}`);
        return { ...order, allowedTransitions: allowedTransitions(order) };
    }

    async updatePaymentStatus(id: string, dto: UpdatePaymentStatusDto) {
        const existing = await this.findOrThrow(id);
        if (dto.paymentStatus === existing.paymentStatus) this.badRequest(`Payment is already ${dto.paymentStatus.toLowerCase()}`);

        const label = dto.paymentStatus.toLowerCase().replace('_', ' ');
        const [order] = await this.prisma.$transaction([
            this.prisma.order.update({
                where: { id },
                data: { paymentStatus: dto.paymentStatus, paymentMethod: dto.paymentMethod ?? existing.paymentMethod },
                include: { items: true },
            }),
            this.prisma.orderStatusHistory.create({
                data: this.timelineRow(id, {
                    type: 'PAYMENT',
                    status: existing.status,
                    note: `Payment marked ${label}${dto.note?.trim() ? ` — ${dto.note.trim()}` : ''}`,
                    isPublic: false,
                    changedBy: dto.changedBy,
                    actor: dto.actor,
                }),
            }),
        ]);
        return { ...order, allowedTransitions: allowedTransitions(order) };
    }

    async updateTracking(id: string, dto: UpdateTrackingDto) {
        const existing = await this.findOrThrow(id);
        if (!dto.trackingNumber?.trim() && !dto.trackingCarrier?.trim() && !dto.estimatedDeliveryAt) {
            this.badRequest('Nothing to update — add a courier, tracking number or delivery estimate.');
        }

        const data: Prisma.OrderUpdateInput = {};
        if (dto.trackingCarrier?.trim()) data.trackingCarrier = dto.trackingCarrier.trim();
        if (dto.trackingNumber?.trim()) data.trackingNumber = dto.trackingNumber.trim();
        if (dto.estimatedDeliveryAt) data.estimatedDeliveryAt = new Date(dto.estimatedDeliveryAt);

        const parts = [
            data.trackingCarrier || data.trackingNumber
                ? `Tracking: ${[data.trackingCarrier ?? existing.trackingCarrier, data.trackingNumber ?? existing.trackingNumber].filter(Boolean).join(' ')}`
                : null,
            dto.estimatedDeliveryAt
                ? `Estimated delivery ${new Date(dto.estimatedDeliveryAt).toLocaleDateString('en-KE', { weekday: 'short', day: 'numeric', month: 'short' })}`
                : null,
        ].filter(Boolean);

        const [order] = await this.prisma.$transaction([
            this.prisma.order.update({ where: { id }, data, include: { items: true } }),
            this.prisma.orderStatusHistory.create({
                data: this.timelineRow(id, {
                    type: 'TRACKING',
                    status: existing.status,
                    note: parts.join(' · '),
                    changedBy: dto.changedBy,
                    actor: dto.actor,
                }),
            }),
        ]);
        return { ...order, allowedTransitions: allowedTransitions(order) };
    }

    /**
     * Return a cancelled order's stock. Never blocks the cancellation itself:
     * if the product service is down, leave an internal note so staff fix it.
     */
    private async restock(orderId: string, status: string) {
        try {
            const res = await this.product<{ released: number }>('inventory.order.release', { orderId, reason: 'ORDER_CANCELLED' });
            if (res?.released) {
                await this.prisma.orderStatusHistory.create({
                    data: this.timelineRow(orderId, { type: 'UPDATE', status, note: `Stock returned to inventory (${res.released} product${res.released === 1 ? '' : 's'})`, isPublic: false, actor: 'system' }, 5),
                });
            }
        } catch (e) {
            this.logger.error(`Restock failed for cancelled order ${orderId}`, e as Error);
            await this.prisma.orderStatusHistory.create({
                data: this.timelineRow(orderId, { type: 'UPDATE', status, note: 'Stock could NOT be returned automatically — adjust inventory manually', isPublic: false, actor: 'system' }, 5),
            });
        }
    }

    /** Shipment / progress update ("Arrived at Nakuru depot") without a status change. */
    async addTrackingEvent(id: string, dto: AddTrackingEventDto) {
        const existing = await this.findOrThrow(id);
        if (!dto.note?.trim()) this.badRequest('Write a short update message.');

        return this.prisma.orderStatusHistory.create({
            data: this.timelineRow(id, {
                type: dto.isPublic === false ? 'UPDATE' : 'TRACKING',
                status: existing.status,
                note: dto.note,
                location: dto.location,
                isPublic: dto.isPublic ?? true,
                changedBy: dto.changedBy,
                actor: dto.actor,
            }),
        });
    }

    async cancelOrder(id: string, dto: CancelOrderDto) {
        const existing = await this.findOrThrow(id);
        if (existing.status === 'CANCELLED') return existing; // idempotent
        return this.updateOrderStatus(id, {
            status: 'CANCELLED',
            note: dto.reason,
            changedBy: dto.changedBy,
            actor: dto.actor,
        });
    }

    /**
     * Has this customer received this product? Used to gate product reviews to
     * verified buyers. Returns the most recent DELIVERED order containing it.
     */
    async findDeliveredPurchase(customerId: string, productId: string) {
        if (!customerId || !productId) return null;
        return this.prisma.order.findFirst({
            where: { customerId, status: 'DELIVERED', items: { some: { productId } } },
            orderBy: { deliveredAt: 'desc' },
            select: { id: true, orderNumber: true, deliveredAt: true },
        });
    }

    /** Mirrors the soft-delete convention used elsewhere in the platform: "delete" cancels rather than removes the record. */
    async deleteOrder(id: string) {
        return this.cancelOrder(id, { reason: 'Deleted by admin' });
    }

    // ============================================
    // STATS
    // ============================================

    async getOrderStats() {
        const DAY = 24 * 60 * 60 * 1000;
        const now = new Date();
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const last30 = new Date(startOfToday.getTime() - 29 * DAY); // today + previous 29 days
        const prev30 = new Date(last30.getTime() - 30 * DAY);
        const notCancelled: Prisma.OrderWhereInput = { status: { notIn: ['CANCELLED', 'REFUNDED'] } };

        const [totalOrders, statusCounts, revenueAgg, recent, previous] = await Promise.all([
            this.prisma.order.count(),
            this.prisma.order.groupBy({ by: ['status'], _count: { _all: true } }),
            this.prisma.order.aggregate({
                _sum: { total: true },
                where: { paymentStatus: 'PAID' },
            }),
            // last 30 days, for the daily series + current-period KPIs
            this.prisma.order.findMany({
                where: { createdAt: { gte: last30 }, ...notCancelled },
                select: { createdAt: true, total: true, paymentStatus: true },
            }),
            this.prisma.order.findMany({
                where: { createdAt: { gte: prev30, lt: last30 }, ...notCancelled },
                select: { total: true, paymentStatus: true },
            }),
        ]);

        const byStatus = statusCounts.reduce<Record<string, number>>((acc, row) => {
            acc[row.status] = row._count._all;
            return acc;
        }, {});

        // revenue = paid orders only, consistent with totalRevenue
        const paidSum = (rows: { total: Prisma.Decimal; paymentStatus: string }[]) =>
            rows.reduce((sum, r) => sum + (r.paymentStatus === 'PAID' ? Number(r.total) : 0), 0);

        const dayKey = (d: Date) =>
            `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        const daily = Array.from({ length: 30 }, (_, i) => ({
            date: dayKey(new Date(last30.getTime() + i * DAY)),
            orders: 0,
            revenue: 0,
        }));
        const index = new Map(daily.map((d, i) => [d.date, i]));
        for (const o of recent) {
            const i = index.get(dayKey(o.createdAt));
            if (i === undefined) continue;
            daily[i].orders += 1;
            if (o.paymentStatus === 'PAID') daily[i].revenue += Number(o.total);
        }

        const today = daily[daily.length - 1];

        return {
            totalOrders,
            totalRevenue: revenueAgg._sum.total ?? 0,
            byStatus,
            period: {
                days: 30,
                orders: recent.length,
                revenue: paidSum(recent),
                previousOrders: previous.length,
                previousRevenue: paidSum(previous),
            },
            today: { orders: today.orders, revenue: today.revenue },
            daily,
        };
    }

    async getOrderStatsByCustomer(customerId: string) {
        const [totalOrders, revenueAgg, lastOrder] = await Promise.all([
            this.prisma.order.count({ where: { customerId } }),
            this.prisma.order.aggregate({
                _sum: { total: true },
                where: { customerId, paymentStatus: 'PAID' },
            }),
            this.prisma.order.findFirst({
                where: { customerId },
                orderBy: { createdAt: 'desc' },
                select: { id: true, orderNumber: true, status: true, total: true, createdAt: true },
            }),
        ]);

        return {
            totalOrders,
            totalSpent: revenueAgg._sum.total ?? 0,
            lastOrder,
        };
    }

    // ============================================
    // STATUS HISTORY
    // ============================================

    async getOrderHistory(orderId: string) {
        return this.prisma.orderStatusHistory.findMany({
            where: { orderId },
            orderBy: { createdAt: 'desc' },
        });
    }

    /**
     * Global feed across every order's status history — the "Logs" panel on
     * the admin dashboard. Distinct from getOrderHistory, which is scoped to
     * one order. Each row is joined with its order's id/number/customer so
     * the UI can render a readable line without a second lookup.
     */
    async getRecentActivity(limit = 20) {
        const safeLimit = Number(limit) > 0 ? Number(limit) : 20;

        return this.prisma.orderStatusHistory.findMany({
            orderBy: { createdAt: 'desc' },
            take: safeLimit,
            include: {
                order: {
                    select: { id: true, orderNumber: true, customerName: true },
                },
            },
        });
    }

    // ============================================
    // NOTES
    // ============================================

    async createNote(orderId: string, dto: CreateOrderNoteDto) {
        const order = await this.prisma.order.findUnique({ where: { id: orderId } });
        if (!order) {
            throw new RpcException({ statusCode: 404, message: 'Order not found', error: 'Not Found' });
        }

        return this.prisma.orderNote.create({
            data: {
                orderId,
                content: dto.content,
                authorId: dto.authorId,
                isInternal: dto.isInternal ?? true,
            },
        });
    }

    async getNotes(orderId: string) {
        return this.prisma.orderNote.findMany({
            where: { orderId },
            orderBy: { createdAt: 'desc' },
        });
    }

    async updateNote(noteId: string, dto: UpdateOrderNoteDto) {
        const existing = await this.prisma.orderNote.findUnique({ where: { id: noteId } });
        if (!existing) {
            throw new RpcException({ statusCode: 404, message: 'Note not found', error: 'Not Found' });
        }

        return this.prisma.orderNote.update({
            where: { id: noteId },
            data: { content: dto.content, isInternal: dto.isInternal },
        });
    }

    async deleteNote(noteId: string) {
        const existing = await this.prisma.orderNote.findUnique({ where: { id: noteId } });
        if (!existing) {
            throw new RpcException({ statusCode: 404, message: 'Note not found', error: 'Not Found' });
        }

        await this.prisma.orderNote.delete({ where: { id: noteId } });
        return { success: true };
    }

    // ============================================
    // BULK / EXPORT
    // ============================================

    async bulkCancelOrders(ids: string[], by: { changedBy?: string; actor?: string } = {}) {
        const results = await Promise.allSettled(ids.map((id) => this.cancelOrder(id, { reason: 'Bulk cancel', ...by })));
        const succeeded = results.filter((r) => r.status === 'fulfilled').length;
        return { requested: ids.length, succeeded, failed: ids.length - succeeded };
    }

    async searchOrders(query: string, limit = 20) {
        const orders = await this.prisma.order.findMany({
            where: {
                OR: [
                    { orderNumber: { contains: query, mode: 'insensitive' } },
                    { customerEmail: { contains: query, mode: 'insensitive' } },
                    { customerName: { contains: query, mode: 'insensitive' } },
                ],
            },
            take: limit,
            orderBy: { createdAt: 'desc' },
        });

        return { query, count: orders.length, orders };
    }
}
