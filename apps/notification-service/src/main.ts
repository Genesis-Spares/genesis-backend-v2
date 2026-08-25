import { NestFactory } from '@nestjs/core';
import { NotificationModule } from './notification-service.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.create(NotificationModule);
    const configService = app.get(ConfigService);

    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.REDIS,
        options: {
            host: configService.get('REDIS_HOST', 'localhost'),
            port: configService.get('REDIS_PORT', 18652),
            password: configService.get('REDIS_PASSWORD'),
            retryAttempts: 5,
            retryDelay: 1000,
            retryStrategy: (times) => {
                // Exponential backoff
                return Math.min(times * 50, 2000);
            },
            // tls: {
            //     rejectUnauthorized: false, // Or use your CA cert
            // },
            // ✅ Keep connection alive
            keepAlive: 30000,
            // ✅ Connection timeout
            connectTimeout: 10000,

        },
    });

    await app.startAllMicroservices();
    await app.listen(configService.get('NOTIFICATION_PORT', 11003));
    console.log('✅ Notification service is running on port', configService.get('PORT', 11003));

}
bootstrap();
