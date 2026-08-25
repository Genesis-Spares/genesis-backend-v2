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

    app.enableCors();
    app.useGlobalInterceptors(new SafeLoggingInterceptor());
    await app.listen(process.env.API_GATEWAY_PORT || 11000);
}
bootstrap();
