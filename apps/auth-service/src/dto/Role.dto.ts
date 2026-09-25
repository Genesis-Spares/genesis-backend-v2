// apps/auth-service/src/dto/Role.dto.ts
import { IsArray, IsOptional, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class CreateRoleDto {
    @IsString({ message: 'name must be a string' })
    @MinLength(2, { message: 'name must be at least 2 characters' })
    @MaxLength(50, { message: 'name must be at most 50 characters' })
    name: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    description?: string;

    @IsOptional()
    @IsArray()
    @IsUUID('4', { each: true })
    permissionIds?: string[];
}

export class UpdateRoleDto {
    @IsOptional()
    @IsString({ message: 'name must be a string' })
    @MinLength(2, { message: 'name must be at least 2 characters' })
    @MaxLength(50, { message: 'name must be at most 50 characters' })
    name?: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    description?: string;
}

export class AssignPermissionsDto {
    @IsArray()
    @IsUUID('4', { each: true })
    permissionIds: string[];
}
