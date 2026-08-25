import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth-service.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RegisterDto } from './dto/Register.dto';
import { LoginDto, RefreshDto } from './dto/Login.dtio';
@Controller()
export class AuthServiceController {
    constructor(private readonly authService: AuthService) { }

    @MessagePattern('auth.register')
    register(@Payload() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    @MessagePattern('auth.login')
    login(@Payload() dto: LoginDto) {
        return this.authService.login(dto);
    }

    @MessagePattern('auth.refresh')
    refresh(@Payload() dto: RefreshDto) {
        return this.authService.refresh(dto.refreshToken);
    }
}
