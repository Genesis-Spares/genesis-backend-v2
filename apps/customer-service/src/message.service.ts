// apps/customer-service/src/message.service.ts
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PrismaService } from '../libs/prisma/prisma.service';
import { Prisma } from './generated/prisma';
import { CreateMessageDto, MessageQueryDto, ReplyMessageDto, UpdateMessageDto, UpdateMessageStatusDto } from './dto/message.dto';

const RESOLVED_STATUSES = ['RESOLVED', 'CLOSED'];

@Injectable()
export class MessageService {
    private readonly logger = new Logger(MessageService.name);

    constructor(
        private readonly prisma: PrismaService,
        @Inject('NOTIFICATION_SERVICE') private readonly notificationClient: ClientProxy,
    ) { }

    async createMessage(dto: CreateMessageDto) {
        const message = await this.prisma.supportMessage.create({
            data: {
                customerId: dto.customerId,
                customerName: dto.customerName,
                customerEmail: dto.customerEmail,
                customerPhone: dto.customerPhone,
                subject: dto.subject,
                body: dto.body,
                priority: dto.priority ?? 'NORMAL',
                orderId: dto.orderId,
                orderNumber: dto.orderNumber,
            },
        });

        this.logger.log(`New support message from ${dto.customerEmail}: ${dto.subject}`);

        // acknowledgement to the sender (+ optional alert to the support inbox); never blocks saving
        try {
            this.notificationClient.emit('support.message.received', {
                messageId: message.id,
                reference: `MSG-${message.id.slice(0, 8).toUpperCase()}`,
                customerId: message.customerId,
                name: message.customerName,
                email: message.customerEmail,
                phone: message.customerPhone,
                subject: message.subject,
                body: message.body,
                priority: message.priority,
                orderNumber: message.orderNumber,
            }).subscribe({ error: (e) => this.logger.warn(`Acknowledgement not queued: ${(e as Error)?.message}`) });
        } catch (e) {
            this.logger.warn(`Acknowledgement not queued: ${(e as Error)?.message}`);
        }
        return message;
    }

    async findAllMessages(query: MessageQueryDto) {
        const {
            search,
            status,
            priority,
            sortBy = 'createdAt',
            sortOrder = 'desc',
            page = 1,
            limit = 20,
        } = query;

        const where: Prisma.SupportMessageWhereInput = {};

        if (search) {
            where.OR = [
                { subject: { contains: search, mode: 'insensitive' } },
                { body: { contains: search, mode: 'insensitive' } },
                { customerName: { contains: search, mode: 'insensitive' } },
                { customerEmail: { contains: search, mode: 'insensitive' } },
                { orderNumber: { contains: search, mode: 'insensitive' } },
            ];
        }

        if (status) where.status = status;
        if (priority) where.priority = priority;
        if (query.assignedTo) where.assignedTo = query.assignedTo === 'none' ? null : query.assignedTo;

        const orderBy: Prisma.SupportMessageOrderByWithRelationInput = {};
        orderBy[sortBy] = sortOrder;

        const skip = (page - 1) * limit;

        const [data, total] = await Promise.all([
            this.prisma.supportMessage.findMany({
                where,
                orderBy,
                skip,
                take: limit,
                include: { _count: { select: { replies: true } } },
            }),
            this.prisma.supportMessage.count({ where }),
        ]);

        return {
            data,
            meta: { total, page, limit, totalPages: Math.max(1, Math.ceil(total / limit)) },
        };
    }

    async findOneMessage(id: string) {
        const message = await this.prisma.supportMessage.findUnique({
            where: { id },
            include: { replies: { orderBy: { createdAt: 'asc' } } },
        });

        if (!message) {
            throw new RpcException({ statusCode: 404, message: 'Message not found', error: 'Not Found' });
        }

        return message;
    }

