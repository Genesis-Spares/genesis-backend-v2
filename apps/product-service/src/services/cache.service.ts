// apps/product-service/src/cache.service.ts
import { Injectable, Logger, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { type Cache } from 'cache-manager';

@Injectable()
export class CacheService {
    private readonly logger = new Logger(CacheService.name);

    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) { }

    async get(key: string): Promise<any> {
        try {
            return await this.cacheManager.get(key);
        } catch (error) {
            this.logger.error(`Error getting cache key ${key}:`, error);
            return null;
        }
    }

    async set(key: string, value: any, ttl = 300): Promise<void> {
        try {
            await this.cacheManager.set(key, value, ttl);
        } catch (error) {
            this.logger.error(`Error setting cache key ${key}:`, error);
        }
    }

    async delete(key: string): Promise<void> {
        try {
            await this.cacheManager.del(key);
        } catch (error) {
            this.logger.error(`Error deleting cache key ${key}:`, error);
        }
    }

    async invalidateProductCache(productId: string): Promise<void> {
        await this.delete(`product:${productId}`);
        // Also invalidate list caches
        await this.delete('products:page:*');
    }

    async invalidateCategoryCache(): Promise<void> {
        await this.delete('categories:all');
    }

    async invalidateWishlistCache(userId: string): Promise<void> {
        await this.delete(`wishlist:user:${userId}`);
    }
}