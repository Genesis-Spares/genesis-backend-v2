import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '../generated/prisma';
import { PrismaService } from '../../libs/prisma/prisma.service';
import { PushService } from './push.service';

export interface StaffNotificationInput {
    type: string;
    title: string;
    body: string;
    link?: string | null;
    /** permission needed to see it (null = every staff member) */
    permission?: string | null;
    data?: Record<string, unknown>;
}

export interface Viewer {
    userId: string;
    permissions: string[];
}

/** Keep the feed from growing forever: notifications older than this are pruned. */
const RETENTION_DAYS = 90;

@Injectable()
export class StaffNotificationsService {
    private readonly logger = new Logger(StaffNotificationsService.name);
    private lastPrune = 0;

    constructor(
        private readonly prisma: PrismaService,
        private readonly push: PushService,
    ) { }

    /** Record a notification in the dashboard feed and push it to subscribed staff devices. */
    async notify(n: StaffNotificationInput) {
        const row = await this.prisma.staffNotification.create({
            data: {
                type: n.type,
                title: n.title,
                body: n.body,
                link: n.link ?? null,
                permission: n.permission ?? null,
                data: (n.data ?? undefined) as Prisma.InputJsonValue | undefined,
            },
        });
        this.push
            .sendToStaff(row.permission, { title: row.title, body: row.body, url: row.link, tag: `${row.type}:${row.id}` })
            .catch((e) => this.logger.error('Push fan-out failed', e as Error));
        this.pruneOccasionally();
        return row;
    }

    private visibleTo(v: Viewer): Prisma.StaffNotificationWhereInput {
        return { OR: [{ permission: null }, { permission: { in: v.permissions } }] };
    }

    async list(v: Viewer, opts: { limit?: number; before?: string; unreadOnly?: boolean }) {
        const limit = Math.min(Math.max(Number(opts.limit) || 20, 1), 50);
        const cursor = await this.prisma.staffNotificationCursor.findUnique({ where: { userId: v.userId } });
        const readBefore = cursor?.readBefore ?? new Date(0);
        const where: Prisma.StaffNotificationWhereInput = {
            ...this.visibleTo(v),
            ...(opts.before ? { createdAt: { lt: new Date(opts.before) } } : {}),
        };
        const unreadWhere: Prisma.StaffNotificationWhereInput = {
            ...this.visibleTo(v),
            createdAt: { gt: readBefore },
            reads: { none: { userId: v.userId } },
        };

        const [rows, unread] = await Promise.all([
            this.prisma.staffNotification.findMany({
                where: opts.unreadOnly ? { AND: [where, unreadWhere] } : where,
                orderBy: { createdAt: 'desc' },
                take: limit + 1,
                include: { reads: { where: { userId: v.userId }, select: { readAt: true } } },
            }),
            this.prisma.staffNotification.count({ where: unreadWhere }),
        ]);
        const page = rows.slice(0, limit);
        return {
            data: page.map(({ reads, id, type, title, body, link, createdAt }) => ({
                id, type, title, body, link, createdAt,
                read: reads.length > 0 || createdAt <= readBefore,
            })),
            unread,
            nextBefore: rows.length > limit ? page[page.length - 1].createdAt.toISOString() : null,
        };
    }

    async markRead(v: Viewer, ids: string[]) {
        const visible = await this.prisma.staffNotification.findMany({
            where: { id: { in: ids.slice(0, 100) }, ...this.visibleTo(v) },
            select: { id: true },
        });
        if (visible.length) {
            await this.prisma.staffNotificationRead.createMany({
                data: visible.map((n) => ({ notificationId: n.id, userId: v.userId })),
                skipDuplicates: true,
            });
        }
        return { ok: true };
    }

    async markAllRead(v: Viewer) {
        const now = new Date();
        await this.prisma.staffNotificationCursor.upsert({
            where: { userId: v.userId },
            create: { userId: v.userId, readBefore: now },
            update: { readBefore: now },
        });
        return { ok: true };
    }

    private pruneOccasionally() {
        if (Date.now() - this.lastPrune < 6 * 3600_000) return;
        this.lastPrune = Date.now();
        const cutoff = new Date(Date.now() - RETENTION_DAYS * 24 * 3600_000);
        this.prisma.staffNotification.deleteMany({ where: { createdAt: { lt: cutoff } } }).catch(() => undefined);
    }
}
