// apps/auth-service/src/dto/PasswordReset.dto.ts
import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class ForgotPasswordDto {
    @IsEmail({}, { message: 'email must be a valid email' })
    email: string;
}

export class ResetPasswordDto {
    @IsEmail({}, { message: 'email must be a valid email' })
    email: string;

    @IsString({ message: 'code must be a string' })
    @MinLength(6, { message: 'code must be 6 digits' })
    @MaxLength(6, { message: 'code must be 6 digits' })
    code: string;

    @IsString({ message: 'newPassword must be a string' })
    @MinLength(8, { message: 'newPassword must be at least 8 characters' })
    @MaxLength(32, { message: 'newPassword must be at most 32 characters' })
    newPassword: string;

    @IsString({ message: 'confirmPassword must be a string' })
    confirmPassword: string;
}