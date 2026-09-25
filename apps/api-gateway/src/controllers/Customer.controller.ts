import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, Patch, Post, Put, Query, UseGuards, Req } from "@nestjs/common";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { ClientProxy } from "@nestjs/microservices";
import { PermissionsGuard } from "../common/guards/permissions.guard";
import { Permissions } from "../common/decorators/permissions.decorator";
import {
    CreateCustomerDto,
    CustomerQueryDto,
    UpdateCustomerDto,
    AddressDto,
    UpdateAddressDto,
    CreateNoteDto,
    CustomerPreferenceDto,
    UpdateNoteDto,
} from "apps/customer-service/src/dto/customer.dto";
import { catchError, firstValueFrom } from "rxjs";

@Controller('customers')
@UseGuards(JwtAuthGuard)
export class CustomerController {
    constructor(
        @Inject('CUSTOMER_SERVICE') private readonly customerClient: ClientProxy,
        @Inject('ORDER_SERVICE') private readonly orderClient: ClientProxy,
    ) { }

    // ============================================
    // USER PROFILE ENDPOINTS (Customer Self-Service)
    // ============================================

    @Get('me')
    async getMyProfile(@Req() req: any) {
        const userId = req.user?.id || req.user?.userId;
        if (!userId) {
            throw new HttpException('User ID not found', HttpStatus.UNAUTHORIZED);
        }
        return this.forward('customer.profile.me', { userId });
    }

    @Patch('me')
    async updateMyProfile(@Req() req: any, @Body() dto: UpdateCustomerDto) {
        const userId = req.user?.id || req.user?.userId;
        if (!userId) {
            throw new HttpException('User ID not found', HttpStatus.UNAUTHORIZED);
        }
        return this.forward('customer.profile.update', { userId, dto });
    }

    @Get('me/addresses')
    async getMyAddresses(@Req() req: any) {
        const userId = req.user?.id || req.user?.userId;
        if (!userId) {
            throw new HttpException('User ID not found', HttpStatus.UNAUTHORIZED);
        }
        // Get customer by userId first
        const customer = await this.forward('customer.find.by.user', { userId });
        return this.forward('customer.address.find.all', { customerId: customer.id });
    }

    @Post('me/addresses')
    async addMyAddress(@Req() req: any, @Body() dto: AddressDto) {
        const userId = req.user?.id || req.user?.userId;
        if (!userId) {
            throw new HttpException('User ID not found', HttpStatus.UNAUTHORIZED);
        }
        const customer = await this.forward('customer.find.by.user', { userId });
        return this.forward('customer.address.create', { customerId: customer.id, dto });
    }

    @Put('me/addresses/:addressId')
    async updateMyAddress(
        @Req() req: any,
        @Param('addressId') addressId: string,
        @Body() dto: UpdateAddressDto,
    ) {
        const userId = req.user?.id || req.user?.userId;
        if (!userId) {
            throw new HttpException('User ID not found', HttpStatus.UNAUTHORIZED);
        }
        return this.forward('customer.address.update', { addressId, dto });
    }

    @Delete('me/addresses/:addressId')
    async deleteMyAddress(@Req() req: any, @Param('addressId') addressId: string) {
        const userId = req.user?.id || req.user?.userId;
        if (!userId) {
            throw new HttpException('User ID not found', HttpStatus.UNAUTHORIZED);
        }
        return this.forward('customer.address.delete', { addressId });
    }

    @Get('me/preferences')
    async getMyPreferences(@Req() req: any) {
        const userId = req.user?.id || req.user?.userId;
        if (!userId) {
            throw new HttpException('User ID not found', HttpStatus.UNAUTHORIZED);
        }
        const customer = await this.forward('customer.find.by.user', { userId });
        return this.forward('customer.preferences.find', { customerId: customer.id });
    }

