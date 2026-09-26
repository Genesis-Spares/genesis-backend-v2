import { Body, Controller, Delete, ForbiddenException, Get, Headers, HttpCode, Inject, Post, Query, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { JwtPayload } from '../common/types/jwt-payload.type';
import { rpc } from '../common/utils/rpc.util';
import { MarkReadDto, PushSubscriptionDto, PushUnsubscribeDto } from '../dto/Notifications.dto';

/**
 * Dashboard notifications (the bell) and web-push subscriptions for staff.
 * Customers are excluded outright: their role carries permissions such as order:read
 * for their own orders, which must not unlock the store-wide staff feed.
 */
@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
    constructor(@Inject('NOTIFICATION_SERVICE') private readonly notifications: ClientProxy) { }

    private viewer(user: JwtPayload) {
        if (!user.roles?.some((r) => r !== 'customer')) {
            throw new ForbiddenException('Notifications are for staff accounts');
        }
        return { userId: user.sub, permissions: user.permissions ?? [] };
    }

    @Get()
    list(
        @CurrentUser() user: JwtPayload,
        @Query('limit') limit?: string,
        @Query('before') before?: string,
        @Query('unread') unread?: string,
    ) {
        return rpc(this.notifications, 'staff.notifications.list', {
            ...this.viewer(user),
            limit: Number(limit) || 20,
            before: before && !Number.isNaN(Date.parse(before)) ? before : undefined,
            unreadOnly: unread === 'true',
        });
    }

    @Post('read')
    @HttpCode(200)
    markRead(@CurrentUser() user: JwtPayload, @Body() dto: MarkReadDto) {
        return rpc(this.notifications, 'staff.notifications.read', { ...this.viewer(user), ids: dto.ids ?? [], all: dto.all === true });
    }

    @Get('push/key')
    pushKey(@CurrentUser() user: JwtPayload) {
        this.viewer(user);
        return rpc(this.notifications, 'staff.push.key', {});
    }

    @Post('push/subscribe')
    @HttpCode(200)
    subscribe(@CurrentUser() user: JwtPayload, @Body() dto: PushSubscriptionDto, @Headers('user-agent') userAgent?: string) {
        if (!dto.endpoint.startsWith('https://')) throw new ForbiddenException('Push endpoint must use HTTPS');
        return rpc(this.notifications, 'staff.push.subscribe', { ...this.viewer(user), subscription: dto, userAgent });
    }

    @Delete('push/subscribe')
    unsubscribe(@CurrentUser() user: JwtPayload, @Body() dto: PushUnsubscribeDto) {
        return rpc(this.notifications, 'staff.push.unsubscribe', { userId: this.viewer(user).userId, endpoint: dto.endpoint });
    }

    @Post('push/test')
    @HttpCode(200)
    test(@CurrentUser() user: JwtPayload) {
        return rpc(this.notifications, 'staff.push.test', { userId: this.viewer(user).userId });
    }
}
