import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, Patch, Post, Put, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { ClientProxy } from "@nestjs/microservices";
import { PermissionsGuard } from "../common/guards/permissions.guard";
import { Permissions } from "../common/decorators/permissions.decorator";
import {
    CreateOrderDto,
    OrderQueryDto,
    UpdateOrderDto,
    UpdateOrderStatusDto,
    UpdatePaymentStatusDto,
    UpdateTrackingDto,
    AddTrackingEventDto,
    CancelOrderDto,
    CreateOrderNoteDto,
    UpdateOrderNoteDto,
} from "apps/order-service/src/dto/order.dto";
import { catchError, firstValueFrom } from "rxjs";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { type JwtPayload } from "../common/types/jwt-payload.type";

/** Audit fields always come from the verified JWT — anything the client sent is overwritten. */
const actorOf = (user: JwtPayload) => ({ changedBy: user.sub, actor: user.email });

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrderController {
    constructor(@Inject('ORDER_SERVICE') private readonly orderClient: ClientProxy) { }

    // ============================================
    // ORDER CRUD (Admin)
    // ============================================

    @Post()
    @UseGuards(PermissionsGuard)
    @Permissions('order:create')
    async createOrder(@Body() dto: CreateOrderDto) {
        return this.forward('order.create', dto);
    }

    @Get()
    @UseGuards(PermissionsGuard)
    @Permissions('order:read')
    async findAllOrders(@Query() query: OrderQueryDto) {
        return this.forward('order.find.all', query || {});
    }

    @Get('stats')
    @UseGuards(PermissionsGuard)
    @Permissions('order:read')
    async getOrderStats() {
        return this.forward('order.stats', {});
    }

    @Get('search')
    @UseGuards(PermissionsGuard)
    @Permissions('order:read')
    async searchOrders(@Query('q') query: string, @Query('limit') limit?: number) {
        return this.forward('order.search', { query, limit: limit || 20 });
    }

    @Get('number/:orderNumber')
    @UseGuards(PermissionsGuard)
    @Permissions('order:read')
    async findOrderByNumber(@Param('orderNumber') orderNumber: string) {
        return this.forward('order.find.by.number', { orderNumber });
    }

    @Get('customer/:customerId')
    @UseGuards(PermissionsGuard)
    @Permissions('order:read')
    async findOrdersByCustomer(
        @Param('customerId') customerId: string,
        @Query('page') page?: number,
        @Query('limit') limit?: number,
        @Query('status') status?: string,
    ) {
        return this.forward('order.find.by.customer', {
            customerId,
            page: page || 1,
            limit: limit || 20,
            status,
        });
    }

    @Get(':id')
    @UseGuards(PermissionsGuard)
    @Permissions('order:read')
    async findOrderById(@Param('id') id: string) {
        return this.forward('order.find.one', { id });
    }

    @Put(':id')
    @UseGuards(PermissionsGuard)
    @Permissions('order:update')
    async updateOrder(@Param('id') id: string, @Body() dto: UpdateOrderDto) {
        return this.forward('order.update', { id, dto });
    }

    @Delete(':id')
    @UseGuards(PermissionsGuard)
    @Permissions('order:delete')
    async deleteOrder(@Param('id') id: string) {
        return this.forward('order.delete', { id });
    }

    // ============================================
    // STATUS / PAYMENT / TRACKING
    // ============================================

    @Patch(':id/status')
    @UseGuards(PermissionsGuard)
    @Permissions('order:update')
    async updateOrderStatus(@CurrentUser() user: JwtPayload, @Param('id') id: string, @Body() dto: UpdateOrderStatusDto) {
        return this.forward('order.status.update', { id, dto: { ...dto, ...actorOf(user) } });
    }

    @Patch(':id/payment-status')
    @UseGuards(PermissionsGuard)
    @Permissions('order:update')
    async updatePaymentStatus(@CurrentUser() user: JwtPayload, @Param('id') id: string, @Body() dto: UpdatePaymentStatusDto) {
        return this.forward('order.payment.update', { id, dto: { ...dto, ...actorOf(user) } });
    }

    @Patch(':id/tracking')
    @UseGuards(PermissionsGuard)
    @Permissions('order:update')
    async updateTracking(@CurrentUser() user: JwtPayload, @Param('id') id: string, @Body() dto: UpdateTrackingDto) {
        return this.forward('order.tracking.update', { id, dto: { ...dto, ...actorOf(user) } });
    }

    /** Shipment / progress update ("Out for delivery — Westlands") without changing status. */
    @Post(':id/events')
    @UseGuards(PermissionsGuard)
    @Permissions('order:update')
    async addTrackingEvent(@CurrentUser() user: JwtPayload, @Param('id') id: string, @Body() dto: AddTrackingEventDto) {
        return this.forward('order.tracking.event', { id, dto: { ...dto, ...actorOf(user) } });
    }

    @Post(':id/cancel')
    @UseGuards(PermissionsGuard)
    @Permissions('order:update')
    async cancelOrder(@CurrentUser() user: JwtPayload, @Param('id') id: string, @Body() dto: CancelOrderDto) {
        return this.forward('order.cancel', { id, dto: { ...dto, ...actorOf(user) } });
    }

    // ============================================
    // STATUS HISTORY
    // ============================================

    @Get(':id/history')
    @UseGuards(PermissionsGuard)
    @Permissions('order:read')
    async getOrderHistory(@Param('id') orderId: string) {
        return this.forward('order.history.find', { orderId });
    }

    // Global feed across every order, for the admin dashboard's "Logs" panel
    // — distinct from :id/history, which is scoped to one order.
    @Get('activity/recent')
    @UseGuards(PermissionsGuard)
    @Permissions('order:read')
    async getRecentActivity(@Query('limit') limit?: number) {
        return this.forward('order.activity.recent', { limit: limit || 20 });
    }

    // ============================================
    // NOTES
    // ============================================

    @Post(':id/notes')
    @UseGuards(PermissionsGuard)
    @Permissions('notes:create')
    async createNote(@Param('id') orderId: string, @Body() dto: CreateOrderNoteDto) {
        if (!dto.authorId) {
            throw new HttpException('authorId is required', HttpStatus.BAD_REQUEST);
        }
        return this.forward('order.note.create', { orderId, dto });
    }

    @Get(':id/notes')
    @UseGuards(PermissionsGuard)
    @Permissions('notes:read')
    async getNotes(@Param('id') orderId: string) {
        return this.forward('order.note.find.all', { orderId });
    }

    @Put('notes/:noteId')
    @UseGuards(PermissionsGuard)
    @Permissions('notes:edit')
    async updateNote(@Param('noteId') noteId: string, @Body() dto: UpdateOrderNoteDto) {
        return this.forward('order.note.update', { noteId, dto });
    }

    @Delete('notes/:noteId')
    @UseGuards(PermissionsGuard)
    @Permissions('notes:delete')
    async deleteNote(@Param('noteId') noteId: string) {
        return this.forward('order.note.delete', { noteId });
    }

    // ============================================
    // BULK OPERATIONS
    // ============================================

    @Post('bulk/cancel')
    @UseGuards(PermissionsGuard)
    @Permissions('order:manage')
    async bulkCancelOrders(@CurrentUser() user: JwtPayload, @Body() data: { ids: string[] }) {
        return this.forward('order.bulk.cancel', { ids: data.ids, ...actorOf(user) });
    }

    // ============================================
    // PRIVATE METHODS
    // ============================================

    private forward(pattern: string, payload: unknown) {
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
        let message = 'Order service error';
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
