// apps/auth-service/src/services/role-management.service.ts
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from '../../libs/prisma/prisma.service';
import { ActivityLogService } from './activity-log.service';
import { CreateRoleDto, UpdateRoleDto } from '../dto/Role.dto';

function mapRole(role: any) {
    if (!role) return role;
    const { permissions, users, _count, ...rest } = role;
    return {
        ...rest,
        permissions: (permissions ?? []).map((rp: any) => rp.permission),
        userCount: _count?.users ?? (Array.isArray(users) ? users.length : undefined),
    };
}

@Injectable()
export class RoleManagementService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly activityLog: ActivityLogService,
    ) { }

    async findAll() {
        const roles = await this.prisma.role.findMany({
            include: {
                permissions: { include: { permission: true } },
                _count: { select: { users: true } },
            },
            orderBy: { createAt: 'asc' },
        });
        return roles.map(mapRole);
    }

    async findOne(id: string) {
        const role = await this.prisma.role.findUnique({
            where: { id },
            include: {
                permissions: { include: { permission: true } },
                users: {
                    include: {
                        user: { select: { id: true, email: true, firstname: true, lastName: true, isActive: true } },
                    },
                },
            },
        });

        if (!role) {
            throw new RpcException({ statusCode: 404, message: 'Role not found', error: 'Not Found' });
        }

        const { users, ...rest } = role as any;
        return {
            ...mapRole(rest),
            users: (users ?? []).map((ur: any) => ur.user),
        };
    }

    async create(dto: CreateRoleDto, actorId?: string) {
        const existing = await this.prisma.role.findUnique({ where: { name: dto.name } });
        if (existing) {
            throw new RpcException({ statusCode: 400, message: 'A role with this name already exists', error: 'Bad Request' });
        }

        if (dto.permissionIds && dto.permissionIds.length > 0) {
            const permissions = await this.prisma.permission.findMany({ where: { id: { in: dto.permissionIds } } });
            if (permissions.length !== dto.permissionIds.length) {
                throw new RpcException({ statusCode: 400, message: 'One or more permissions do not exist', error: 'Bad Request' });
            }
        }

        const role = await this.prisma.role.create({
            data: {
                name: dto.name,
                description: dto.description,
                isSystem: false,
                ...(dto.permissionIds &&
                    dto.permissionIds.length > 0 && {
                    permissions: { create: dto.permissionIds.map((permissionId) => ({ permissionId })) },
                }),
            },
            include: { permissions: { include: { permission: true } }, _count: { select: { users: true } } },
        });

        if (actorId) {
            await this.activityLog.log({
                userId: actorId,
                action: 'ROLE_CREATED',
                resource: 'role',
                resourceId: role.id,
                metadata: { name: role.name },
            });
        }

        return mapRole(role);
    }

    async update(id: string, dto: UpdateRoleDto, actorId?: string) {
        const existing = await this.prisma.role.findUnique({ where: { id } });
        if (!existing) {
            throw new RpcException({ statusCode: 404, message: 'Role not found', error: 'Not Found' });
        }

        if (dto.name && dto.name !== existing.name) {
            const nameTaken = await this.prisma.role.findUnique({ where: { name: dto.name } });
            if (nameTaken) {
                throw new RpcException({ statusCode: 400, message: 'A role with this name already exists', error: 'Bad Request' });
            }
        }

        const role = await this.prisma.role.update({
            where: { id },
            data: {
                ...(dto.name !== undefined && { name: dto.name }),
                ...(dto.description !== undefined && { description: dto.description }),
            },
            include: { permissions: { include: { permission: true } }, _count: { select: { users: true } } },
        });

        if (actorId) {
            await this.activityLog.log({
                userId: actorId,
                action: 'ROLE_UPDATED',
                resource: 'role',
                resourceId: id,
            });
        }

        return mapRole(role);
    }

    async remove(id: string, actorId?: string) {
        const role = await this.prisma.role.findUnique({
            where: { id },
            include: { _count: { select: { users: true } } },
        });

        if (!role) {
            throw new RpcException({ statusCode: 404, message: 'Role not found', error: 'Not Found' });
        }

        if (role.isSystem) {
            throw new RpcException({ statusCode: 400, message: 'Built-in roles cannot be deleted', error: 'Bad Request' });
        }

        if (role._count.users > 0) {
            throw new RpcException({
                statusCode: 409,
                message: `Cannot delete role: ${role._count.users} user(s) are still assigned to it`,
                error: 'Conflict',
            });
        }

        await this.prisma.role.delete({ where: { id } });

        if (actorId) {
            await this.activityLog.log({
                userId: actorId,
                action: 'ROLE_DELETED',
                resource: 'role',
                resourceId: id,
                metadata: { name: role.name },
            });
        }

        return { success: true, message: 'Role deleted successfully' };
    }

    async assignPermissions(id: string, permissionIds: string[], actorId?: string) {
        const role = await this.prisma.role.findUnique({ where: { id } });
        if (!role) {
            throw new RpcException({ statusCode: 404, message: 'Role not found', error: 'Not Found' });
        }

        if (permissionIds.length > 0) {
            const permissions = await this.prisma.permission.findMany({ where: { id: { in: permissionIds } } });
            if (permissions.length !== permissionIds.length) {
                throw new RpcException({ statusCode: 400, message: 'One or more permissions do not exist', error: 'Bad Request' });
            }
        }

        await this.prisma.$transaction([
            this.prisma.rolePermission.deleteMany({ where: { roleId: id } }),
            ...(permissionIds.length > 0
                ? [
                    this.prisma.rolePermission.createMany({
                        data: permissionIds.map((permissionId) => ({ roleId: id, permissionId })),
                    }),
                ]
                : []),
        ]);

        if (actorId) {
            await this.activityLog.log({
                userId: actorId,
                action: 'ROLE_PERMISSIONS_UPDATED',
                resource: 'role',
                resourceId: id,
                metadata: { permissionCount: permissionIds.length },
            });
        }

        return this.findOne(id);
    }

    async listPermissions() {
        const permissions = await this.prisma.permission.findMany({
            orderBy: [{ resource: 'asc' }, { action: 'asc' }],
        });

        const grouped = new Map<string, typeof permissions>();
        for (const perm of permissions) {
            if (!grouped.has(perm.resource)) grouped.set(perm.resource, []);
            grouped.get(perm.resource)!.push(perm);
        }

        return {
            permissions,
            grouped: Array.from(grouped.entries()).map(([resource, perms]) => ({ resource, permissions: perms })),
        };
    }
}
