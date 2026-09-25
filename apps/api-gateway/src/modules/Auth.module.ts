import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '../controllers/Auth.controller';
import { MeController } from '../controllers/Me.controller';
import { SidebarController } from '../controllers/Sidebar.controller';
import { UserController } from '../controllers/User.controller';
import { RoleController } from '../controllers/Role.controller';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../common/guards/permissions.guard';

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: 'AUTH_SERVICE',
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (config: ConfigService) => ({
                    transport: Transport.TCP,
                    options: {
                        host: config.get<string>('AUTH_SERVICE_HOST', 'localhost'),
                        port: config.get<number>('AUTH_SERVICE_PORT', 11001),
                    },
                }),
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
    controllers: [AuthController, MeController, SidebarController, UserController, RoleController],
    // exported so any other feature module in the gateway can guard its routes
    providers: [JwtAuthGuard, PermissionsGuard],
    exports: [JwtModule, JwtAuthGuard, PermissionsGuard],
})
export class AuthModule { }