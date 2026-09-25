// apps/api-gateway/src/controllers/Message.controller.ts
import { Body, Controller, Get, HttpException, HttpStatus, Inject, Param, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import type { Request } from "express";
import { ContactMessageDto } from "../dto/Contact.dto";
import { type JwtPayload } from "../common/types/jwt-payload.type";
import { ClientProxy } from "@nestjs/microservices";
import { catchError, firstValueFrom } from "rxjs";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { PermissionsGuard } from "../common/guards/permissions.guard";
import { Permissions } from "../common/decorators/permissions.decorator";
import {
    MessageQueryDto,
    UpdateMessageDto,
    UpdateMessageStatusDto,
} from "apps/customer-service/src/dto/message.dto";
import { IsBoolean, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { CurrentUser } from "../common/decorators/current-user.decorator";

/** Staff reply body. The author is always the signed-in user — never taken from the request. */
class StaffReplyDto {
    @IsString() @MinLength(1) @MaxLength(5000)
    body: string;

    @IsBoolean() @IsOptional()
    isInternal?: boolean;
}

// NOTE: unlike every other gateway controller, this one applies guards
// per-route instead of at the class level. `POST /` (message creation) is
// deliberately left open with no guard at all, so an unauthenticated
// storefront "contact us" form can submit a support message directly —
// every other route (list/get/reply/status-update) requires a signed-in
// staff member with the message:read / message:update permission.
@Controller('messages')
export class MessageController {
    constructor(
        @Inject('CUSTOMER_SERVICE') private readonly customerClient: ClientProxy,
        private readonly jwt: JwtService,
    ) { }

    // naive per-IP limiter for the public form: 5 messages / 15 min (in-memory, per gateway instance)
    private static readonly WINDOW_MS = 15 * 60 * 1000;
    private static readonly MAX_PER_WINDOW = 5;
    private readonly recent = new Map<string, number[]>();

    private allow(ip: string) {
        const now = Date.now();
        const hits = (this.recent.get(ip) ?? []).filter((t) => now - t < MessageController.WINDOW_MS);
        if (hits.length >= MessageController.MAX_PER_WINDOW) return false;
        hits.push(now);
        this.recent.set(ip, hits);
        if (this.recent.size > 5000) this.recent.clear(); // bound memory
        return true;
    }

    /**
     * Public "Contact us". Anyone may post; signed-in shoppers are linked to
     * their account via the (optional) bearer token. Priority is set here.
     */
    @Post()
    async createMessage(@Body() dto: ContactMessageDto, @Req() req: Request) {
        // bots fill the hidden field: pretend success, store nothing
        if (dto.website) return { success: true, reference: 'MSG-' + Math.random().toString(36).slice(2, 8).toUpperCase() };

        const ip = (req.ip || req.socket?.remoteAddress || 'unknown').toString();
        if (!this.allow(ip)) {
            throw new HttpException('Too many messages from this connection. Please try again in a few minutes, or call us.', HttpStatus.TOO_MANY_REQUESTS);
        }

        let customerId: string | undefined;
        const auth = req.headers.authorization;
        if (auth?.startsWith('Bearer ')) {
            try { customerId = (await this.jwt.verifyAsync<JwtPayload>(auth.slice(7))).sub; } catch { /* anonymous is fine */ }
        }

        const urgentTopic = dto.topic === 'Order / delivery' || dto.topic === 'Returns & warranty';
        const created = await this.forward('message.create', {
            customerId,
            customerName: dto.name,
            customerEmail: dto.email.toLowerCase(),
            customerPhone: dto.phone || undefined,
            subject: dto.orderNumber ? `${dto.topic} — ${dto.orderNumber}` : dto.topic,
            body: dto.message,
            priority: urgentTopic ? 'HIGH' : 'NORMAL',
            orderNumber: dto.orderNumber || undefined,
        }) as { id: string };

        return { success: true, reference: `MSG-${created.id.slice(0, 8).toUpperCase()}` };
    }

    @Get()
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Permissions('message:read')
    async findAllMessages(@Query() query: MessageQueryDto) {
        return this.forward('message.find.all', query || {});
    }

    @Get('stats')
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Permissions('message:read')
    async getStats() {
        return this.forward('message.stats', {});
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Permissions('message:read')
    async findOneMessage(@Param('id') id: string) {
        return this.forward('message.find.one', { id });
    }

    @Post(':id/reply')
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Permissions('message:update')
    async replyToMessage(@CurrentUser() user: JwtPayload, @Param('id') id: string, @Body() dto: StaffReplyDto) {
        return this.forward('message.reply', {
            id,
            dto: { body: dto.body, isInternal: dto.isInternal ?? false, authorId: user.sub, authorName: user.email },
        });
    }

    /** Status, priority, assignee and linked order. */
    @Patch(':id')
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Permissions('message:update')
    async updateMessage(@CurrentUser() user: JwtPayload, @Param('id') id: string, @Body() dto: UpdateMessageDto) {
        // assigning to yourself always records your own email as the display name
        const assignedToName = dto.assignedTo && dto.assignedTo === user.sub ? user.email : dto.assignedToName;
        return this.forward('message.update', { id, dto: { ...dto, assignedToName } });
    }

    @Patch(':id/status')
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Permissions('message:update')
    async updateStatus(@Param('id') id: string, @Body() dto: UpdateMessageStatusDto) {
        return this.forward('message.status.update', { id, dto });
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
