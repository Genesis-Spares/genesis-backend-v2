// apps/auth-service/src/dto/OTP.dto.ts
import { IsEmail, IsString, IsOptional, IsUUID } from 'class-validator';

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