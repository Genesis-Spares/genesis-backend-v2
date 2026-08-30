import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../common/guards/permissions.guard';
import { CustomerController } from '../controllers/Customer.controller';
@Module({
    imports: [
        ClientsModule.registerAsync([
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
    controllers: [CustomerController],
    // exported so any other feature module in the gateway can guard its routes
    providers: [JwtAuthGuard, PermissionsGuard],
    exports: [JwtModule, JwtAuthGuard, PermissionsGuard],
})
export class CustomerModule { }