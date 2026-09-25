// apps/api-gateway/src/controllers/User.controller.ts
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, Patch, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../common/guards/permissions.guard';
import { Permissions } from '../common/decorators/permissions.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { type JwtPayload } from '../common/types/jwt-payload.type';
import {
    CreateUserDto,
    UpdateUserDto,
    UserQueryDto,
    AssignRolesDto,
    AdminResetPasswordDto,
    UpdateProfileDto,
} from 'apps/auth-service/src/dto/User.dto';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
    constructor(@Inject('AUTH_SERVICE') private readonly authClient: ClientProxy) { }

    // Self-service profile routes — any authenticated user, not gated by
    // user:read/user:update. Declared before the `:id` routes for clarity;
    // NestJS wouldn't collide them anyway (different segment shapes), but
    // "me/profile" reading naturally at the top keeps this controller
    // readable as "self first, then admin".
    @Get('me/profile')
    async getMyProfile(@CurrentUser() actor: JwtPayload) {
        return this.forward('user.find.one', { id: actor.sub });
    }

    @Patch('me/profile')
    async updateMyProfile(@Body() dto: UpdateProfileDto, @CurrentUser() actor: JwtPayload) {
        return this.forward('user.profile.update.self', { id: actor.sub, dto });
    }

    @Get()
    @UseGuards(PermissionsGuard)
    @Permissions('user:read')
    async findAll(@Query() query: UserQueryDto) {
        return this.forward('user.find.all', query || {});
    }

    @Get('stats')
    @UseGuards(PermissionsGuard)
    @Permissions('user:read')
    async getStats() {
        return this.forward('user.stats', {});
    }

    // Global feed across every user, for the admin dashboard's "Logs" panel
    // — distinct from :id/activities, which is scoped to one user.
    @Get('activity/recent')
    @UseGuards(PermissionsGuard)
    @Permissions('user:read')
    async getRecentActivity(@Query('page') page?: number, @Query('limit') limit?: number) {
        return this.forward('activity.find.recent', { page: page || 1, limit: limit || 20 });
    }

    @Get(':id')
    @UseGuards(PermissionsGuard)
    @Permissions('user:read')
    async findOne(@Param('id') id: string) {
        return this.forward('user.find.one', { id });
    }

    @Post()
    @UseGuards(PermissionsGuard)
    @Permissions('user:create')
    async create(@Body() dto: CreateUserDto, @CurrentUser() actor: JwtPayload) {
        return this.forward('user.create', { dto, actorId: actor.sub });
    }

    @Put(':id')
    @UseGuards(PermissionsGuard)
    @Permissions('user:update')
    async update(@Param('id') id: string, @Body() dto: UpdateUserDto, @CurrentUser() actor: JwtPayload) {
        return this.forward('user.update', { id, dto, actorId: actor.sub });
    }

    @Delete(':id')
    @UseGuards(PermissionsGuard)
    @Permissions('user:delete')
    async remove(@Param('id') id: string, @CurrentUser() actor: JwtPayload) {
        return this.forward('user.delete', { id, actorId: actor.sub });
    }

    @Put(':id/roles')
    @UseGuards(PermissionsGuard)
    @Permissions('user:update')
    async assignRoles(@Param('id') id: string, @Body() dto: AssignRolesDto, @CurrentUser() actor: JwtPayload) {
        return this.forward('user.roles.assign', { id, dto, actorId: actor.sub });
    }

    @Post(':id/password-reset')
    @UseGuards(PermissionsGuard)
    @Permissions('user:update')
    async adminResetPassword(
        @Param('id') id: string,
        @Body() dto: AdminResetPasswordDto,
        @CurrentUser() actor: JwtPayload,
    ) {
        return this.forward('user.password.reset.admin', { id, dto, actorId: actor.sub });
    }

    @Post(':id/resend-invite')
    @UseGuards(PermissionsGuard)
    @Permissions('user:update')
    async resendInvite(@Param('id') id: string, @CurrentUser() actor: JwtPayload) {
        return this.forward('user.invite.resend', { id, actorId: actor.sub });
    }

    @Get(':id/activities')
    @UseGuards(PermissionsGuard)
    @Permissions('user:read')
    async getActivities(
        @Param('id') id: string,
        @Query('page') page?: number,
        @Query('limit') limit?: number,
    ) {
        return this.forward('user.activities.find', { userId: id, page: page || 1, limit: limit || 20 });
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
        let message = 'User service error';
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
