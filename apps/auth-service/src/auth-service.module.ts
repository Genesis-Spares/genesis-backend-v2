// apps/auth-service/src/auth-service.module.ts
import { Module } from '@nestjs/common';
import { AuthServiceController } from './auth-service.controller';
import { AuthService } from './services/auth-service.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '../libs/prisma/prisma.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OTPService } from './services/otp.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.get<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: (config.get<string>('JWT_EXPIRES_IN') || '1d') as `${number}${'s' | 'm' | 'h' | 'd'}`,
                },
            }),
        }),
        ClientsModule.registerAsync([
            {
                name: 'NOTIFICATION_SERVICE',
                useFactory: (config: ConfigService) => ({
                    transport: Transport.REDIS,
                    options: {
                        host: config.get('REDIS_HOST', 'localhost'),
                        port: config.get('REDIS_PORT', 6379),
                        password: config.get('REDIS_PASSWORD'),
                    },
                }),
                inject: [ConfigService],
            },
            {
                name: 'CUSTOMER_SERVICE',
                useFactory: (config: ConfigService) => ({
                    transport: Transport.TCP,
                    options: {
                        host: config.get('CUSTOMER_SERVICE_HOST', 'localhost'),
                        port: config.get('CUSTOMER_SERVICE_PORT', 11005),
                    },
                }),
                inject: [ConfigService],
            },

        ]),
    ],
    controllers: [AuthServiceController],
    providers: [AuthService, PrismaService, OTPService],
})
export class AuthServiceModule { }