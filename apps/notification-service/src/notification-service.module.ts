import { Module } from '@nestjs/common';
import { NotificationController } from './notification-service.controller';
import { NotificationService } from './notification-service.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PrismaService } from 'libs/prisma/prisma.service';
import { EmailService } from './email.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        ClientsModule.registerAsync([
            {
                name: 'NOTIFICATION_SERVICE',
                useFactory: (config: ConfigService) => ({
                    transport: Transport.REDIS,
                    options: {
                        host: config.get('REDIS_HOST', 'localhost'),
                        port: config.get('REDIS_PORT', 11002),
                        password: config.get('REDIS_PASSWORD'),
                        retryAttempts: 5,
                        retryDelay: 1000,
                    },
                }),
                inject: [ConfigService],
            },
        ]),
    ],
    controllers: [NotificationController],
    providers: [NotificationService, EmailService, PrismaService],
    exports: [NotificationService]
})
export class NotificationModule { }
