import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ReviewController } from './controllers/review.controller';
import { ReviewService } from './services/review.service';
import { VehicleController } from './controllers/vehicle.controller';
import { VehicleService } from './services/vehicle.service';
import { InventoryController } from './controllers/inventory.controller';
import { InventoryService } from './services/inventory.service';
import { LowStockNotifier } from './services/low-stock.notifier';
import { CacheModule } from './modules/cache.module';
import { PrismaService } from '../libs/prisma/prisma.service';
import { CategoryModule } from './modules/category.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        CacheModule,
        CategoryModule,
        // reviews are limited to verified buyers — the order service confirms delivery
        ClientsModule.registerAsync([
            {
                name: 'ORDER_SERVICE',
                inject: [ConfigService],
                useFactory: (config: ConfigService) => ({
                    transport: Transport.TCP,
                    options: {
                        host: config.get('ORDER_SERVICE_HOST', 'localhost'),
                        port: Number(config.get('ORDER_SERVICE_PORT', 11006)),
                    },
                }),
            },
            // low-stock alerts go to the notification service (Redis, like the other services)
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
    controllers: [
        ProductsController,
        ReviewController,
        VehicleController,
        InventoryController,
    ],
    providers: [
        ProductService,
        ReviewService,
        VehicleService,
        InventoryService,
        LowStockNotifier,
        PrismaService
    ],
})
export class ProductModule { }
