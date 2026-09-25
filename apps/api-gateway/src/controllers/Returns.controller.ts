import { Body, Controller, Get, HttpException, HttpStatus, Inject, Param, ParseUUIDPipe, Post, Query, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../common/guards/permissions.guard';
import { Permissions } from '../common/decorators/permissions.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { type JwtPayload } from '../common/types/jwt-payload.type';
import { ApproveReturnDto, ReceiveReturnDto, RefundReturnDto, RejectReturnDto } from '../dto/Returns.dto';

function forward(client: ClientProxy, pattern: string, payload: unknown) {
    return firstValueFrom(
        client.send(pattern, payload).pipe(
            catchError((error) => {
                const status = typeof error?.statusCode === 'number' ? error.statusCode : HttpStatus.INTERNAL_SERVER_ERROR;
                throw new HttpException({ statusCode: status, message: error?.message || 'Returns service error', error: error?.error || HttpStatus[status] }, status);
            }),
        ),
    );
}

const actorOf = (u: JwtPayload) => ({ changedBy: u.sub, actor: u.email });

/** A shopper's returns across all orders. */
@Controller('me/returns')
@UseGuards(JwtAuthGuard)
export class MyReturnsController {
    constructor(@Inject('ORDER_SERVICE') private readonly orderClient: ClientProxy) { }

    @Get()
    list(@CurrentUser() user: JwtPayload) {
        return forward(this.orderClient, 'return.list.customer', { customerId: user.sub });
    }
}

/** Staff returns desk. Reading needs order:read, decisions need order:update. */
@Controller('returns')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class ReturnsController {
    constructor(@Inject('ORDER_SERVICE') private readonly orderClient: ClientProxy) { }

    @Get()
    @Permissions('order:read')
    list(@Query('status') status?: string, @Query('search') search?: string, @Query('page') page?: string, @Query('limit') limit?: string) {
        const ok = ['REQUESTED', 'APPROVED', 'REJECTED', 'RECEIVED', 'REFUNDED'];
        return forward(this.orderClient, 'return.list', {
            status: ok.includes(status ?? '') ? status : undefined, search: search || undefined, page: Number(page) || 1, limit: Number(limit) || 20,
        });
    }

    /** Orders cancelled after payment that still need refunding. */
    @Get('refunds-due')
    @Permissions('order:read')
    refundsDue() {
        return forward(this.orderClient, 'order.refunds.due', {});
    }

    @Post(':id/approve')
    @Permissions('order:update')
    approve(@CurrentUser() u: JwtPayload, @Param('id', ParseUUIDPipe) id: string, @Body() dto: ApproveReturnDto) {
        return forward(this.orderClient, 'return.approve', { id, instructions: dto.instructions, ...actorOf(u) });
    }

    @Post(':id/reject')
    @Permissions('order:update')
    reject(@CurrentUser() u: JwtPayload, @Param('id', ParseUUIDPipe) id: string, @Body() dto: RejectReturnDto) {
        return forward(this.orderClient, 'return.reject', { id, reason: dto.reason, ...actorOf(u) });
    }

    @Post(':id/receive')
    @Permissions('order:update')
    receive(@CurrentUser() u: JwtPayload, @Param('id', ParseUUIDPipe) id: string, @Body() dto: ReceiveReturnDto) {
        return forward(this.orderClient, 'return.receive', { id, restock: dto.restock, note: dto.note, ...actorOf(u) });
    }

    @Post(':id/refund')
    @Permissions('order:update')
    refund(@CurrentUser() u: JwtPayload, @Param('id', ParseUUIDPipe) id: string, @Body() dto: RefundReturnDto) {
        return forward(this.orderClient, 'return.refund', { id, amount: dto.amount, note: dto.note, ...actorOf(u) });
    }
}
