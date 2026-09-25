import {
    ParseUUIDPipe,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Inject,
    Param,
    Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { ProductQueryDto } from 'apps/product-service/src/dto/product.dto';

/**
 * Public storefront API — NO authentication.
 *
 * The admin-facing `products` and `categories` controllers are guarded by
 * JwtAuthGuard (+ permissions), which is correct for the dashboard but would
 * 401 an anonymous shopper. This controller exposes the read-only slice the
 * customer storefront needs, over the same product-service message patterns,
 * and always scopes results to active catalog items.
 */
@Controller('storefront')
export class StorefrontController {
    constructor(
        @Inject('PRODUCT_SERVICE') private readonly productClient: ClientProxy,
    ) { }

    // ============================================
    // PRODUCTS (read-only, active items only)
    // ============================================

    @Get('products')
    async listProducts(@Query() query: ProductQueryDto) {
        // Force the public catalog to only ever return active products.
        return this.forward('product.find.all', { ...(query || {}), isActive: true });
    }

    @Get('products/search')
    async searchProducts(
        @Query('q') query: string,
        @Query('limit') limit?: number,
    ) {
        return this.forward('product.search', { query, limit: limit || 20 });
    }

    // ============================================
    // VEHICLE FINDER (Make → Model → Year)
    // ============================================

    @Get('vehicles/makes')
    async vehicleMakes() {
        return this.forward('vehicle.makes', {});
    }

    @Get('vehicles/models')
    async vehicleModels(@Query('make') make?: string) {
        return this.forward('vehicle.models', { make: (make ?? '').slice(0, 40) });
    }

    @Get('vehicles/years')
    async vehicleYears(@Query('make') make?: string, @Query('model') model?: string) {
        return this.forward('vehicle.years', { make: (make ?? '').slice(0, 40), model: (model ?? '').slice(0, 60) });
    }

    /** Published reviews + rating summary for a product. */
    @Get('products/:id/reviews')
    async productReviews(
        @Param('id', ParseUUIDPipe) id: string,
        @Query('page') page?: string,
        @Query('limit') limit?: string,
        @Query('sort') sort?: string,
    ) {
        const s = ['recent', 'highest', 'lowest'].includes(sort ?? '') ? sort : 'recent';
        return this.forward('review.list.product', { productId: id, page: Number(page) || 1, limit: Number(limit) || 10, sort: s });
    }

    @Get('products/slug/:slug')
    async productBySlug(@Param('slug') slug: string) {
        return this.forward('product.find.by.slug', { slug });
    }

    @Get('products/category/:categoryId')
    async productsByCategory(
        @Param('categoryId') categoryId: string,
        @Query('page') page?: number,
        @Query('limit') limit?: number,
    ) {
        return this.forward('product.by.category', {
            categoryId,
            page: page || 1,
            limit: limit || 20,
        });
    }

    @Get('products/brand/:brand')
    async productsByBrand(
        @Param('brand') brand: string,
        @Query('limit') limit?: number,
    ) {
        return this.forward('product.by.brand', { brand, limit: limit || 20 });
    }

    @Get('products/:id')
    async productById(@Param('id') id: string) {
        return this.forward('product.find.one', { id });
    }

    // ============================================
    // FLASH SALE (public)
    // ============================================

    @Get('flash-sale')
    async flashSale() {
        return this.forward('flashsale.public.get', {});
    }

    // ============================================
    // CATEGORIES (read-only)
    // ============================================

    @Get('categories')
    async listCategories() {
        return this.forward('category.find.all', {});
    }

    @Get('categories/tree')
    async categoryTree() {
        return this.forward('category.tree', {});
    }

    @Get('categories/slug/:slug')
    async categoryBySlug(@Param('slug') slug: string) {
        return this.forward('category.find.by.slug', { slug });
    }

    // ============================================
    // FORWARD + ERROR NORMALIZATION
    // ============================================

    private forward(pattern: string, payload: unknown) {
        return firstValueFrom(
            this.productClient.send(pattern, payload).pipe(
                catchError((error) => {
                    const { status, message, error: errorType } = this.normalizeError(error);
                    throw new HttpException(
                        {
                            statusCode: status,
                            message,
                            error: errorType || HttpStatus[status] || 'Unknown Error',
                            timestamp: new Date().toISOString(),
                            path: pattern,
                        },
                        status,
                    );
                }),
            ),
        );
    }

    private normalizeError(error: any): { status: number; message: string; error?: string } {
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Storefront service error';
        let errorType = 'Internal Server Error';

        if (!error) return { status, message, error: errorType };

        const possibleStatus = error.status || error.statusCode || error.code;
        if (typeof possibleStatus === 'number' && possibleStatus >= 100 && possibleStatus <= 599) {
            status = possibleStatus;
        }

        if (error.message) {
            message = error.message;
        } else if (typeof error === 'string') {
            message = error;
        } else if (error.error && typeof error.error === 'string') {
            message = error.error;
        }

        if (error.error && typeof error.error === 'string') {
            errorType = error.error;
        } else if (error.name) {
            errorType = error.name;
        } else {
            errorType = HttpStatus[status] || 'Unknown Error';
        }

        if (process.env.NODE_ENV === 'production' && status === HttpStatus.INTERNAL_SERVER_ERROR) {
            message = 'Internal server error';
            errorType = 'Internal Server Error';
        }

        return { status, message, error: errorType };
    }
}
