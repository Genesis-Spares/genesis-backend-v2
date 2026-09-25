// apps/auth-service/src/dto/User.dto.ts
import {
    IsArray,
    IsBoolean,
    IsEmail,
    IsIn,
    IsOptional,
    IsString,
    IsUUID,
    MaxLength,
    MinLength,
} from 'class-validator';

export const ACCOUNT_STATUSES = ['PENDING', 'ACTIVE', 'INACTIVE', 'SUSPENDED'] as const;
export type AccountStatus = (typeof ACCOUNT_STATUSES)[number];

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString({ message: 'password must be a string' })
    @MinLength(8, { message: 'password must be at least 8 characters' })
    @MaxLength(32, { message: 'password must be at most 32 characters' })
    password: string;

    @IsString({ message: 'firstName must be a string' })
    @MinLength(2, { message: 'firstName must be at least 2 characters' })
    @MaxLength(50, { message: 'firstName must be at most 50 characters' })
    firstName: string;

    @IsString({ message: 'lastName must be a string' })
    @MinLength(2, { message: 'lastName must be at least 2 characters' })
    @MaxLength(50, { message: 'lastName must be at most 50 characters' })
    lastName: string;

    @IsOptional()
    @IsString()
    phone?: string;

    // Admin-assigned roles at creation time. Defaults to the "customer"
    // role when omitted, matching self-registration.
    @IsOptional()
    @IsArray()
    @IsUUID('4', { each: true })
    roleIds?: string[];

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}

export class UpdateUserDto {
    @IsOptional()
    @IsString({ message: 'firstName must be a string' })
    @MinLength(2, { message: 'firstName must be at least 2 characters' })
    @MaxLength(50, { message: 'firstName must be at most 50 characters' })
    firstName?: string;

    @IsOptional()
    @IsString({ message: 'lastName must be a string' })
    @MinLength(2, { message: 'lastName must be at least 2 characters' })
    @MaxLength(50, { message: 'lastName must be at most 50 characters' })
    lastName?: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    // Admin-facing account status — richer than isActive alone (see
    // schema.prisma's comment on User.status). Setting this keeps isActive
    // in sync in user-management.service.ts.
    @IsOptional()
    @IsIn(ACCOUNT_STATUSES)
    status?: AccountStatus;

    // Direct admin override of email-verification status, per the "Edit
    // user information... Email verification status (isEmailVerified
    // toggle)" requirement. Bypasses the invite-link flow entirely.
    @IsOptional()
    @IsBoolean()
    isEmailVerified?: boolean;
}

// Self-service profile edit (PATCH /users/me/profile). Deliberately a
// narrower surface than UpdateUserDto — no `isActive`, so a user can never
// deactivate/reactivate their own account via this route.
export class UpdateProfileDto {
    @IsOptional()
    @IsString({ message: 'firstName must be a string' })
    @MinLength(2, { message: 'firstName must be at least 2 characters' })
    @MaxLength(50, { message: 'firstName must be at most 50 characters' })
    firstName?: string;

    @IsOptional()
    @IsString({ message: 'lastName must be a string' })
    @MinLength(2, { message: 'lastName must be at least 2 characters' })
    @MaxLength(50, { message: 'lastName must be at most 50 characters' })
    lastName?: string;

    @IsOptional()
    @IsString()
    phone?: string;
}

export class UserQueryDto {
    @IsOptional()
    page?: number;

    @IsOptional()
    limit?: number;

    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    isActive?: boolean;

    @IsOptional()
    @IsUUID()
    roleId?: string;

    @IsOptional()
    @IsString()
    sortBy?: string;

    @IsOptional()
    @IsString()
    sortOrder?: 'asc' | 'desc';
}

export class AssignRolesDto {
    @IsArray()
    @IsUUID('4', { each: true })
    roleIds: string[];
}

export class AdminResetPasswordDto {
    @IsString({ message: 'newPassword must be a string' })
    @MinLength(8, { message: 'newPassword must be at least 8 characters' })
    @MaxLength(32, { message: 'newPassword must be at most 32 characters' })
    newPassword: string;
}
