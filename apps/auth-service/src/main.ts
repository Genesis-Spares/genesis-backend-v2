import { NestFactory } from '@nestjs/core';
import { AuthServiceModule } from './auth-service.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.createMicroservice(AuthServiceModule, {
        transport: Transport.TCP,
        options: {
            host: process.env.AUTH_SERVICE_HOST || '127.0.0.1',
            port: Number(process.env.AUTH_SERVICE_PORT) || 11001,
        }
    });
    await app.listen();
}
bootstrap();
