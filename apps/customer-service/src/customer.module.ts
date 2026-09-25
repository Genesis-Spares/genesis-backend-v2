// apps/customer-service/src/customer.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { PrismaService } from '../libs/prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // acknowledgement emails for contact-form messages (Redis, like auth & orders)
    ClientsModule.registerAsync([
      {
        name: 'NOTIFICATION_SERVICE',
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.REDIS,
          options: {
            host: config.get('REDIS_HOST', 'localhost'),
            port: Number(config.get('REDIS_PORT', 6379)),
            password: config.get('REDIS_PASSWORD'),
          },
        }),
      },
    ]),
  ],
  controllers: [CustomerController, MessageController, EmailController],
  providers: [CustomerService, MessageService, EmailService, PrismaService],
})
export class CustomerModule { }