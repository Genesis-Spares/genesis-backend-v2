// apps/api-gateway/src/controllers/Role.controller.ts
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../common/guards/permissions.guard';
import { Permissions } from '../common/decorators/permissions.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { type JwtPayload } from '../common/types/jwt-payload.type';
import { CreateRoleDto, UpdateRoleDto, AssignPermissionsDto } from 'apps/auth-service/src/dto/Role.dto';

@Controller('roles')
@UseGuards(JwtAuthGuard)
export class RoleController {
    constructor(@Inject('AUTH_SERVICE') private readonly authClient: ClientProxy) { }

    // Full permission catalog for the role/permission builder UI.
    // Declared before ':id' but it's a distinct 2-segment path so there's
    // no route-matching collision either way.
    @Get('permissions/catalog')
    @UseGuards(PermissionsGuard)
    @Permissions('role:read')
    async listPermissions() {
        return this.forward('permission.find.all', {});
    }

    @Get()
    @UseGuards(PermissionsGuard)
    @Permissions('role:read')
    async findAll() {
        return this.forward('role.find.all', {});
    }

    @Get(':id')
    @UseGuards(PermissionsGuard)
    @Permissions('role:read')
    async findOne(@Param('id') id: string) {
        return this.forward('role.find.one', { id });
    }

    @Post()
    @UseGuards(PermissionsGuard)
    @Permissions('role:create')
    async create(@Body() dto: CreateRoleDto, @CurrentUser() actor: JwtPayload) {
        return this.forward('role.create', { dto, actorId: actor.sub });
    }

    @Put(':id')
    @UseGuards(PermissionsGuard)
    @Permissions('role:update')
    async update(@Param('id') id: string, @Body() dto: UpdateRoleDto, @CurrentUser() actor: JwtPayload) {
        return this.forward('role.update', { id, dto, actorId: actor.sub });
    }

    @Delete(':id')
    @UseGuards(PermissionsGuard)
    @Permissions('role:delete')
    async remove(@Param('id') id: string, @CurrentUser() actor: JwtPayload) {
        return this.forward('role.delete', { id, actorId: actor.sub });
    }

    @Put(':id/permissions')
    @UseGuards(PermissionsGuard)
    @Permissions('role:update')
    async assignPermissions(
        @Param('id') id: string,
        @Body() dto: AssignPermissionsDto,
        @CurrentUser() actor: JwtPayload,
    ) {
        return this.forward('role.permissions.assign', { id, dto, actorId: actor.sub });
    }

    // ============================================
    // PRIVATE METHODS
    // ============================================

    private forward(pattern: string, payload: unknown) {
        return firstValueFrom(
            this.authClient.send(pattern, payload).pipe(
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
        let message = 'Role service error';
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
