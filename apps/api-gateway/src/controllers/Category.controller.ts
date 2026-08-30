import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { CategoryQueryDto, CreateCategoryDto, ReorderCategoryDto, UpdateCategoryDto } from "apps/product-service/src/dto/category.dto";
import { ClientProxy } from "@nestjs/microservices";
import { catchError, firstValueFrom } from "rxjs";
import { PermissionsGuard } from "../common/guards/permissions.guard";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { Permissions } from "../common/decorators/permissions.decorator";

@Controller('categories')
@UseGuards(JwtAuthGuard)
export class CategoryController {
    constructor(
        @Inject('PRODUCT_SERVICE')
        private readonly productClient: ClientProxy,
    ) { }

    // ============================================
    // CREATE CATEGORY
    // ============================================
    @Post()
    @UseGuards(PermissionsGuard)
    @Permissions('catalog:manage')
    async createCategory(@Body() data: CreateCategoryDto) {
        return await this.forward('category.create', data);
    }

    // ============================================
    // GET ALL CATEGORIES
    // ============================================
    @Get()
    @UseGuards(PermissionsGuard)
    @Permissions('catalog:manage', 'category:read')
    async findAllCategories(@Query() query?: CategoryQueryDto) {
        return await this.forward('category.find.all', query);
    }

    // ============================================
    // GET CATEGORY TREE
    // ============================================
    @Get('tree')
    @UseGuards(PermissionsGuard)
    @Permissions('category:read')
    async getCategoryTree() {
        return this.forward('category.tree', {});
    }

    // ============================================
    // GET CATEGORY BY ID
    // ============================================
    @Get(':id')
    @UseGuards(PermissionsGuard)
    @Permissions('catalog:manage', 'category:read')
    async findCategoryById(@Param('id') id: string) {
        return this.forward('category.find.one', { id });
    }

    // ============================================
    // GET CATEGORY BY SLUG
    // ============================================
    @Get('slug/:slug')
    @UseGuards(PermissionsGuard)
    @Permissions('catalog:manage', 'category:read')
    async findCategoryBySlug(@Param('slug') slug: string) {
        return this.forward('category.find.by.slug', { slug });
    }

    // ============================================
    // UPDATE CATEGORY
    // ============================================
    @Put(':id')
    @UseGuards(PermissionsGuard)
    @Permissions('catalog:manage', 'category:update')
    async updateCategory(
        @Param('id') id: string,
        @Body() dto: UpdateCategoryDto,
    ) {
        return this.forward('category.update', { id, dto });
    }

    // ============================================
    // DELETE CATEGORY
    // ============================================
    @Delete(':id')
    @UseGuards(PermissionsGuard)
    @Permissions('catalog:manage', 'category:delete')
    async deleteCategory(@Param('id') id: string) {
        return this.forward('category.delete', { id });
    }

    // ============================================
    // REORDER CATEGORY
    // ============================================
    @Post('reorder')
    @UseGuards(PermissionsGuard)
    @Permissions('catalog:manage')
    async reorderCategory(@Body() dto: ReorderCategoryDto) {
        return this.forward('category.reorder', dto);
    }

    // ============================================
    // BULK CREATE CATEGORIES
    // ============================================
    @Post('bulk')
    @UseGuards(PermissionsGuard)
    @Permissions('catalog:manage')
    async bulkCreateCategories(@Body() data: { categories: CreateCategoryDto[] }) {
        return this.forward('category.bulk.create', data);
    }

    // ============================================
    // VALIDATE CATEGORY
    // ============================================
    @Post('validate')
    @UseGuards(PermissionsGuard)
    @Permissions('catalog:manage')
    async validateCategory(@Body() data: { name: string; parentId?: string }) {
        return this.forward('category.validate', data);
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