    /**
     * A reply from staff moves an OPEN message to IN_PROGRESS automatically
     * (an internal note does not, since it isn't a response to the customer).
     */
    async replyToMessage(id: string, dto: ReplyMessageDto) {
        const existing = await this.prisma.supportMessage.findUnique({ where: { id } });
        if (!existing) {
            throw new RpcException({ statusCode: 404, message: 'Message not found', error: 'Not Found' });
        }

        const isInternal = dto.isInternal ?? false;
        const reply = await this.prisma.supportMessageReply.create({
            data: {
                messageId: id,
                body: dto.body.trim(),
                authorId: dto.authorId,
                authorName: dto.authorName,
                isInternal,
            },
        });

        // first staff touch: move to IN_PROGRESS and take ownership if nobody has it
        const patch: Prisma.SupportMessageUpdateInput = {};
        if (!isInternal && existing.status === 'OPEN') patch.status = 'IN_PROGRESS';
        if (!existing.assignedTo) { patch.assignedTo = dto.authorId; patch.assignedToName = dto.authorName ?? null; }
        if (Object.keys(patch).length) await this.prisma.supportMessage.update({ where: { id }, data: patch });

        // a customer-facing reply is emailed; internal notes never leave the dashboard
        if (!isInternal) {
            try {
                this.notificationClient.emit('support.message.replied', {
                    messageId: existing.id,
                    replyId: reply.id,
                    reference: `MSG-${existing.id.slice(0, 8).toUpperCase()}`,
                    customerId: existing.customerId,
                    name: existing.customerName,
                    email: existing.customerEmail,
                    subject: existing.subject,
                    originalBody: existing.body,
                    reply: reply.body,
                    authorName: dto.authorName,
                    orderNumber: existing.orderNumber,
                }).subscribe({ error: (e) => this.logger.warn(`Reply email not queued: ${(e as Error)?.message}`) });
            } catch (e) {
                this.logger.warn(`Reply email not queued: ${(e as Error)?.message}`);
            }
        }

        return reply;
    }

    async updateStatus(id: string, dto: UpdateMessageStatusDto) {
        const existing = await this.prisma.supportMessage.findUnique({ where: { id } });
        if (!existing) {
            throw new RpcException({ statusCode: 404, message: 'Message not found', error: 'Not Found' });
        }

        const wasResolved = RESOLVED_STATUSES.includes(existing.status);
        const nowResolved = RESOLVED_STATUSES.includes(dto.status);

        const message = await this.prisma.supportMessage.update({
            where: { id },
            data: {
                status: dto.status,
                assignedTo: dto.assignedTo ?? existing.assignedTo,
                resolvedAt: !wasResolved && nowResolved ? new Date() : !nowResolved ? null : existing.resolvedAt,
            },
        });

        return message;
    }

    /** Status / priority / assignee / linked order in one call. */
    async updateMessage(id: string, dto: UpdateMessageDto) {
        const existing = await this.prisma.supportMessage.findUnique({ where: { id } });
        if (!existing) {
            throw new RpcException({ statusCode: 404, message: 'Message not found', error: 'Not Found' });
        }

        const data: Prisma.SupportMessageUpdateInput = {};
        if (dto.status && dto.status !== existing.status) {
            data.status = dto.status;
            const wasResolved = RESOLVED_STATUSES.includes(existing.status);
            const nowResolved = RESOLVED_STATUSES.includes(dto.status);
            data.resolvedAt = nowResolved ? (wasResolved ? existing.resolvedAt : new Date()) : null;
        }
        if (dto.priority) data.priority = dto.priority;
        if (dto.assignedTo !== undefined) {
            data.assignedTo = dto.assignedTo;
            data.assignedToName = dto.assignedTo ? dto.assignedToName ?? null : null;
        }
        if (dto.orderNumber !== undefined) {
            data.orderNumber = dto.orderNumber?.trim() || null;
            data.orderId = dto.orderNumber ? dto.orderId ?? null : null;
        }

        return this.prisma.supportMessage.update({ where: { id }, data });
    }

    async getStats() {
        const statusCounts = await this.prisma.supportMessage.groupBy({
            by: ['status'],
            _count: { _all: true },
        });

        const byStatus = statusCounts.reduce<Record<string, number>>((acc, row) => {
            acc[row.status] = row._count._all;
            return acc;
        }, {});

        const urgentOpen = await this.prisma.supportMessage.count({
            where: { status: { in: ['OPEN', 'IN_PROGRESS'] }, priority: { in: ['HIGH', 'URGENT'] } },
        });

        return {
            total: Object.values(byStatus).reduce((sum, n) => sum + n, 0),
            byStatus,
            urgentOpen,
        };
    }
}
