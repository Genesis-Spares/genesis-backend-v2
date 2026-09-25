// apps/order-service/src/order.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { ReturnService } from './return.service';
import { ReportService } from './report.service';
import { PrismaService } from '../libs/prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // stock is owned by the product service — orders take and return it there
    ClientsModule.registerAsync([
      {
        name: 'PRODUCT_SERVICE',
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.get('PRODUCT_SERVICE_HOST', 'localhost'),
            port: Number(config.get('PRODUCT_PORT', 11004)),
          },
        }),
      },
      // customer emails / SMS go through the notification service (Redis, like auth)
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
  controllers: [OrderController],
  providers: [OrderService, ReturnService, ReportService, PrismaService],
})
export class OrderModule { }
