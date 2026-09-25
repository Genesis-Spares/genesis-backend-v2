import { Module } from '@nestjs/common';
import { NotificationController } from './notification-service.controller';
import { NotificationService } from './services/notification-service.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PrismaService } from '../libs/prisma/prisma.service';
import { EmailService } from './services/email.service';
import { SmsService } from './services/sms.service';
import { EmailTemplateService } from './templates/email-template.service';

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
    providers: [NotificationService, EmailService, SmsService, PrismaService, EmailTemplateService],
    exports: [NotificationService]
})
export class NotificationModule { }
