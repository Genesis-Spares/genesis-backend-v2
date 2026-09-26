import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/Auth.module';
import { ProductModule } from './modules/Product.module';
import { CustomerModule } from './modules/Customer.module';
import { OrderModule } from './modules/Order.module';
import { NotificationsModule } from './modules/Notifications.module';
@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        AuthModule,
        ProductModule,
        CustomerModule,
        OrderModule,
        NotificationsModule,
    ],
})
export class ApiGatewayModule { }
