// apps/product-service/src/products.controller.ts
import { Controller } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
    CreateProductDto,
    UpdateProductDto,
    ProductQueryDto,
    ProductVariantDto,
} from '../dto/product.dto';

@Controller()
export class ProductsController {
    constructor(private readonly productService: ProductService) { }

    // ============================================
    // PRODUCT CRUD
    // ============================================

    @MessagePattern('product.create')
    async createProduct(@Payload() dto: CreateProductDto) {
        return this.productService.createProduct(dto);
    }

    @MessagePattern('product.find.all')
    async findAllProducts(@Payload() query: ProductQueryDto) {
        return this.productService.findAllProducts(query);
    }

    @MessagePattern('product.find.one')
    async findProductById(@Payload() data: { id: string }) {
        return this.productService.findProductById(data.id);
    }

    @MessagePattern('product.find.by.slug')
    async findProductBySlug(@Payload() data: { slug: string }) {
        return this.productService.findProductBySlug(data.slug);
    }

    @MessagePattern('product.update')
    async updateProduct(@Payload() data: { id: string; dto: UpdateProductDto; actor?: string }) {
        return this.productService.updateProduct(data.id, data.dto, data.actor);
    }

    @MessagePattern('product.delete')
    async deleteProduct(@Payload() data: { id: string }) {
        return this.productService.deleteProduct(data.id);
    }

    // ============================================
    // INVENTORY MANAGEMENT
    // ============================================

    @MessagePattern('product.inventory.update')
    async updateInventory(@Payload() data: { productId: string; stockQty: number }) {
        return this.productService.updateInventory(data.productId, data.stockQty);
    }

    @MessagePattern('product.inventory.check')
    async checkInventory(@Payload() data: { productId: string; quantity: number }) {
        return this.productService.checkInventory(data.productId, data.quantity);
    }

    @MessagePattern('inventory.order.commit')
    async commitOrderStock(@Payload() data: { orderId: string; items: { productId: string; quantity: number }[] }) {
        return this.productService.commitOrderStock(data.orderId, data.items);
    }

    @MessagePattern('inventory.order.release')
    async releaseOrderStock(@Payload() data: { orderId: string; reason?: 'ORDER_CANCELLED' | 'ORDER_FAILED' }) {
        return this.productService.releaseOrderStock(data.orderId, data.reason);
    }

    @MessagePattern('inventory.return.restock')
    async restockReturn(@Payload() data: { returnId: string; items: { productId: string; quantity: number }[] }) {
        return this.productService.restockReturn(data.returnId, data.items);
    }

    @MessagePattern('inventory.movements')
    async getStockMovements(@Payload() data: { productId: string; limit?: number }) {
        return this.productService.getStockMovements(data.productId, data.limit);
    }

    @MessagePattern('product.inventory.reserve')
    async reserveStock(@Payload() data: { productId: string; quantity: number }) {
        return this.productService.reserveStock(data.productId, data.quantity);
    }

    @MessagePattern('product.inventory.release')
    async releaseStock(@Payload() data: { productId: string; quantity: number }) {
        return this.productService.releaseStock(data.productId, data.quantity);
    }

    // ============================================
    // BULK OPERATIONS
    // ============================================

    @MessagePattern('product.bulk.create')
    async bulkCreateProducts(@Payload() data: { products: CreateProductDto[] }) {
        return this.productService.bulkCreateProducts(data.products);
    }

    @MessagePattern('product.bulk.update')
    async bulkUpdateProducts(@Payload() data: { products: { id: string; dto: UpdateProductDto }[] }) {
        return this.productService.bulkUpdateProducts(data.products);
    }

    // ============================================
    // SEARCH & FILTER
    // ============================================

    @MessagePattern('product.search')
    async searchProducts(@Payload() data: { query: string; limit?: number }) {
        return this.productService.searchProducts(data.query, data.limit);
    }

    @MessagePattern('product.by.brand')
    async findProductsByBrand(@Payload() data: { brand: string; limit?: number }) {
        return this.productService.findProductsByBrand(data.brand, data.limit);
    }

    @MessagePattern('product.by.category')
    async findProductsByCategory(@Payload() data: { categoryId: string; page?: number; limit?: number }) {
        return this.productService.findProductsByCategory(data.categoryId, data.page, data.limit);
    }

