import { Controller, Get } from '@nestjs/common';
import { AuthService } from './services/auth-service.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ForgotPasswordDto, RegisterDto, ResetPasswordDto } from './dto/Register.dto';
import { LoginDto, RefreshDto } from './dto/Login.dtio';
import { ResendOTPDto, VerifyOTPDto } from './dto/OTP.dto';
@Controller()
export class AuthServiceController {
    constructor(private readonly authService: AuthService) { }

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
    login(@Payload() dto: LoginDto) {
        return this.authService.login(dto);
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
}