    @Patch('me/preferences')
    async updateMyPreferences(@Req() req: any, @Body() dto: CustomerPreferenceDto) {
        const userId = req.user?.id || req.user?.userId;
        if (!userId) {
            throw new HttpException('User ID not found', HttpStatus.UNAUTHORIZED);
        }
        const customer = await this.forward('customer.find.by.user', { userId });
        return this.forward('customer.preferences.update', { customerId: customer.id, dto });
    }

    @Get('me/orders')
    async getMyOrders(
        @Req() req: any,
        @Query('page') page?: number,
        @Query('limit') limit?: number,
        @Query('status') status?: string,
    ) {
        const userId = req.user?.id || req.user?.userId;
        if (!userId) {
            throw new HttpException('User ID not found', HttpStatus.UNAUTHORIZED);
        }
        const customer = await this.forward('customer.find.by.user', { userId });
        return this.forwardToOrders('order.find.by.customer', {
            customerId: customer.id,
            page: page || 1,
            limit: limit || 20,
            status,
        });
    }

    @Get('me/order-stats')
    async getMyOrderStats(@Req() req: any) {
        const userId = req.user?.id || req.user?.userId;
        if (!userId) {
            throw new HttpException('User ID not found', HttpStatus.UNAUTHORIZED);
        }
        const customer = await this.forward('customer.find.by.user', { userId });
        return this.forwardToOrders('order.stats.by.customer', { customerId: customer.id });
    }

    @Get('me/wishlist')
    async getMyWishlist(@Req() req: any) {
        const userId = req.user?.id || req.user?.userId;
        if (!userId) {
            throw new HttpException('User ID not found', HttpStatus.UNAUTHORIZED);
        }
        const customer = await this.forward('customer.find.by.user', { userId });
        return this.forward('customer.wishlist.find.all', { customerId: customer.id });
    }

    @Post('me/wishlist')
    async addToMyWishlist(
        @Req() req: any,
        @Body() data: { productId: string; variantId?: string },
    ) {
        const userId = req.user?.id || req.user?.userId;
        if (!userId) {
            throw new HttpException('User ID not found', HttpStatus.UNAUTHORIZED);
        }
        const customer = await this.forward('customer.find.by.user', { userId });
        return this.forward('customer.wishlist.add', { customerId: customer.id, ...data });
    }

    @Delete('me/wishlist/:productId')
    async removeFromMyWishlist(
        @Req() req: any,
        @Param('productId') productId: string,
        @Query('variantId') variantId?: string,
    ) {
        const userId = req.user?.id || req.user?.userId;
        if (!userId) {
            throw new HttpException('User ID not found', HttpStatus.UNAUTHORIZED);
        }
        const customer = await this.forward('customer.find.by.user', { userId });
        return this.forward('customer.wishlist.remove', {
            customerId: customer.id,
            productId,
            variantId,
        });
    }

    @Get('me/activities')
    async getMyActivities(@Req() req: any, @Query('limit') limit?: number) {
        const userId = req.user?.id || req.user?.userId;
        if (!userId) {
            throw new HttpException('User ID not found', HttpStatus.UNAUTHORIZED);
        }
        const customer = await this.forward('customer.find.by.user', { userId });
        return this.forward('customer.activities.find', { customerId: customer.id, limit: limit || 20 });
    }

    // ============================================
    // ADMIN ENDPOINTS
    // ============================================

    @Post()
    @UseGuards(PermissionsGuard)
    @Permissions('customer:create')
    async createCustomer(@Body() dto: CreateCustomerDto) {
        return this.forward('customer.create', dto);
    }

    @Get()
    @UseGuards(PermissionsGuard)
    @Permissions('customer:read')
    async findAllCustomers(@Query() query: CustomerQueryDto) {
        return this.forward('customer.find.all', query || {});
    }

    @Get('search')
    @UseGuards(PermissionsGuard)
    @Permissions('customer:read')
    async searchCustomers(
        @Query('q') query: string,
        @Query('limit') limit?: number,
    ) {
        return this.forward('customer.search', { query, limit: limit || 20 });
    }

