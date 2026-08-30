import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { ValidationPipe } from '@nestjs/common';
import { SafeLoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(ApiGatewayModule);

    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        transform: true,
    }));

    app.enableCors({
        origin: [
            'http://localhost:3000',
            'http://192.168.100.164:3000'
        ],
        methods: [
            'GET',
            'POST',
            'PUT',
            'PATCH',
            'DELETE',
            'OPTIONS',
        ],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Accept',
        ],
        credentials: true,
    });

    app.useGlobalInterceptors(new SafeLoggingInterceptor());
    await app.listen(process.env.API_GATEWAY_PORT || 11000);
}
bootstrap();
