import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../common/guards/permissions.guard';
import { OrderController } from '../controllers/Order.controller';
import { MyOrdersController } from '../controllers/MyOrders.controller';
import { MyReturnsController, ReturnsController } from '../controllers/Returns.controller';
import { ReportsController } from '../controllers/Reports.controller';
import { CheckoutController } from '../controllers/Checkout.controller';
import { PaymentsController } from '../controllers/Payments.controller';
import { DeliverySettingsController } from '../controllers/DeliverySettings.controller';
@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: 'ORDER_SERVICE',
                useFactory: (config: ConfigService) => ({
                    transport: Transport.TCP,
                    options: {
                        host: config.get('ORDER_SERVICE_HOST', 'localhost'),
                        port: config.get('ORDER_SERVICE_PORT', 11006),
                    },
                }),
                inject: [ConfigService],
            },
            {
                // shopper checkout re-prices cart items from the catalogue
                name: 'PRODUCT_SERVICE',
                useFactory: (config: ConfigService) => ({
                    transport: Transport.TCP,
                    options: {
                        host: config.get('PRODUCT_SERVICE_HOST', 'localhost'),
                        port: config.get('PRODUCT_SERVICE_PORT', 11004),
                    },
                }),
                inject: [ConfigService],
            },
        ]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.get<string>('JWT_SECRET'), // ✅ Same secret as Auth Service
                signOptions: {
                    expiresIn: (config.get<string>('JWT_EXPIRES_IN') || '1h') as `${number}${'s' | 'm' | 'h' | 'd'}`,
                },
            }),

        }),
    ],
    controllers: [OrderController, MyOrdersController, MyReturnsController, ReturnsController, ReportsController, CheckoutController, PaymentsController, DeliverySettingsController],
    // exported so any other feature module in the gateway can guard its routes
    providers: [JwtAuthGuard, PermissionsGuard],
    exports: [JwtModule, JwtAuthGuard, PermissionsGuard],
})
export class OrderModule { }
