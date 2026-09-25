import { Controller, Get } from '@nestjs/common';
import { AuthService } from './services/auth-service.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ForgotPasswordDto, RegisterDto, ResetPasswordDto } from './dto/Register.dto';
import { LoginDto, RefreshDto } from './dto/Login.dtio';
import { ResendOTPDto, VerifyOTPDto } from './dto/OTP.dto';
import { UserManagementService } from './services/user-management.service';
import { RoleManagementService } from './services/role-management.service';
import { ActivityLogService } from './services/activity-log.service';
import {
    CreateUserDto,
    UpdateUserDto,
    UserQueryDto,
    AssignRolesDto,
    AdminResetPasswordDto,
    UpdateProfileDto,
} from './dto/User.dto';
import { CreateRoleDto, UpdateRoleDto, AssignPermissionsDto } from './dto/Role.dto';

@Controller()
export class AuthServiceController {
    constructor(
        private readonly authService: AuthService,
        private readonly userManagementService: UserManagementService,
        private readonly roleManagementService: RoleManagementService,
        private readonly activityLogService: ActivityLogService,
    ) { }

    @MessagePattern('auth.register')
    register(@Payload() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    @MessagePattern('auth.verify.email')
    verifyEmail(@Payload() dto: VerifyOTPDto) {
        return this.authService.verifyEmail(dto);
    }

    @MessagePattern('auth.resend.otp')
    resendOTP(@Payload() dto: ResendOTPDto) {
        return this.authService.resendOTP(dto.email);
    }

    @MessagePattern('auth.login')
    login(@Payload() payload: LoginDto & { ipAddress?: string; userAgent?: string }) {
        const { ipAddress, userAgent, ...dto } = payload;
        return this.authService.login(dto, { ipAddress, userAgent });
    }

    // Public — reached by a brand-new user clicking the link in their
    // invitation email, so there's no JWT yet. Gateway leaves this unguarded
    // the same way auth.verify.email/auth.resend.otp are.
    @MessagePattern('auth.invite.verify')
    verifyInvite(@Payload() data: { token: string; ipAddress?: string; userAgent?: string }) {
        return this.authService.verifyInvite(data.token, { ipAddress: data.ipAddress, userAgent: data.userAgent });
    }

    @MessagePattern('auth.refresh')
    refresh(@Payload() dto: RefreshDto) {
        return this.authService.refresh(dto.refreshToken);
    }

    @MessagePattern('auth.password.reset.request')
    requestPasswordReset(@Payload() dto: ForgotPasswordDto) {
        return this.authService.requestPasswordReset(dto.email);
    }

    @MessagePattern('auth.password.reset')
    resetPassword(@Payload() dto: ResetPasswordDto) {
        return this.authService.resetPassword(dto);
    }

    // ============================================
    // USER MANAGEMENT (admin)
    // ============================================

    @MessagePattern('user.find.all')
    findAllUsers(@Payload() query: UserQueryDto) {
        return this.userManagementService.findAll(query || {});
    }

    @MessagePattern('user.stats')
    getUserStats() {
        return this.userManagementService.getStats();
    }

    @MessagePattern('user.find.one')
    findOneUser(@Payload() data: { id: string }) {
        return this.userManagementService.findOne(data.id);
    }

    @MessagePattern('user.create')
    createUser(@Payload() data: { dto: CreateUserDto; actorId?: string }) {
        return this.userManagementService.create(data.dto, data.actorId);
    }

    @MessagePattern('user.update')
    updateUser(@Payload() data: { id: string; dto: UpdateUserDto; actorId?: string }) {
        return this.userManagementService.update(data.id, data.dto, data.actorId);
    }

    @MessagePattern('user.delete')
    deleteUser(@Payload() data: { id: string; actorId?: string }) {
        return this.userManagementService.remove(data.id, data.actorId);
    }

    @MessagePattern('user.roles.assign')
    assignUserRoles(@Payload() data: { id: string; dto: AssignRolesDto; actorId?: string }) {
        return this.userManagementService.assignRoles(data.id, data.dto.roleIds, data.actorId);
    }

    @MessagePattern('user.password.reset.admin')
    adminResetUserPassword(@Payload() data: { id: string; dto: AdminResetPasswordDto; actorId?: string }) {
        return this.userManagementService.adminResetPassword(data.id, data.dto.newPassword, data.actorId);
    }

    @MessagePattern('user.activities.find')
    findUserActivities(@Payload() data: { userId: string; page?: number; limit?: number }) {
        return this.userManagementService.getActivities(data.userId, data.page, data.limit);
    }

    // Backs the "Resend Verification Email" admin control.
    @MessagePattern('user.invite.resend')
    resendInvite(@Payload() data: { id: string; actorId?: string }) {
        return this.userManagementService.resendInvite(data.id, data.actorId);
    }

    // Global feed across every user, for the admin dashboard's "Logs" panel
    // — distinct from user.activities.find, which is scoped to one user.
    @MessagePattern('activity.find.recent')
    findRecentActivity(@Payload() data: { page?: number; limit?: number }) {
        return this.activityLogService.findRecent(data?.page, data?.limit);
    }

    // Self-service profile update — the authenticated user editing their own
    // record. Bypasses the user:update permission gate (so e.g. `staff`,
    // who only has user:read, can still edit their own name/phone) while
    // still requiring authentication via the gateway's JwtAuthGuard.
    // UpdateProfileDto has no `isActive`, so this can never self-deactivate.
    @MessagePattern('user.profile.update.self')
    updateMyProfile(@Payload() data: { id: string; dto: UpdateProfileDto }) {
        return this.userManagementService.update(data.id, data.dto, data.id);
    }

    // ============================================
    // ROLE & PERMISSION MANAGEMENT (admin)
    // ============================================

    @MessagePattern('role.find.all')
    findAllRoles() {
        return this.roleManagementService.findAll();
    }

    @MessagePattern('role.find.one')
    findOneRole(@Payload() data: { id: string }) {
        return this.roleManagementService.findOne(data.id);
    }

    @MessagePattern('role.create')
    createRole(@Payload() data: { dto: CreateRoleDto; actorId?: string }) {
        return this.roleManagementService.create(data.dto, data.actorId);
    }

    @MessagePattern('role.update')
    updateRole(@Payload() data: { id: string; dto: UpdateRoleDto; actorId?: string }) {
        return this.roleManagementService.update(data.id, data.dto, data.actorId);
    }

    @MessagePattern('role.delete')
    deleteRole(@Payload() data: { id: string; actorId?: string }) {
        return this.roleManagementService.remove(data.id, data.actorId);
    }

    @MessagePattern('role.permissions.assign')
    assignRolePermissions(@Payload() data: { id: string; dto: AssignPermissionsDto; actorId?: string }) {
        return this.roleManagementService.assignPermissions(data.id, data.dto.permissionIds, data.actorId);
    }

    @MessagePattern('permission.find.all')
    findAllPermissions() {
        return this.roleManagementService.listPermissions();
    }
}
