import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from './modules/cache.module';
import { PrismaService } from '../libs/prisma/prisma.service';
import { CategoryModule } from './modules/category.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        CacheModule,
        CategoryModule
    ],
    controllers: [
        ProductsController
    ],
    providers: [
        ProductService,
        PrismaService
    ],
})
export class ProductModule { }
