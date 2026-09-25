// apps/auth-service/src/services/user-management.service.ts
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import bcrypt from 'bcrypt';
import { PrismaService } from '../../libs/prisma/prisma.service';
import { ActivityLogService } from './activity-log.service';
import { OTPService } from './otp.service';
import { ACCOUNT_STATUSES, CreateUserDto, UpdateUserDto, UserQueryDto } from '../dto/User.dto';

const userListSelect = {
    id: true,
    email: true,
    firstname: true,
    lastName: true,
    phone: true,
    isActive: true,
    isEmailVerified: true,
    status: true,
    createAt: true,
    updateAt: true,
    roles: {
        select: {
            role: {
                select: { id: true, name: true, description: true },
            },
        },
    },
} as const;

function mapUser(user: any) {
    if (!user) return user;
    const { roles, password, ...rest } = user;
    return {
        ...rest,
        roles: (roles ?? []).map((ur: any) => ur.role),
    };
}

@Injectable()
export class UserManagementService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly activityLog: ActivityLogService,
        private readonly otpService: OTPService,
    ) { }

    async findAll(query: UserQueryDto) {
        const page = Number(query.page) > 0 ? Number(query.page) : 1;
        const limit = Number(query.limit) > 0 ? Number(query.limit) : 20;
        const skip = (page - 1) * limit;

        const where: any = {};
        if (query.search) {
            where.OR = [
                { email: { contains: query.search, mode: 'insensitive' } },
                { firstname: { contains: query.search, mode: 'insensitive' } },
                { lastName: { contains: query.search, mode: 'insensitive' } },
            ];
        }
        if (query.isActive !== undefined) {
            where.isActive = query.isActive === true || (query.isActive as unknown as string) === 'true';
        }
        if (query.roleId) {
            where.roles = { some: { roleId: query.roleId } };
        }

        const sortableFields = new Set(['createAt', 'updateAt', 'email', 'firstname', 'lastName']);
        const sortBy = sortableFields.has(query.sortBy || '') ? (query.sortBy as string) : 'createAt';
        const sortOrder = query.sortOrder === 'asc' ? 'asc' : 'desc';

        const [data, total] = await Promise.all([
            this.prisma.user.findMany({
                where,
                select: userListSelect,
                orderBy: { [sortBy]: sortOrder },
                skip,
                take: limit,
            }),
            this.prisma.user.count({ where }),
        ]);

        return {
            data: data.map(mapUser),
            meta: {
                total,
                page,
                limit,
                totalPages: Math.max(1, Math.ceil(total / limit)),
            },
        };
    }

    async findOne(id: string) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: userListSelect,
        });

        if (!user) {
            throw new RpcException({ statusCode: 404, message: 'User not found', error: 'Not Found' });
        }

        return mapUser(user);
    }

    async getStats() {
        const [total, active, inactive, verified, roleBreakdown] = await Promise.all([
            this.prisma.user.count(),
            this.prisma.user.count({ where: { isActive: true } }),
            this.prisma.user.count({ where: { isActive: false } }),
            this.prisma.user.count({ where: { isEmailVerified: true } }),
            this.prisma.role.findMany({
                select: {
                    id: true,
                    name: true,
                    _count: { select: { users: true } },
                },
                orderBy: { name: 'asc' },
            }),
        ]);

        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const newLast30Days = await this.prisma.user.count({
            where: { createAt: { gte: thirtyDaysAgo } },
        });

        return {
            total,
            active,
            inactive,
            verified,
            newLast30Days,
            byRole: roleBreakdown.map((r) => ({ roleId: r.id, roleName: r.name, count: r._count.users })),
        };
    }

    async create(dto: CreateUserDto, actorId?: string) {
        const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (existing) {
            throw new RpcException({
                statusCode: 400,
                message: 'An account with this email already exists',
                error: 'Bad Request',
            });
        }

        const passwordHash = await bcrypt.hash(dto.password, 12);

        let roleIds = dto.roleIds ?? [];
        if (roleIds.length === 0) {
            const customerRole = await this.prisma.role.upsert({
                where: { name: 'customer' },
                update: {},
                create: { name: 'customer', description: 'Default storefront customer', isSystem: true },
            });
            roleIds = [customerRole.id];
        } else {
            const roles = await this.prisma.role.findMany({ where: { id: { in: roleIds } } });
            if (roles.length !== roleIds.length) {
                throw new RpcException({ statusCode: 400, message: 'One or more roles do not exist', error: 'Bad Request' });
            }
        }

        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                password: passwordHash,
                firstname: dto.firstName,
                lastName: dto.lastName,
                phone: dto.phone,
                isActive: dto.isActive ?? true,
                // Admin-created accounts now go through the same invite/verify
                // gate as self-registration — they receive an email with a
                // secure link and can't log in until they click it. The temp
                // password above still lets the admin hand it over out of
                // band if needed, but login() blocks on isEmailVerified either way.
                isEmailVerified: false,
                status: 'PENDING',
                roles: { create: roleIds.map((roleId) => ({ roleId })) },
            },
            select: userListSelect,
        });

        await this.otpService.generateAndSendInviteLink({
            email: user.email,
            userId: user.id,
            firstName: user.firstname,
        });

        if (actorId) {
            await this.activityLog.log({
                userId: actorId,
                action: 'USER_CREATED',
                resource: 'user',
                resourceId: user.id,
                metadata: { email: user.email, invited: true },
            });
        }

        return mapUser(user);
    }

    /** Admin action backing the "Resend Verification Email" control. */
    async resendInvite(id: string, actorId?: string) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new RpcException({ statusCode: 404, message: 'User not found', error: 'Not Found' });
        }
        if (user.isEmailVerified) {
            throw new RpcException({ statusCode: 400, message: 'This user is already verified', error: 'Bad Request' });
        }

        await this.otpService.generateAndSendInviteLink({
            email: user.email,
            userId: user.id,
            firstName: user.firstname,
        });

        if (actorId) {
            await this.activityLog.log({
                userId: actorId,
                action: 'INVITE_RESENT',
                resource: 'user',
                resourceId: id,
                metadata: { email: user.email },
            });
        }

        return { success: true, message: 'Invitation email resent' };
    }

    async update(id: string, dto: UpdateUserDto, actorId?: string) {
        const existing = await this.prisma.user.findUnique({ where: { id } });
        if (!existing) {
            throw new RpcException({ statusCode: 404, message: 'User not found', error: 'Not Found' });
        }

        if (dto.status !== undefined && !ACCOUNT_STATUSES.includes(dto.status)) {
            throw new RpcException({ statusCode: 400, message: `status must be one of ${ACCOUNT_STATUSES.join(', ')}`, error: 'Bad Request' });
        }

        // status is the richer, admin-facing field; isActive stays the single
        // thing login() actually checks, so keep it in sync whenever status
        // moves to/from ACTIVE. A bare PENDING doesn't force isActive either
        // way — login is already blocked on isEmailVerified for those users.
        let isActivePatch: boolean | undefined = dto.isActive;
        if (dto.status !== undefined) {
            if (dto.status === 'ACTIVE') isActivePatch = true;
            else if (dto.status === 'INACTIVE' || dto.status === 'SUSPENDED') isActivePatch = false;
        }

        // Manually verifying someone who was still PENDING is a natural
        // "skip the invite" override — bring status along with it.
        let statusPatch = dto.status;
        if (dto.isEmailVerified === true && statusPatch === undefined && existing.status === 'PENDING') {
            statusPatch = 'ACTIVE';
            if (isActivePatch === undefined) isActivePatch = true;
        }

        const user = await this.prisma.user.update({
            where: { id },
            data: {
                ...(dto.firstName !== undefined && { firstname: dto.firstName }),
                ...(dto.lastName !== undefined && { lastName: dto.lastName }),
                ...(dto.phone !== undefined && { phone: dto.phone }),
                ...(isActivePatch !== undefined && { isActive: isActivePatch }),
                ...(statusPatch !== undefined && { status: statusPatch }),
                ...(dto.isEmailVerified !== undefined && { isEmailVerified: dto.isEmailVerified }),
            },
            select: userListSelect,
        });

        if (actorId) {
            const logEntries: Promise<void>[] = [];

            if (statusPatch !== undefined && statusPatch !== existing.status) {
                logEntries.push(
                    this.activityLog.log({
                        userId: actorId,
                        action: 'USER_STATUS_CHANGED',
                        resource: 'user',
                        resourceId: id,
                        metadata: { from: existing.status, to: statusPatch },
                    }),
                );
            }
            if (dto.isEmailVerified !== undefined && dto.isEmailVerified !== existing.isEmailVerified) {
                logEntries.push(
                    this.activityLog.log({
                        userId: actorId,
                        action: 'EMAIL_VERIFICATION_TOGGLED',
                        resource: 'user',
                        resourceId: id,
                        metadata: { isEmailVerified: dto.isEmailVerified },
                    }),
                );
            }
            if (dto.isActive !== undefined && statusPatch === undefined) {
                logEntries.push(
                    this.activityLog.log({
                        userId: actorId,
                        action: dto.isActive ? 'USER_ACTIVATED' : 'USER_DEACTIVATED',
                        resource: 'user',
                        resourceId: id,
                    }),
                );
            }
            if (
                (dto.firstName !== undefined || dto.lastName !== undefined || dto.phone !== undefined) &&
                logEntries.length === 0
            ) {
                logEntries.push(
                    this.activityLog.log({ userId: actorId, action: 'USER_UPDATED', resource: 'user', resourceId: id }),
                );
            }

            await Promise.all(logEntries);
        }

        return mapUser(user);
    }

    async remove(id: string, actorId?: string) {
        if (actorId && actorId === id) {
            throw new RpcException({ statusCode: 400, message: 'You cannot delete your own account', error: 'Bad Request' });
        }

        const existing = await this.prisma.user.findUnique({ where: { id } });
        if (!existing) {
            throw new RpcException({ statusCode: 404, message: 'User not found', error: 'Not Found' });
        }

        // Soft delete — matches the convention used elsewhere in the codebase
        // (customer-service, order-service): deactivate rather than remove the row.
        await this.prisma.user.update({ where: { id }, data: { isActive: false } });

        // Revoke all refresh tokens so an already-issued session can't keep working.
        await this.prisma.refreshToken.updateMany({
            where: { userId: id, revoked: false },
            data: { revoked: true },
        });

        if (actorId) {
            await this.activityLog.log({
                userId: actorId,
                action: 'USER_DELETED',
                resource: 'user',
                resourceId: id,
                metadata: { email: existing.email },
            });
        }

        return { success: true, message: 'User deactivated successfully' };
    }

    async assignRoles(id: string, roleIds: string[], actorId?: string) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new RpcException({ statusCode: 404, message: 'User not found', error: 'Not Found' });
        }

        const roles = await this.prisma.role.findMany({ where: { id: { in: roleIds } } });
        if (roles.length !== roleIds.length) {
            throw new RpcException({ statusCode: 400, message: 'One or more roles do not exist', error: 'Bad Request' });
        }

        await this.prisma.$transaction([
            this.prisma.userRole.deleteMany({ where: { userId: id } }),
            this.prisma.userRole.createMany({ data: roleIds.map((roleId) => ({ userId: id, roleId })) }),
        ]);

        if (actorId) {
            await this.activityLog.log({
                userId: actorId,
                action: 'USER_ROLES_UPDATED',
                resource: 'user',
                resourceId: id,
                metadata: { roles: roles.map((r) => r.name) },
            });
        }

        return this.findOne(id);
    }

    async adminResetPassword(id: string, newPassword: string, actorId?: string) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new RpcException({ statusCode: 404, message: 'User not found', error: 'Not Found' });
        }

        const passwordHash = await bcrypt.hash(newPassword, 12);

        await this.prisma.$transaction([
            this.prisma.user.update({ where: { id }, data: { password: passwordHash } }),
            this.prisma.refreshToken.updateMany({ where: { userId: id, revoked: false }, data: { revoked: true } }),
        ]);

        if (actorId) {
            await this.activityLog.log({
                userId: actorId,
                action: 'USER_PASSWORD_RESET_BY_ADMIN',
                resource: 'user',
                resourceId: id,
            });
        }

        return { success: true, message: 'Password reset successfully' };
    }

    async getActivities(userId: string, page = 1, limit = 20) {
        return this.activityLog.findForUser(userId, page, limit);
    }
}