    @Get(':id')
    @UseGuards(PermissionsGuard)
    @Permissions('customer:read')
    async findCustomerById(@Param('id') id: string) {
        return this.forward('customer.find.one', { id });
    }

    @Get('email/:email')
    @UseGuards(PermissionsGuard)
    @Permissions('customer:read')
    async findCustomerByEmail(@Param('email') email: string) {
        return this.forward('customer.find.by.email', { email });
    }

    @Get('user/:userId')
    @UseGuards(PermissionsGuard)
    @Permissions('customer:read')
    async findCustomerByUserId(@Param('userId') userId: string) {
        return this.forward('customer.find.by.user', { userId });
    }

    @Put(':id')
    @UseGuards(PermissionsGuard)
    @Permissions('customer:manage')
    async updateCustomer(@Param('id') id: string, @Body() dto: UpdateCustomerDto) {
        return this.forward('customer.update', { id, dto });
    }

    @Delete(':id')
    @UseGuards(PermissionsGuard)
    @Permissions('customer:delete')
    async deleteCustomer(@Param('id') id: string) {
        return this.forward('customer.delete', { id });
    }

    // ============================================
    // ADMIN ADDRESSES
    // ============================================

    @Get(':id/addresses')
    @UseGuards(PermissionsGuard)
    @Permissions('customer:read')
    async getAddresses(@Param('id') customerId: string) {
        return this.forward('customer.address.find.all', { customerId });
    }

    @Post(':id/addresses')
    @UseGuards(PermissionsGuard)
    @Permissions('customer:manage')
    async addAddress(@Param('id') customerId: string, @Body() dto: AddressDto) {
        return this.forward('customer.address.create', { customerId, dto });
    }

    @Put('addresses/:addressId')
    @UseGuards(PermissionsGuard)
    @Permissions('customer:manage')
    async updateAddress(@Param('addressId') addressId: string, @Body() dto: UpdateAddressDto) {
        return this.forward('customer.address.update', { addressId, dto });
    }

    @Delete('addresses/:addressId')
    @UseGuards(PermissionsGuard)
    @Permissions('customer:manage')
    async deleteAddress(@Param('addressId') addressId: string) {
        return this.forward('customer.address.delete', { addressId });
    }

    // ============================================
    // ADMIN NOTES
    // ============================================


    @Post(':id/notes')
    @UseGuards(PermissionsGuard)
    @Permissions('notes:create')
    async createNote(@Req() req: any, @Param('id') customerId: string, @Body() dto: CreateNoteDto) {
        // Get the user ID from the request
        const authorId = dto.authorId;

        if (!authorId) {
            throw new HttpException('User ID not found', HttpStatus.UNAUTHORIZED);
        }

        // Pass authorId in the DTO
        return this.forward('customer.note.create', {
            customerId,
            dto: {
                ...dto,
                authorId  // Add authorId to the DTO
            }
        });
    }

    @Get(':id/notes')
    @UseGuards(PermissionsGuard)
    @Permissions('notes:read')
    async getNotes(@Param('id') customerId: string) {
        return this.forward('customer.note.find.all', { customerId });
    }


    @Put('notes/:noteId')
    @UseGuards(PermissionsGuard)
    @Permissions('notes:edit')
    async updateNote(
        @Req() req: any,
        @Param('noteId') noteId: string,
        @Body() dto: UpdateNoteDto
    ) {
        const userId = req.user?.sub as string || req.user?.id as string || req.user?.userId as string;

        if (!userId) {
            throw new HttpException('User ID not found', HttpStatus.UNAUTHORIZED);
        }

        return this.forward('customer.note.update', { noteId, dto });
    }

