import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, Patch, Post, Put, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { ClientProxy } from "@nestjs/microservices";
import { PermissionsGuard } from "../common/guards/permissions.guard";
import { Permissions } from "../common/decorators/permissions.decorator";
import { CreateProductDto, ProductQueryDto, UpdateInventoryDto, UpdateProductDto } from "apps/product-service/src/dto/product.dto";
import { catchError, firstValueFrom } from "rxjs";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { type JwtPayload } from "../common/types/jwt-payload.type";

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
    constructor(@Inject('PRODUCT_SERVICE') private readonly productClient: ClientProxy) { }

    // ============================================
    // PRODUCT CRUD
    // ============================================

    @Post()
    @UseGuards(PermissionsGuard)
    @Permissions('catalog:manage')
    async createProduct(@Body() dto: CreateProductDto) {
        return this.forward('product.create', dto);
    }

    @Get()
    async findAllProducts(@Query() query: ProductQueryDto) {
        return this.forward('product.find.all', query || {});
    }

    @Get('search')
    async searchProducts(
        @Query('q') query: string,
        @Query('limit') limit?: number,
    ) {
        return this.forward('product.search', { query, limit: limit || 20 });
    }

    @Get('search/identifier')
    async findProductByUniqueIdentifier(
        @Query('q') query: string,
        @Query('limit') limit?: number,
    ) {
        return this.forward('product.by.identifier', { query, limit: limit || 20 });
    }

    @Get('brand/:brand')
    async findProductsByBrand(
        @Param('brand') brand: string,
        @Query('limit') limit?: number,
    ) {
        return this.forward('product.by.brand', { brand, limit: limit || 20 });
    }

    @Get('category/:categoryId')
    async findProductsByCategory(
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

    @Get(':id')
    async findProductById(@Param('id') id: string) {
        return this.forward('product.find.one', { id });
    }

    @Get('slug/:slug')
    async findProductBySlug(@Param('slug') slug: string) {
        return this.forward('product.find.by.slug', { slug });
    }

    @Put(':id')
    @UseGuards(PermissionsGuard)
    @Permissions('catalog:manage')
    async updateProduct(@CurrentUser() user: JwtPayload, @Param('id') id: string, @Body() dto: UpdateProductDto) {
        return this.forward('product.update', { id, dto, actor: user?.email });
    }

    @Delete(':id')
    @UseGuards(PermissionsGuard)
    @Permissions('catalog:manage')
    async deleteProduct(@Param('id') id: string) {
        return this.forward('product.delete', { id });
    }

    // ============================================
    // INVENTORY MANAGEMENT
    // ============================================

    @Patch(':id/inventory')
    @UseGuards(PermissionsGuard)
    @Permissions('catalog:manage')
    async updateInventory(@Param('id') id: string, @Body() dto: UpdateInventoryDto) {
        return this.forward('product.inventory.update', {
            productId: id,
            stockQty: dto.stockQty,
        });
    }

    @Get(':id/check-inventory')
    async checkInventory(
        @Param('id') id: string,
        @Query('quantity') quantity?: number,
    ) {
        return this.forward('product.inventory.check', {
            productId: id,
            quantity: quantity || 1,
        });
    }

    // ============================================
    // VARIANTS
    // ============================================

    @Post(':id/variants')
    @UseGuards(PermissionsGuard)
    @Permissions('catalog:manage')
    async addProductVariant(
        @Param('id') productId: string,
        @Body() dto: any,
    ) {
        return this.forward('product.variant.create', { productId, variant: dto });
    }

    @Put('variants/:variantId')
    @UseGuards(PermissionsGuard)
    @Permissions('catalog:manage')
    async updateProductVariant(@Param('variantId') variantId: string, @Body() dto: any) {
        return this.forward('product.variant.update', { variantId, dto });
    }

    @Delete('variants/:variantId')
    @UseGuards(PermissionsGuard)
    @Permissions('catalog:manage')
    async deleteProductVariant(@Param('variantId') variantId: string) {
        return this.forward('product.variant.delete', { variantId });
    }

    // ============================================
    // BULK OPERATIONS
    // ============================================

    @Post('bulk')
    @UseGuards(PermissionsGuard)
    @Permissions('catalog:manage')
    async bulkCreateProducts(@Body() data: { products: CreateProductDto[] }) {
        return this.forward('product.bulk.create', data);
    }

    @Put('bulk')
    @UseGuards(PermissionsGuard)
    @Permissions('catalog:manage')
    async bulkUpdateProducts(@Body() data: { products: { id: string; dto: UpdateProductDto }[] }) {
        return this.forward('product.bulk.update', data);
    }

    private forward(pattern: string, payload: unknown) {
        return firstValueFrom(
            this.productClient.send(pattern, payload).pipe(
                catchError((error) => {
                    console.error(`Error in pattern ${pattern}:`, error);

                    // Extract and normalize error
                    const { status, message, error: errorType } = this.normalizeError(error);

                    throw new HttpException(
                        {
                            statusCode: status,
                            message: message,
                            error: errorType || HttpStatus[status] || 'Unknown Error',
                            timestamp: new Date().toISOString(),
                            path: pattern,
                        },
                        status
                    );
                }),
            ),
        );
    }

    // ============================================
    // ERROR NORMALIZATION
    // ============================================
    private normalizeError(error: any): { status: number; message: string; error?: string } {
        // Default values
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Product service error';
        let errorType = 'Internal Server Error';

        if (!error) {
            return { status, message, error: errorType };
        }

        // Check if it's an RpcException with proper structure
        if (error.statusCode) {
            if (typeof error.statusCode === 'number') {
                status = error.statusCode;
            } else if (typeof error.statusCode === 'string') {
                // Map string status codes
                const statusMap: Record<string, number> = {
                    'BAD_REQUEST': HttpStatus.BAD_REQUEST,
                    'UNAUTHORIZED': HttpStatus.UNAUTHORIZED,
                    'FORBIDDEN': HttpStatus.FORBIDDEN,
                    'NOT_FOUND': HttpStatus.NOT_FOUND,
                    'CONFLICT': HttpStatus.CONFLICT,
                    'INTERNAL_SERVER_ERROR': HttpStatus.INTERNAL_SERVER_ERROR,
                };
                status = statusMap[error.statusCode.toUpperCase()] || HttpStatus.BAD_REQUEST;
            }
        }

        // Check for valid numeric status
        const possibleStatus = error.status || error.statusCode || error.code;
        if (typeof possibleStatus === 'number' && possibleStatus >= 100 && possibleStatus <= 599) {
            status = possibleStatus;
        }

        // Check for valid string status that needs mapping
        if (typeof possibleStatus === 'string') {
            const statusMap: Record<string, number> = {
                'error': HttpStatus.BAD_REQUEST,
                'bad_request': HttpStatus.BAD_REQUEST,
                'bad-request': HttpStatus.BAD_REQUEST,
                'unauthorized': HttpStatus.UNAUTHORIZED,
                'forbidden': HttpStatus.FORBIDDEN,
                'not_found': HttpStatus.NOT_FOUND,
                'not-found': HttpStatus.NOT_FOUND,
                'conflict': HttpStatus.CONFLICT,
                'validation': HttpStatus.UNPROCESSABLE_ENTITY,
                'unprocessable_entity': HttpStatus.UNPROCESSABLE_ENTITY,
                'server_error': HttpStatus.INTERNAL_SERVER_ERROR,
                'internal_server_error': HttpStatus.INTERNAL_SERVER_ERROR,
                'success': HttpStatus.OK,
                'created': HttpStatus.CREATED,
                'accepted': HttpStatus.ACCEPTED,
                'no_content': HttpStatus.NO_CONTENT,
                'bad_gateway': HttpStatus.BAD_GATEWAY,
                'service_unavailable': HttpStatus.SERVICE_UNAVAILABLE,
                'gateway_timeout': HttpStatus.GATEWAY_TIMEOUT,
            };

            const mappedStatus = statusMap[possibleStatus.toLowerCase()];
            if (mappedStatus) {
                status = mappedStatus;
            }
        }

        // Get message from various sources
        if (error.message) {
            message = error.message;
        } else if (error.error) {
            message = typeof error.error === 'string' ? error.error : JSON.stringify(error.error);
        } else if (error.data?.message) {
            message = error.data.message;
        } else if (typeof error === 'string') {
            message = error;
        }

        // Get error type
        if (error.error && typeof error.error === 'string') {
            errorType = error.error;
        } else if (error.name) {
            errorType = error.name;
        } else {
            errorType = HttpStatus[status] || 'Unknown Error';
        }

        // Ensure we don't expose internal errors in production
        if (process.env.NODE_ENV === 'production' && status === HttpStatus.INTERNAL_SERVER_ERROR) {
            message = 'Internal server error';
            errorType = 'Internal Server Error';
        }

        return { status, message, error: errorType };
    }
}