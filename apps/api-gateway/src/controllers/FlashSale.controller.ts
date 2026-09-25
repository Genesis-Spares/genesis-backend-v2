import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Inject,
    Param,
    Patch,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../common/guards/permissions.guard';
import { Permissions } from '../common/decorators/permissions.decorator';

/**
 * Admin flash-sale management. Guarded by `catalog:manage` (same permission the
 * dashboard uses for products/categories). The public/customer view is served
 * unauthenticated from StorefrontController (`GET /api/storefront/flash-sale`).
 */
@Controller('flash-sale')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Permissions('catalog:manage')
export class FlashSaleController {
    constructor(
        @Inject('PRODUCT_SERVICE') private readonly productClient: ClientProxy,
    ) { }

    @Get()
    async get() {
        return this.forward('flashsale.admin.get', {});
    }

    @Patch()
    async updateConfig(@Body() body: { isActive?: boolean; title?: string; endsAt?: string | null }) {
        return this.forward('flashsale.config.update', body);
    }

    @Put('items')
    async setItems(@Body() body: { productIds: string[] }) {
        return this.forward('flashsale.items.set', { productIds: body.productIds ?? [] });
    }

    @Post('items')
    async addItem(@Body() body: { productId: string; salePrice?: number }) {
        return this.forward('flashsale.item.add', body);
    }

    @Delete('items/:productId')
    async removeItem(@Param('productId') productId: string) {
        return this.forward('flashsale.item.remove', { productId });
    }

    private forward(pattern: string, payload: unknown) {
        return firstValueFrom(
            this.productClient.send(pattern, payload).pipe(
                catchError((error) => {
                    const status =
                        typeof error?.statusCode === 'number'
                            ? error.statusCode
                            : typeof error?.status === 'number'
                                ? error.status
                                : HttpStatus.INTERNAL_SERVER_ERROR;
                    throw new HttpException(
                        {
                            statusCode: status,
                            message: error?.message || 'Flash sale service error',
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
