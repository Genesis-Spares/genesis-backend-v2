import { Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../common/guards/permissions.guard';
import { Permissions } from '../common/decorators/permissions.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { type JwtPayload } from '../common/types/jwt-payload.type';
import { SaveEmailDto } from 'apps/customer-service/src/dto/email.dto';
import { rpc } from '../common/utils/rpc.util';

const actorOf = (u: JwtPayload) => ({ userId: u.sub, email: u.email });

/** Dashboard → Emails: compose, save drafts and send emails to customers. */
@Controller('emails')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class EmailsController {
    constructor(@Inject('CUSTOMER_SERVICE') private readonly customerClient: ClientProxy) { }

    @Get()
    @Permissions('message:read')
    list(@Query('folder') folder?: string, @Query('search') search?: string, @Query('page') page?: string, @Query('limit') limit?: string) {
        return rpc(this.customerClient, 'email.list', { folder, search, page: Number(page) || 1, limit: Number(limit) || 25 });
    }

    /** Emails a customer has been sent (customer profile). */
    @Get('customer/:customerId')
    @Permissions('customer:read')
    forCustomer(@Param('customerId', ParseUUIDPipe) customerId: string) {
        return rpc(this.customerClient, 'email.for.customer', { customerId });
    }

    @Get(':id')
    @Permissions('message:read')
    get(@Param('id', ParseUUIDPipe) id: string) {
        return rpc(this.customerClient, 'email.get', { id });
    }

    @Post()
    @Permissions('message:create')
    create(@CurrentUser() user: JwtPayload, @Body() dto: SaveEmailDto) {
        return rpc(this.customerClient, 'email.create', { dto, actor: actorOf(user) });
    }

    /** Send what's in the composer to the signed-in staff member only. */
    @Post('test')
    @Permissions('message:create')
    test(@CurrentUser() user: JwtPayload, @Body() dto: SaveEmailDto) {
        return rpc(this.customerClient, 'email.test', { dto, to: user.email });
    }

    @Put(':id')
    @Permissions('message:create')
    update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: SaveEmailDto) {
        return rpc(this.customerClient, 'email.update', { id, dto });
    }

    @Delete(':id')
    @Permissions('message:create')
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return rpc(this.customerClient, 'email.delete', { id });
    }

    @Post(':id/duplicate')
    @Permissions('message:create')
    duplicate(@CurrentUser() user: JwtPayload, @Param('id', ParseUUIDPipe) id: string) {
        return rpc(this.customerClient, 'email.duplicate', { id, actor: actorOf(user) });
    }

    @Post(':id/send')
    @Permissions('message:create')
    send(@Param('id', ParseUUIDPipe) id: string) {
        return rpc(this.customerClient, 'email.send', { id });
    }
}