    @Delete('notes/:noteId')
    @UseGuards(PermissionsGuard)
    @Permissions('notes:delete')
    async deleteNote(
        @Req() req: any,
        @Param('noteId') noteId: string
    ) {
        const userId = req.user?.sub as string || req.user?.id as string || req.user?.userId as string;

        if (!userId) {
            throw new HttpException('User ID not found', HttpStatus.UNAUTHORIZED);
        }

        return this.forward('customer.note.delete', { noteId });
    }


    // ============================================
    // ADMIN PREFERENCES
    // ============================================

    @Get(':id/preferences')
    @UseGuards(PermissionsGuard)
    @Permissions('customer:read')
    async getPreferences(@Param('id') customerId: string) {
        return this.forward('customer.preferences.find', { customerId });
    }

    @Patch(':id/preferences')
    @UseGuards(PermissionsGuard)
    @Permissions('customer:create')
    async updatePreferences(@Param('id') customerId: string, @Body() dto: CustomerPreferenceDto) {
        return this.forward('customer.preferences.update', { customerId, dto });
    }

    // ============================================
    // ADMIN ACTIVITIES
    // ============================================

    @Get(':id/activities')
    @UseGuards(PermissionsGuard)
    @Permissions('customer:read')
    async getActivities(@Param('id') customerId: string, @Query('limit') limit?: number) {
        return this.forward('customer.activities.find', { customerId, limit: limit || 20 });
    }

    // ============================================
    // BULK OPERATIONS
    // ============================================

    @Post('bulk')
    @UseGuards(PermissionsGuard)
    @Permissions('customer:manage')
    async bulkCreateCustomers(@Body() data: { customers: CreateCustomerDto[] }) {
        return this.forward('customer.bulk.create', data);
    }

    @Put('bulk')
    @UseGuards(PermissionsGuard)
    @Permissions('customer:manage')
    async bulkUpdateCustomers(@Body() data: { customers: { id: string; dto: UpdateCustomerDto }[] }) {
        return this.forward('customer.bulk.update', data);
    }

    @Delete('bulk')
    @UseGuards(PermissionsGuard)
    @Permissions('customer:delete')
    async bulkDeleteCustomers(@Body() data: { ids: string[] }) {
        return this.forward('customer.bulk.delete', data);
    }

    // ============================================
    // EXPORT / IMPORT
    // ============================================

    @Get('export/csv')
    @UseGuards(PermissionsGuard)
    @Permissions('customer:manage')
    async exportCustomersCSV(@Query() query: CustomerQueryDto) {
        return this.forward('customer.export.csv', query);
    }

    @Post('import/csv')
    @UseGuards(PermissionsGuard)
    @Permissions('customer:manage')
    async importCustomersCSV(@Body() data: { customers: any[] }) {
        return this.forward('customer.import.csv', data);
    }

    // ============================================
    // PRIVATE METHODS
    // ============================================

    private forward(pattern: string, payload: unknown) {
        return firstValueFrom(
            this.customerClient.send(pattern, payload).pipe(
                catchError((error) => {
                    console.error(`Error in pattern ${pattern}:`, error);
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

    private forwardToOrders(pattern: string, payload: unknown) {
        return firstValueFrom(
            this.orderClient.send(pattern, payload).pipe(
                catchError((error) => {
                    console.error(`Error in pattern ${pattern}:`, error);
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
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Customer service error';
        let errorType = 'Internal Server Error';

        if (!error) {
            return { status, message, error: errorType };
        }

        if (error.statusCode) {
            if (typeof error.statusCode === 'number') {
                status = error.statusCode;
            } else if (typeof error.statusCode === 'string') {
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

        const possibleStatus = error.status || error.statusCode || error.code;
        if (typeof possibleStatus === 'number' && possibleStatus >= 100 && possibleStatus <= 599) {
            status = possibleStatus;
        }

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

        if (error.message) {
            message = error.message;
        } else if (error.error) {
            message = typeof error.error === 'string' ? error.error : JSON.stringify(error.error);
        } else if (error.data?.message) {
            message = error.data.message;
        } else if (typeof error === 'string') {
            message = error;
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