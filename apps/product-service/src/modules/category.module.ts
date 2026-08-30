import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaService } from '../../libs/prisma/prisma.service';
import { CategoryService } from '../services/category.service';
import { CategoryController } from '../controllers/category.controller';

@Module({
    imports: [
        ConfigModule,
    ],
    controllers: [
        CategoryController,
    ],
    providers: [
        PrismaService,
        CategoryService,
    ],
    exports: [
        CategoryService,
    ],
})
export class CategoryModule { }