import { Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../common/guards/permissions.guard';
import { Permissions } from '../common/decorators/permissions.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { type JwtPayload } from '../common/types/jwt-payload.type';
import { DeliveryZoneDto, UpdateCheckoutSettingsDto } from 'apps/order-service/src/dto/pricing.dto';
import { rpc } from '../common/utils/rpc.util';

/** Admin: delivery zones and VAT. */
@Controller('settings')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class DeliverySettingsController {
    constructor(@Inject('ORDER_SERVICE') private readonly orderClient: ClientProxy) { }

    @Get('delivery-zones')
    @Permissions('settings:read')
    listZones() {
        return rpc(this.orderClient, 'pricing.zones.list', {});
    }

    @Post('delivery-zones')
    @Permissions('settings:update')
    createZone(@Body() dto: DeliveryZoneDto) {
        return rpc(this.orderClient, 'pricing.zones.create', dto);
    }

    @Put('delivery-zones/:id')
    @Permissions('settings:update')
    updateZone(@Param('id', ParseUUIDPipe) id: string, @Body() dto: DeliveryZoneDto) {
        return rpc(this.orderClient, 'pricing.zones.update', { id, dto });
    }

    @Delete('delivery-zones/:id')
    @Permissions('settings:update')
    deleteZone(@Param('id', ParseUUIDPipe) id: string) {
        return rpc(this.orderClient, 'pricing.zones.delete', { id });
    }

    @Get('checkout')
    @Permissions('settings:read')
    getCheckoutSettings() {
        return rpc(this.orderClient, 'pricing.settings.get', {});
    }

    @Patch('checkout')
    @Permissions('settings:update')
    updateCheckoutSettings(@CurrentUser() user: JwtPayload, @Body() dto: UpdateCheckoutSettingsDto) {
        return rpc(this.orderClient, 'pricing.settings.update', { ...dto, updatedBy: user.email });
    }
}
