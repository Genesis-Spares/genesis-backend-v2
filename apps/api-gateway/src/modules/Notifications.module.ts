import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { NotificationsController } from '../controllers/Notifications.controller';

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                // the notification service listens on Redis (events + request/reply)
                name: 'NOTIFICATION_SERVICE',
                inject: [ConfigService],
                useFactory: (config: ConfigService) => ({
                    transport: Transport.REDIS,
                    options: {
                        host: config.get<string>('REDIS_HOST', 'localhost'),
                        port: Number(config.get<string>('REDIS_PORT', '6379')),
                        password: config.get<string>('REDIS_PASSWORD') || undefined,
                    },
                }),
            },
        ]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.get<string>('JWT_SECRET'),
            }),
        }),
    ],
    controllers: [NotificationsController],
    providers: [JwtAuthGuard],
})
export class NotificationsModule { }
