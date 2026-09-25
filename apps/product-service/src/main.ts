import { NestFactory } from '@nestjs/core';
import { ProductModule } from './product-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(ProductModule, {
        transport: Transport.TCP,
        options: {
            host: process.env.PRODUCT_HOST ?? 'localhost',
            port: Number(process.env.PRODUCT_PORT) || 11004,
        }
    });

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            transformOptions: {
                enableImplicitConversion: true
            }
        }),
    )
    await app.listen();
    console.log('Product service is listening on port', process.env.PRODUCT_PORT);
}
bootstrap();