    @MessagePattern('product.by.identifier')
    async findProductByUniqueIdentifier(@Payload() data: { query: string; limit?: number }) {
        return this.productService.findProductByUniqueIdentifier(data.query, data.limit);
    }

    // ============================================
    // VARIANTS
    // ============================================

    @MessagePattern('product.variant.create')
    async addProductVariant(@Payload() data: { productId: string; variant: ProductVariantDto }) {
        return this.productService.addProductVariant(data.productId, data.variant);
    }

    @MessagePattern('product.variant.update')
    async updateProductVariant(@Payload() data: { variantId: string; dto: ProductVariantDto }) {
        return this.productService.updateProductVariant(data.variantId, data.dto);
    }

    @MessagePattern('product.variant.delete')
    async deleteProductVariant(@Payload() data: { variantId: string }) {
        return this.productService.deleteProductVariant(data.variantId);
    }

    // ============================================
    // REVIEWS (via Product Service)
    // ============================================

    // @MessagePattern('review.create')
    // async createReview(@Payload() data: {
    //     productId: string;
    //     userId: string;
    //     userName: string;
    //     userAvatar?: string;
    //     rating: number;
    //     title?: string;
    //     content?: string;
    //     images?: string[];
    // }) {
    //     return this.productService.createReview(data);
    // }

    // @MessagePattern('review.find.by.product')
    // async findReviewsByProduct(@Payload() data: { productId: string; page?: number; limit?: number }) {
    //     return this.productService.findReviewsByProduct(data.productId, data.page, data.limit);
    // }

    // @MessagePattern('review.find.by.user')
    // async findReviewsByUser(@Payload() data: { userId: string }) {
    //     return this.productService.findReviewsByUser(data.userId);
    // }

    // ============================================
    // WISHLIST (Favourites)
    // ============================================

    @MessagePattern('wishlist.get')
    async getWishlist(@Payload() data: { userId: string }) {
        return this.productService.getWishlist(data.userId);
    }

    @MessagePattern('wishlist.add')
    async addToWishlist(@Payload() data: { userId: string; productId: string }) {
        return this.productService.addToWishlist(data.userId, data.productId);
    }

    @MessagePattern('wishlist.remove')
    async removeFromWishlist(@Payload() data: { userId: string; productId: string }) {
        return this.productService.removeFromWishlist(data.userId, data.productId);
    }

    @MessagePattern('wishlist.clear')
    async clearWishlist(@Payload() data: { userId: string }) {
        return this.productService.clearWishlist(data.userId);
    }

    // ============================================
    // CART
    // ============================================

    @MessagePattern('cart.get')
    async getCart(@Payload() data: { userId: string }) {
        return this.productService.getCart(data.userId);
    }

    @MessagePattern('cart.replace')
    async replaceCart(@Payload() data: { userId: string; items: { productId: string; quantity: number }[] }) {
        return this.productService.replaceCart(data.userId, data.items);
    }

    @MessagePattern('cart.clear')
    async clearCart(@Payload() data: { userId: string }) {
        return this.productService.clearCart(data.userId);
    }

    // ============================================
    // FLASH SALE
    // ============================================

    @MessagePattern('flashsale.public.get')
    async getPublicFlashSale() {
        return this.productService.getPublicFlashSale();
    }

    @MessagePattern('flashsale.admin.get')
    async getFlashSaleAdmin() {
        return this.productService.getFlashSaleAdmin();
    }

    @MessagePattern('flashsale.config.update')
    async updateFlashSale(@Payload() data: { isActive?: boolean; title?: string; endsAt?: string | null }) {
        return this.productService.updateFlashSale(data);
    }

    @MessagePattern('flashsale.items.set')
    async setFlashSaleItems(@Payload() data: { productIds: string[] }) {
        return this.productService.setFlashSaleItems(data.productIds || []);
    }

    @MessagePattern('flashsale.item.add')
    async addFlashSaleItem(@Payload() data: { productId: string; salePrice?: number }) {
        return this.productService.addFlashSaleItem(data.productId, data.salePrice);
    }

    @MessagePattern('flashsale.item.remove')
    async removeFlashSaleItem(@Payload() data: { productId: string }) {
        return this.productService.removeFlashSaleItem(data.productId);
    }
}
