// apps/auth-service/src/services/activity-log.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../libs/prisma/prisma.service';

export interface LogActivityInput {
    userId: string;
    action: string;
    resource?: string;
    resourceId?: string;
    metadata?: Record<string, any>;
    ipAddress?: string;
    userAgent?: string;
}

/**
 * Real audit trail for the "Activity" tab — every login, registration,
 * password change, and admin action (user/role create-update-delete) is
 * written here as it happens, rather than synthesized on read.
 */
@Injectable()
export class ActivityLogService {
    private readonly logger = new Logger(ActivityLogService.name);

    constructor(private readonly prisma: PrismaService) { }

    /**
     * Fire-and-forget audit log write. Never throws — a logging failure
     * must never fail the request that triggered it.
     */
    async log(input: LogActivityInput): Promise<void> {
        try {
            await this.prisma.userActivity.create({
                data: {
                    userId: input.userId,
                    action: input.action,
                    resource: input.resource,
                    resourceId: input.resourceId,
                    metadata: input.metadata as any,
                    ipAddress: input.ipAddress,
                    userAgent: input.userAgent,
                },
            });
        } catch (err) {
            this.logger.warn(`Failed to write activity log: ${err instanceof Error ? err.message : String(err)}`);
        }
    }

    /**
     * Global feed across every user — the "Logs" panel on the admin
     * dashboard. Distinct from findForUser: no userId filter, and each row
     * carries userId so the caller/UI can label who did it.
     */
    async findRecent(page = 1, limit = 20) {
        const safePage = Number(page) > 0 ? Number(page) : 1;
        const safeLimit = Number(limit) > 0 ? Number(limit) : 20;
        const skip = (safePage - 1) * safeLimit;

        const [data, total] = await Promise.all([
            this.prisma.userActivity.findMany({
                orderBy: { createdAt: 'desc' },
                skip,
                take: safeLimit,
            }),
            this.prisma.userActivity.count(),
        ]);

        return {
            data,
            meta: {
                total,
                page: safePage,
                limit: safeLimit,
                totalPages: Math.max(1, Math.ceil(total / safeLimit)),
            },
        };
    }

    async findForUser(userId: string, page = 1, limit = 20) {
        const safePage = Number(page) > 0 ? Number(page) : 1;
        const safeLimit = Number(limit) > 0 ? Number(limit) : 20;
        const skip = (safePage - 1) * safeLimit;

        const [data, total] = await Promise.all([
            this.prisma.userActivity.findMany({
                where: { userId },
                orderBy: { createdAt: 'desc' },
                skip,
                take: safeLimit,
            }),
            this.prisma.userActivity.count({ where: { userId } }),
        ]);

        return {
            data,
            meta: {
                total,
                page: safePage,
                limit: safeLimit,
                totalPages: Math.max(1, Math.ceil(total / safeLimit)),
            },
        };
    }
}
