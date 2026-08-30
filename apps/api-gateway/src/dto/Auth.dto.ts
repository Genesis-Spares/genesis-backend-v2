import { IsEmail, IsOptional, IsString, MaxLength, MinLength, Matches } from 'class-validator';

export class RegisterDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    password: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsOptional()
    @IsString()
    phone?: string;
}

export class LoginDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}

export class RefreshDto {
    @IsString()
    refreshToken: string;
}


export class SendOTPDto {
    @IsEmail()
    email: string;

    @IsString()
    @IsOptional()
    type?: 'REGISTER' | 'LOGIN' | 'FORGOT_PASSWORD' | 'CHANGE_EMAIL';
}

export class VerifyOTPDto {
    @IsEmail()
    email: string;

    @IsString()
    code: string;

    @IsString()
    @IsOptional()
    type?: 'REGISTER' | 'LOGIN' | 'FORGOT_PASSWORD' | 'CHANGE_EMAIL';
}

export class ResendOTPDto {
    @IsEmail()
    email: string;

    @IsString()
    @IsOptional()
    type?: 'REGISTER' | 'LOGIN' | 'FORGOT_PASSWORD' | 'CHANGE_EMAIL';
}

export class ForgotPasswordDto {
    @IsEmail({}, { message: 'email must be a valid email address' })
    email: string;
}

// ✅ Reset Password DTO
export class ResetPasswordDto {
    @IsEmail({}, { message: 'email must be a valid email address' })
    email: string;

    @IsString({ message: 'code must be a string' })
    @MinLength(6, { message: 'code must be exactly 6 digits' })
    @MaxLength(6, { message: 'code must be exactly 6 digits' })
    @Matches(/^\d{6}$/, { message: 'code must be exactly 6 digits' })
    code: string;

    @IsString({ message: 'newPassword must be a string' })
    @MinLength(8, { message: 'newPassword must be at least 8 characters' })
    @MaxLength(32, { message: 'newPassword must be at most 32 characters' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
        message: 'newPassword must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    })
    newPassword: string;

    @IsString({ message: 'confirmPassword must be a string' })
    confirmPassword: string;
}