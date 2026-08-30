import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from "class-validator";


export class RegisterDto {
    @IsEmail()

    email: string

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
}

export class ForgotPasswordDto {
    @IsEmail({}, { message: 'email must be an email' })
    email: string;
}

export class ResetPasswordDto {
    @IsEmail({}, { message: 'email must be an email' })
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
