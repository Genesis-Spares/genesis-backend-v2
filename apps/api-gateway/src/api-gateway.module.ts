import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/Auth.module';
import { ProductModule } from './modules/Product.module';
import { CustomerModule } from './modules/Customer.module';
@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        AuthModule,
        ProductModule,
        CustomerModule
    ],
})
export class ApiGatewayModule { }
