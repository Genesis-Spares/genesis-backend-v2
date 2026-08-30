// apps/product-service/src/cache.module.ts
import { Module, Global } from '@nestjs/common';
import { CacheModule as NestCacheModule } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { CacheService } from '../services/cache.service';

@Global()
@Module({
    imports: [
        NestCacheModule.registerAsync({
            imports: [],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                store: redisStore,
                host: configService.get('REDIS_HOST', 'localhost'),
                port: configService.get('REDIS_PORT', 6379),
                ttl: 300, // 5 minutes default
            }),
        }),
    ],
    providers: [
        CacheService
    ],
    exports: [
        NestCacheModule,
        CacheService
    ],
})
export class CacheModule { }