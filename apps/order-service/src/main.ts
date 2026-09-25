// apps/order-service/src/main.ts
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { OrderModule } from './order.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    OrderModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.ORDER_SERVICE_HOST ?? '0.0.0.0',
        port: Number(process.env.ORDER_SERVICE_PORT) || 11006,
      },
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen();
  console.log('✅ Order service is running on port', process.env.ORDER_SERVICE_PORT || 11006);
}
bootstrap();
