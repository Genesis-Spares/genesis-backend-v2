import { Injectable, Logger } from '@nestjs/common';
import { CreateProductDto, ProductFitmentDto, ProductPartNumberDto, ProductQueryDto, ProductVariantDto, UpdateProductDto } from '../dto/product.dto';
import { PrismaService } from '../../libs/prisma/prisma.service';
import { RpcException } from '@nestjs/microservices';
import { CacheService } from './cache.service';
import { LowStockHit, LowStockNotifier } from './low-stock.notifier';
import { Prisma } from '../generated/prisma';

@Injectable()
export class ProductService {
    private readonly logger = new Logger(ProductService.name);

    constructor(
        private readonly prisma: PrismaService,
        private readonly cacheService: CacheService,
        private readonly lowStock: LowStockNotifier,
    ) { }

    // ============================================
    // CREATE PRODUCT
    // ============================================
    // ── vehicle fitment helpers ─────────────────────────────

    /** Title-case makes, trim, order year ranges, drop duplicates. */
    private normalizeFitments(list: ProductFitmentDto[] = []) {
        const seen = new Set<string>();
        const titled = (v: string) => v.trim().replace(/\s+/g, ' ').replace(/\b([a-z])/g, (c) => c.toUpperCase());
        return list
            .map((f) => {
                let [from, to] = [f.yearFrom ?? null, f.yearTo ?? null];
                if (from && to && from > to) [from, to] = [to, from];
                return {
                    make: titled(f.make),
                    model: f.model.trim().replace(/\s+/g, ' '),
                    yearFrom: from,
                    yearTo: to,
                    engine: f.engine?.trim() || null,
                    notes: f.notes?.trim() || null,
                };
            })
            .filter((f) => f.make && f.model)
            .filter((f) => {
                const k = [f.make, f.model, f.yearFrom, f.yearTo, f.engine].join('|').toLowerCase();
                return seen.has(k) ? false : (seen.add(k), true);
            });
    }

    /** "04465-12592" → "0446512592": what part-number searches compare against. */
    static normalizePartNumber(v: string) {
        return v.toUpperCase().replace(/[^A-Z0-9]/g, '');
    }

    private normalizePartNumbers(list: ProductPartNumberDto[] = []) {
        const seen = new Set<string>();
        return list
            .map((n) => ({
                number: n.number.trim().replace(/\s+/g, ' '),
                normalized: ProductService.normalizePartNumber(n.number),
                type: n.type ?? 'OE',
                brand: n.brand?.trim() || null,
            }))
            .filter((n) => n.normalized.length >= 2 && !seen.has(n.normalized) && (seen.add(n.normalized), true));
    }

    /** Readable summary kept in `compatibility` so text search still finds parts by vehicle. */
    private fitmentSummary(list: { make: string; model: string; yearFrom: number | null; yearTo: number | null }[]) {
        return list.map((f) => {
            const years = f.yearFrom && f.yearTo ? (f.yearFrom === f.yearTo ? `${f.yearFrom}` : `${f.yearFrom}-${f.yearTo}`)
                : f.yearFrom ? `${f.yearFrom}+` : f.yearTo ? `up to ${f.yearTo}` : '';
            return `${f.make} ${f.model}${years ? ` ${years}` : ''}`;
        }).join(', ');
    }

    async createProduct(dto: CreateProductDto) {
        try {
            const existingSku = await this.prisma.product.findUnique({
                where: { sku: dto.sku }
            })

            if (existingSku) {
                throw new RpcException({
                    statusCode: 400,
                    message: `Product with SKU ${dto.sku} already exists`,
                    error: 'Bad Request',
                });
            }

            // Check if slug exists
            const existingSlug = await this.prisma.product.findUnique({
                where: { slug: dto.slug }
            });

            if (existingSlug) {
                throw new RpcException({
                    statusCode: 400,
                    message: `Product with slug ${dto.slug} already exists`,
                    error: 'Bad Request',
                });
            }

            // Check category exists if provided
            if (dto.categoryId) {
                const category = await this.prisma.category.findUnique({
                    where: { id: dto.categoryId }
                });

                if (!category) {
                    throw new RpcException({
                        statusCode: 404,
                        message: 'Category not found',
                        error: 'Not Found',
                    });
                }
            }

            // create product with all relations
            const fitments = this.normalizeFitments(dto.fitments);
            const partNumbers = this.normalizePartNumbers(dto.partNumbers);
            const product = await this.prisma.product.create({
                data: {
                    sku: dto.sku,
                    name: dto.name,
                    slug: dto.slug,
                    description: dto.description,
                    brand: dto.brand,
                    price: dto.price,
                    comparePrice: dto.comparePrice,
                    costPrice: dto.costPrice,
                    stockQty: dto.stockQty || 0,
                    minStockQty: dto.minStockQty,
                    isInStock: (dto.stockQty || 0) > 0,
                    isActive: dto.isActive ?? true,
                    categoryId: dto.categoryId,
                    weight: dto.weight,
                    dimensions: dto.dimensions,
                    compatibility: dto.compatibility ?? (fitments.length ? this.fitmentSummary(fitments) : undefined),
                    isUniversal: dto.isUniversal ?? false,
                    fitments: fitments.length ? { create: fitments } : undefined,
                    partNumbers: partNumbers.length ? { create: partNumbers } : undefined,
                    tags: dto.tags || [],
                    metaTitle: dto.metaTitle,
                    metaDescription: dto.metaDescription,
                    metaKeywords: this.normalizeMetaKeywords(dto.metaKeywords),
                    images: {
                        create: dto.images?.map((img, index) => ({
                            url: img.url,
                            alt: img.alt,
                            isPrimary: img.isPrimary || index === 0,
                            order: img.order || index,
                        })) || [],
                    },
                    variants: {
                        create: dto.variants?.map((variant) => ({
                            sku: variant.sku,
                            name: variant.name,
                            price: variant.price,
                            comparePrice: variant.comparePrice,
                            stockQty: variant.stockQty || 0,
                            attributes: variant.attributes,
                            weight: variant.weight,
                            images: variant.images || [],
                        })) || [],
                    },
                    attributes: {
                        create: dto.attributes?.map((attr) => ({
                            name: attr.name,
                            value: attr.value,
                            displayOrder: attr.displayOrder || 0,
                        })) || [],
                    },
                },
                include: {
                    images: {
                        orderBy: { order: 'asc' },
                    },
                    variants: true,
                    attributes: {
                        orderBy: { displayOrder: 'asc' },
                    },
                    category: true,
                },
            });

            // Clear cache
            await this.cacheService.invalidateProductCache(product.id);

            this.logger.log(`Product created: ${product.id} - ${product.name}`);
            return product;
        } catch (error) {
            this.logger.error('Error creating product:', error);
            if (error instanceof RpcException) throw error;
            throw new RpcException({
                statusCode: 500,
                message: 'Failed to create product',
                error: 'Internal Server Error',
            });
        }
    }

    // ============================================
    // FIND ALL PRODUCTS (with pagination & filtering)
    // ============================================
    async findAllProducts(query: ProductQueryDto) {
        try {
            const {
                search,
                categoryId,
                brand,
                minPrice,
                maxPrice,
                inStock,
                sortBy = 'createdAt',
                sortOrder = 'desc',
                page = 1,
                limit = 20
            } = query;

            const where: Prisma.ProductWhereInput = {};

            if (search?.trim()) {
                // Every word must match somewhere ("toyota brake pads" finds
                // "Brake Pads – Front" whose fitment lists Toyota). Capped at 6 words.
                const words = search.trim().split(/\s+/).filter(Boolean).slice(0, 6);
                where.AND = words.map((w) => ({
                    OR: [
                        { name: { contains: w, mode: 'insensitive' } },
                        { sku: { contains: w, mode: 'insensitive' } },
                        { brand: { contains: w, mode: 'insensitive' } },
                        { compatibility: { contains: w, mode: 'insensitive' } },
                        { description: { contains: w, mode: 'insensitive' } },
                        { tags: { has: w.toLowerCase() } },
                        { partNumbers: { some: { brand: { contains: w, mode: 'insensitive' } } } },
                        ...(ProductService.normalizePartNumber(w).length >= 3
                            ? [{ partNumbers: { some: { normalized: { contains: ProductService.normalizePartNumber(w) } } } }]
                            : []),
                    ],
                }));
            }

            // vehicle finder: universal parts + parts with a matching fitment row
            if (query.make) {
                const y = query.model && query.year ? Number(query.year) : undefined;
                const fit: Prisma.ProductFitmentWhereInput = {
                    make: { equals: query.make.trim(), mode: 'insensitive' },
                    ...(query.model ? { model: { equals: query.model.trim(), mode: 'insensitive' } } : {}),
                    ...(y ? {
                        AND: [
                            { OR: [{ yearFrom: null }, { yearFrom: { lte: y } }] },
                            { OR: [{ yearTo: null }, { yearTo: { gte: y } }] },
                        ],
                    } : {}),
                };
                where.AND = [...((where.AND as Prisma.ProductWhereInput[]) ?? []), { OR: [{ isUniversal: true }, { fitments: { some: fit } }] }];
            }

            if (categoryId) {
                where.categoryId = categoryId;
            }

            if (brand) {
                where.brand = { contains: brand, mode: 'insensitive' };
            }

            if (minPrice != undefined || maxPrice != undefined) {
                where.price = {};
                if (minPrice !== undefined) where.price.gte = minPrice;
                if (maxPrice != undefined) where.price.lte = maxPrice;
            }

            if (inStock !== undefined) {
                where.isInStock = inStock;
            }


            where.isActive = true;

            const orderBy: Prisma.ProductOrderByWithRelationInput = {};
            if (sortBy === 'price') {
                orderBy.price = sortOrder;
            } else if (sortBy === 'name') {
                orderBy.name = sortOrder;
            } else if (sortBy === 'rating') {
                orderBy.ratingAvg = sortOrder;
            } else if (sortBy === 'popularity') {
                orderBy.createdAt = sortOrder;
            } else if (sortBy === 'stock') {
                // admin dashboard "low stock" list: stockQty asc
                orderBy.stockQty = sortOrder;
            } else {
                orderBy.createdAt = sortOrder;
            }

            // Calculate pagination
            const skip = (page - 1) * limit;

            // Execute query
            const [products, total] = await Promise.all([
                this.prisma.product.findMany({
                    where,
                    orderBy,
                    skip,
                    take: limit,
                    include: {
                        images: {
                            orderBy: { order: 'asc' },
                            take: 1, // Only get primary image
                        },
                        variants: {
                            where: { stockQty: { gt: 0 } },
                            take: 3,
                        },
                        category: true,
                        partNumbers: { select: { number: true, normalized: true, type: true, brand: true }, take: 20 },
                        _count: {
                            select: { reviews: true },
                        },
                    },
                }),
                this.prisma.product.count({ where }),
            ]);

            // rating is stored on the product (kept in sync by ReviewService)
            const productsWithRating = products.map((product) => ({
                ...product,
                averageRating: product.ratingAvg,
                reviewCount: product.ratingCount,
            }));

            return {
                data: productsWithRating,
                meta: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit),
                },
            };
        } catch (error) {
            this.logger.error('Error finding products:', error);
            throw new RpcException({
                statusCode: 500,
                message: 'Failed to fetch products',
                error: 'Internal Server Error',
            });
        }
    }

    // ============================================
    // FIND PRODUCT BY ID
    // ============================================
    async findProductById(id: string) {
        try {
            // Check cache first
            const cached = await this.cacheService.get(`product:${id}`);
            if (cached) {
                this.logger.debug(`Cache hit for product ${id}`);
                return cached;
            }

            const product = await this.prisma.product.findUnique({
                where: { id },
                include: {
                    images: {
                        orderBy: { order: 'asc' },
                    },
                    variants: true,
                    attributes: {
                        orderBy: { displayOrder: 'asc' },
                    },
                    category: true,
                    reviews: {
                        where: { status: 'PUBLISHED' },
                        orderBy: { createdAt: 'desc' },
                        take: 5,
                    },
                    fitments: { orderBy: [{ make: 'asc' }, { model: 'asc' }, { yearFrom: 'asc' }] },
                    partNumbers: { orderBy: [{ type: 'asc' }, { brand: 'asc' }, { number: 'asc' }] },
                    _count: {
                        select: {
                            reviews: true,
                        },
                    },
                },
            });

            if (!product) {
                throw new RpcException({
                    statusCode: 404,
                    message: 'Product not found',
                    error: 'Not Found',
                });
            }

            const result = {
                ...product,
                averageRating: product.ratingAvg,
                reviewCount: product.ratingCount,
            };

            // Cache the result
            await this.cacheService.set(`product:${id}`, result, 300); // 5 minutes

            return result;
        } catch (error) {
            this.logger.error(`Error finding product ${id}:`, error);
            if (error instanceof RpcException) throw error;
            throw new RpcException({
                statusCode: 500,
                message: 'Failed to fetch product',
                error: 'Internal Server Error',
            });
        }
    }

    // ============================================
    // FIND PRODUCT BY SLUG
    // ============================================
    async findProductBySlug(slug: string) {
        try {
            // Check cache first
            const cached = await this.cacheService.get(`product:slug:${slug}`);
            if (cached) {
                this.logger.debug(`Cache hit for product slug ${slug}`);
                return cached;
            }

            const product = await this.prisma.product.findUnique({
                where: { slug },
                include: {
                    images: {
                        orderBy: { order: 'asc' },
                    },
                    variants: {
                        where: { stockQty: { gt: 0 } },
                    },
                    attributes: {
                        orderBy: { displayOrder: 'asc' },
                    },
                    category: {
                        include: {
                            parent: true,
                        },
                    },
                    reviews: {
                        where: { status: 'PUBLISHED' },
                        orderBy: { createdAt: 'desc' },
                        take: 10,
                    },
                    fitments: { orderBy: [{ make: 'asc' }, { model: 'asc' }, { yearFrom: 'asc' }] },
                    partNumbers: { orderBy: [{ type: 'asc' }, { brand: 'asc' }, { number: 'asc' }] },
                    _count: {
                        select: {
                            reviews: true,
                        },
                    },
                },
            });

            if (!product) {
                throw new RpcException({
                    statusCode: 404,
                    message: 'Product not found',
                    error: 'Not Found',
                });
            }

            const result = {
                ...product,
                averageRating: product.ratingAvg,
                reviewCount: product.ratingCount,
                relatedProducts: await this.findRelatedProducts(product.id, product.categoryId as string),
            };

            await this.cacheService.set(`product:slug:${slug}`, result, 300);

            return result;
        } catch (error) {
            this.logger.error(`Error finding product by slug ${slug}:`, error);
            if (error instanceof RpcException) throw error;
            throw new RpcException({
                statusCode: 500,
                message: 'Failed to fetch product',
                error: 'Internal Server Error',
            });
        }
    }

    // ============================================
    // FIND RELATED PRODUCTS
    // ============================================
    async findRelatedProducts(productId: string, categoryId?: string) {
        if (!categoryId) return [];

        const products = await this.prisma.product.findMany({
            where: {
                id: { not: productId },
                categoryId,
                isActive: true,
                isInStock: true,
            },
            take: 6,
            include: {
                images: {
                    orderBy: { order: 'asc' },
                    take: 1,
                },
            },
        });

        return products;
    }

    // ============================================
    // UPDATE PRODUCT
    // ============================================
    async updateProduct(id: string, dto: UpdateProductDto, actor?: string) {
        try {
            // Check if product exists
            const existing = await this.prisma.product.findUnique({
                where: { id },
            });

            if (!existing) {
                throw new RpcException({
                    statusCode: 404,
                    message: 'Product not found',
                    error: 'Not Found',
                });
            }

            // Check SKU uniqueness if updating
            if (dto.sku && dto.sku !== existing.sku) {
                const skuExists = await this.prisma.product.findUnique({
                    where: { sku: dto.sku },
                });

                if (skuExists) {
                    throw new RpcException({
                        statusCode: 400,
                        message: `Product with SKU ${dto.sku} already exists`,
                        error: 'Bad Request',
                    });
                }
            }

            // Check slug uniqueness if updating
            if (dto.slug && dto.slug !== existing.slug) {
                const slugExists = await this.prisma.product.findUnique({
                    where: { slug: dto.slug },
                });

                if (slugExists) {
                    throw new RpcException({
                        statusCode: 400,
                        message: `Product with slug ${dto.slug} already exists`,
                        error: 'Bad Request',
                    });
                }
            }

            // Update product
            const fitments = dto.fitments ? this.normalizeFitments(dto.fitments) : undefined;
            const stockBefore = dto.stockQty !== undefined
                ? (await this.prisma.product.findUnique({ where: { id }, select: { stockQty: true } }))?.stockQty
                : undefined;
            const partNumbers = dto.partNumbers ? this.normalizePartNumbers(dto.partNumbers) : undefined;
            const product = await this.prisma.product.update({
                where: { id },
                data: {
                    sku: dto.sku,
                    name: dto.name,
                    slug: dto.slug,
                    description: dto.description,
                    brand: dto.brand,
                    price: dto.price,
                    comparePrice: dto.comparePrice,
                    costPrice: dto.costPrice,
                    stockQty: dto.stockQty,
                    minStockQty: dto.minStockQty,
                    isInStock: dto.stockQty !== undefined ? dto.stockQty > 0 : existing.isInStock,
                    isActive: dto.isActive,
                    categoryId: dto.categoryId,
                    weight: dto.weight,
                    dimensions: dto.dimensions,
                    compatibility: dto.compatibility !== undefined
                        ? dto.compatibility
                        : fitments ? (fitments.length ? this.fitmentSummary(fitments) : null) : undefined,
                    isUniversal: dto.isUniversal,
                    fitments: fitments ? { deleteMany: {}, create: fitments } : undefined,
                    partNumbers: partNumbers ? { deleteMany: {}, create: partNumbers } : undefined,
                    tags: dto.tags,
                    metaTitle: dto.metaTitle,
                    metaDescription: dto.metaDescription,
                    metaKeywords: dto.metaKeywords !== undefined
                        ? this.normalizeMetaKeywords(dto.metaKeywords)
                        : existing.metaKeywords,
                    images: dto.images ? {
                        deleteMany: {},
                        create: dto.images.map((img, index) => ({
                            url: img.url,
                            alt: img.alt,
                            isPrimary: img.isPrimary ?? (index === 0),
                            order: img.order ?? index,
                        })),
                    } : undefined,
                    variants: dto.variants ? {
                        deleteMany: {},
                        create: dto.variants.map((variant) => ({
                            sku: variant.sku,
                            name: variant.name,
                            price: variant.price,
                            comparePrice: variant.comparePrice,
                            stockQty: variant.stockQty || 0,
                            attributes: variant.attributes,
                            weight: variant.weight,
                            images: variant.images || [],
                        })),
                    } : undefined,
                    attributes: dto.attributes ? {
                        deleteMany: {},
                        create: dto.attributes.map((attr) => ({
                            name: attr.name,
                            value: attr.value,
                            displayOrder: attr.displayOrder || 0,
                        })),
                    } : undefined,
                },
                include: {
                    images: {
                        orderBy: { order: 'asc' },
                    },
                    variants: true,
                    attributes: {
                        orderBy: { displayOrder: 'asc' },
                    },
                    category: true,
                },
            });

            // stock typed into the product form is logged like any other change
            if (stockBefore !== undefined && stockBefore !== product.stockQty) {
                await this.prisma.stockMovement.create({
                    data: { productId: id, change: product.stockQty - stockBefore, stockAfter: product.stockQty, reason: 'ADJUSTMENT', note: 'Edited in product form', actor: actor ?? null },
                });
            }

            // Clear cache
            await this.cacheService.invalidateProductCache(id);
            await this.cacheService.invalidateProductCache(existing.slug);

            this.logger.log(`Product updated: ${product.id} - ${product.name}`);
            return product;
        } catch (error) {
            this.logger.error(`Error updating product ${id}:`, error);
            if (error instanceof RpcException) throw error;
            throw new RpcException({
                statusCode: 500,
                message: 'Failed to update product',
                error: 'Internal Server Error',
            });
        }
    }

    // ============================================
    // DELETE PRODUCT (Soft delete or hard delete)
    // ============================================
    async deleteProduct(id: string) {
        try {
            const product = await this.prisma.product.findUnique({
                where: { id },
            });

            if (!product) {
                throw new RpcException({
                    statusCode: 404,
                    message: 'Product not found',
                    error: 'Not Found',
                });
            }

            // Soft delete (set isActive to false)
            const deleted = await this.prisma.product.update({
                where: { id },
                data: { isActive: false },
            });

            // Clear cache
            await this.cacheService.invalidateProductCache(id);
            await this.cacheService.invalidateProductCache(product.slug);

            this.logger.log(`Product deleted (soft): ${deleted.id} - ${deleted.name}`);
            return {
                success: true,
                message: 'Product deleted successfully',
                product: deleted,
            };
        } catch (error) {
            this.logger.error(`Error deleting product ${id}:`, error);
            if (error instanceof RpcException) throw error;
            throw new RpcException({
                statusCode: 500,
                message: 'Failed to delete product',
                error: 'Internal Server Error',
            });
        }
    }

    // ============================================
    // INVENTORY MANAGEMENT
    // ============================================

    async updateInventory(productId: string, stockQty: number) {
        try {
            const before = await this.prisma.product.findUnique({ where: { id: productId }, select: { stockQty: true } });
            const product = await this.prisma.product.update({
                where: { id: productId },
                data: {
                    stockQty,
                    isInStock: stockQty > 0,
                },
            });
            if (before && before.stockQty !== stockQty) {
                await this.prisma.stockMovement.create({
                    data: { productId, change: stockQty - before.stockQty, stockAfter: stockQty, reason: 'ADJUSTMENT', note: 'Set by admin' },
                });
            }

            await this.cacheService.invalidateProductCache(productId);

            // Trigger low stock notification
            if (product.minStockQty && stockQty <= product.minStockQty) {
                // Emit low stock event
                this.logger.warn(`Low stock alert: ${product.name} (${product.sku}) - ${stockQty} remaining`);
            }

            return product;
        } catch (error) {
            this.logger.error(`Error updating inventory for ${productId}:`, error);
            throw new RpcException({
                statusCode: 500,
                message: 'Failed to update inventory',
                error: 'Internal Server Error',
            });
        }
    }

    async checkInventory(productId: string, quantity: number) {
        try {
            const product = await this.prisma.product.findUnique({
                where: { id: productId },
                select: { stockQty: true, isInStock: true },
            });

            if (!product) {
                throw new RpcException({
                    statusCode: 404,
                    message: 'Product not found',
                    error: 'Not Found',
                });
            }

            return {
                available: product.isInStock && product.stockQty >= quantity,
                stockQty: product.stockQty,
            };
        } catch (error) {
            this.logger.error(`Error checking inventory for ${productId}:`, error);
            throw error;
        }
    }

    async reserveStock(productId: string, quantity: number) {
        // For order processing - reserve stock temporarily
        // This would be implemented with a separate reservation table
        // For now, we just check availability
        return this.checkInventory(productId, quantity);
    }

    async releaseStock(productId: string, quantity: number) {
        // Release reserved stock
        // Implementation depends on reservation system
        return { success: true };
    }

    // ============================================
    // BULK OPERATIONS
    // ============================================

    async bulkCreateProducts(products: CreateProductDto[]) {
        try {
            const results: any[] = [];
            for (const product of products) {
                try {
                    const result = await this.createProduct(product);
                    results.push(result);
                } catch (error) {
                    this.logger.error(`Failed to create product ${product.name}:`, error);
                    // Continue with next product
                    results.push({ error: error.message, product: product.name });
                }
            }
            return {
                success: true,
                count: results.length,
                products: results,
            };
        } catch (error) {
            this.logger.error('Error bulk creating products:', error);
            throw new RpcException({
                statusCode: 500,
                message: 'Failed to bulk create products',
                error: 'Internal Server Error',
            });
        }
    }

    async bulkUpdateProducts(updates: { id: string; dto: UpdateProductDto }[]) {
        try {
            const results: any[] = [];
            for (const update of updates) {
                try {
                    const result = await this.updateProduct(update.id, update.dto);
                    results.push(result);
                } catch (error) {
                    this.logger.error(`Failed to update product ${update.id}:`, error);
                    results.push({ error: error.message, productId: update.id });
                }
            }
            return {
                success: true,
                count: results.length,
                products: results,
            };
        } catch (error) {
            this.logger.error('Error bulk updating products:', error);
            throw new RpcException({
                statusCode: 500,
                message: 'Failed to bulk update products',
                error: 'Internal Server Error',
            });
        }
    }

    // ============================================
    // SEARCH & FILTER
    // ============================================
    async searchProducts(
        query?: string | null,
        limit: number = 20,
        page: number = 1,
    ): Promise<{
        query: string;
        count: number;
        products: any[];
        meta: { page: number; limit: number; totalPages: number };
    }> {
        try {
            // 1. Sanitize input
            const searchTerm = (query?.trim() ?? '').toLowerCase();
            const safeLimit = Math.min(Math.max(1, limit), 100);
            const safePage = Math.max(1, page);
            const skip = (safePage - 1) * safeLimit;

            // 2. If search term is empty, return empty result (or return all products if you prefer)
            if (!searchTerm) {
                return {
                    query: '',
                    count: 0,
                    products: [],
                    meta: { page: safePage, limit: safeLimit, totalPages: 0 },
                };
            }

            const pattern = `%${searchTerm}%`;

            // 3. Raw SQL query (PostgreSQL specific) – using correct table name "products"
            //    and parameterised placeholders ($1, $2, $3) for security.
            const sql = Prisma.sql`
            SELECT id FROM "products"
            WHERE "is_active" = true
            AND (
                LOWER("name") LIKE ${pattern} OR
                LOWER("description") LIKE ${pattern} OR
                LOWER("sku") LIKE ${pattern} OR
                LOWER("brand") LIKE ${pattern} OR
                LOWER("compatibility") LIKE ${pattern} OR
                EXISTS (
                    SELECT 1 FROM unnest("tags") AS tag
                    WHERE LOWER(tag) LIKE ${pattern}
                )
            )
            ORDER BY "name" ASC, "created_at" DESC
            LIMIT ${safeLimit} OFFSET ${skip}
        `;

            // Count query (same conditions)
            const countSql = Prisma.sql`
            SELECT COUNT(*) FROM "products"
            WHERE "is_active" = true
            AND (
                LOWER("name") LIKE ${pattern} OR
                LOWER("description") LIKE ${pattern} OR
                LOWER("sku") LIKE ${pattern} OR
                LOWER("brand") LIKE ${pattern} OR
                LOWER("compatibility") LIKE ${pattern} OR
                EXISTS (
                    SELECT 1 FROM unnest("tags") AS tag
                    WHERE LOWER(tag) LIKE ${pattern}
                )
            )
        `;

            // Execute both queries in parallel
            const [productIdsRaw, countResult] = await Promise.all([
                this.prisma.$queryRaw<{ id: string }[]>(sql),
                this.prisma.$queryRaw<{ count: bigint }[]>(countSql),
            ]);

            const total = Number(countResult[0]?.count ?? 0);
            const ids = productIdsRaw.map(row => row.id);

            let products: any[] = [];
            if (ids.length > 0) {
                // 4. Fetch full product data with all relations, preserving order
                const productsWithRelations = await this.prisma.product.findMany({
                    where: { id: { in: ids } },
                    include: {
                        images: { orderBy: { order: 'asc' }, take: 1 },
                        variants: { where: { stockQty: { gt: 0 } }, take: 3 },
                        category: true,
                    },
                });
                // Re‑order to match the raw query order
                const idMap = Object.fromEntries(
                    productsWithRelations.map(p => [p.id, p])
                );
                products = ids.map(id => idMap[id]).filter(Boolean);
            }

            return {
                query: searchTerm,
                count: total,
                products,
                meta: {
                    page: safePage,
                    limit: safeLimit,
                    totalPages: Math.ceil(total / safeLimit),
                },
            };
        } catch (error) {
            this.logger.error(`Error searching products with query "${query}":`, error);
            // Fallback: if raw SQL fails (e.g. due to database differences),
            // you can fall back to a simpler Prisma findMany.
            // For now, we re‑throw a clean RPC exception.
            throw new RpcException({
                statusCode: 500,
                message: 'Failed to search products',
                error: 'Internal Server Error',
            });
        }
    }

    async findProductsByBrand(brand: string, limit: number = 20) {
        try {
            const products = await this.prisma.product.findMany({
                where: {
                    brand: { equals: brand, mode: 'insensitive' },
                    isActive: true,
                },
                include: {
                    images: {
                        orderBy: { order: 'asc' },
                        take: 1,
                    },
                    variants: {
                        where: { stockQty: { gt: 0 } },
                        take: 3,
                    },
                    category: true,
                },
                take: limit,
            });

            return {
                brand,
                count: products.length,
                products,
            };
        } catch (error) {
            this.logger.error(`Error finding products by brand "${brand}":`, error);
            throw new RpcException({
                statusCode: 500,
                message: 'Failed to find products by brand',
                error: 'Internal Server Error',
            });
        }
    }

    async findProductsByCategory(categoryId: string, page: number = 1, limit: number = 20) {
        try {
            const skip = (page - 1) * limit;

            const [products, total] = await Promise.all([
                this.prisma.product.findMany({
                    where: {
                        categoryId,
                        isActive: true,
                    },
                    include: {
                        images: {
                            orderBy: { order: 'asc' },
                            take: 1,
                        },
                        variants: {
                            where: { stockQty: { gt: 0 } },
                            take: 3,
                        },
                        category: true,
                    },
                    skip,
                    take: limit,
                }),
                this.prisma.product.count({
                    where: {
                        categoryId,
                        isActive: true,
                    },
                }),
            ]);

            return {
                data: products,
                meta: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit),
                },
            };
        } catch (error) {
            this.logger.error(`Error finding products by category ${categoryId}:`, error);
            throw new RpcException({
                statusCode: 500,
                message: 'Failed to find products by category',
                error: 'Internal Server Error',
            });
        }
    }

    // ============================================
    // EXACT SEARCH BY UNIQUE IDENTIFIER (ID, SKU, or SLUG)
    // ============================================
    async findProductByUniqueIdentifier(query: string, limit: number = 20) {
        try {
            const products = await this.prisma.product.findMany({
                where: {
                    isActive: true,
                    OR: [
                        { name: { contains: query, mode: 'insensitive' } },
                        { description: { contains: query, mode: 'insensitive' } },
                        { sku: { contains: query, mode: 'insensitive' } },
                        { brand: { contains: query, mode: 'insensitive' } },
                    ],
                },
                include: {
                    images: {
                        orderBy: { order: 'asc' },
                        take: 1,
                    },
                    variants: {
                        where: { stockQty: { gt: 0 } },
                        take: 3,
                    },
                    category: true,
                },
                take: limit,
            });

            return {
                query,
                count: products.length,
                products,
            };
        } catch (error) {
            this.logger.error(`Error searching products with query "${query}":`, error);
            throw new RpcException({
                statusCode: 500,
                message: 'Failed to search products',
                error: 'Internal Server Error',
            });
        }
    }

    // ============================================
    // VARIANTS
    // ============================================
    async addProductVariant(productId: string, variant: ProductVariantDto) {
        try {
            // Check if product exists
            const product = await this.prisma.product.findUnique({
                where: { id: productId },
            });

            if (!product) {
                throw new RpcException({
                    statusCode: 404,
                    message: 'Product not found',
                    error: 'Not Found',
                });
            }

            // Check if variant SKU exists
            const existingSku = await this.prisma.productVariant.findUnique({
                where: { sku: variant.sku },
            });

            if (existingSku) {
                throw new RpcException({
                    statusCode: 400,
                    message: `Variant with SKU ${variant.sku} already exists`,
                    error: 'Bad Request',
                });
            }

            const newVariant = await this.prisma.productVariant.create({
                data: {
                    productId,
                    sku: variant.sku,
                    name: variant.name,
                    price: variant.price,
                    comparePrice: variant.comparePrice,
                    stockQty: variant.stockQty || 0,
                    attributes: variant.attributes,
                    weight: variant.weight,
                    images: variant.images || [],
                },
            });

            await this.cacheService.invalidateProductCache(productId);

            return newVariant;
        } catch (error) {
            this.logger.error(`Error adding variant to product ${productId}:`, error);
            if (error instanceof RpcException) throw error;
            throw new RpcException({
                statusCode: 500,
                message: 'Failed to add product variant',
                error: 'Internal Server Error',
            });
        }
    }

    async updateProductVariant(variantId: string, dto: ProductVariantDto) {
        try {
            const variant = await this.prisma.productVariant.findUnique({
                where: { id: variantId },
            });

            if (!variant) {
                throw new RpcException({
                    statusCode: 404,
                    message: 'Variant not found',
                    error: 'Not Found',
                });
            }

            // Check if SKU is being changed and if it's unique
            if (dto.sku && dto.sku !== variant.sku) {
                const existingSku = await this.prisma.productVariant.findUnique({
                    where: { sku: dto.sku },
                });

                if (existingSku) {
                    throw new RpcException({
                        statusCode: 400,
                        message: `Variant with SKU ${dto.sku} already exists`,
                        error: 'Bad Request',
                    });
                }
            }

            const updatedVariant = await this.prisma.productVariant.update({
                where: { id: variantId },
                data: {
                    sku: dto.sku,
                    name: dto.name,
                    price: dto.price,
                    comparePrice: dto.comparePrice,
                    stockQty: dto.stockQty,
                    attributes: dto.attributes,
                    weight: dto.weight,
                    images: dto.images,
                },
            });

            await this.cacheService.invalidateProductCache(variant.productId);

            return updatedVariant;
        } catch (error) {
            this.logger.error(`Error updating variant ${variantId}:`, error);
            if (error instanceof RpcException) throw error;
            throw new RpcException({
                statusCode: 500,
                message: 'Failed to update product variant',
                error: 'Internal Server Error',
            });
        }
    }

    async deleteProductVariant(variantId: string) {
        try {
            const variant = await this.prisma.productVariant.findUnique({
                where: { id: variantId },
            });

            if (!variant) {
                throw new RpcException({
                    statusCode: 404,
                    message: 'Variant not found',
                    error: 'Not Found',
                });
            }

            await this.prisma.productVariant.delete({
                where: { id: variantId },
            });

            await this.cacheService.invalidateProductCache(variant.productId);

            return { success: true, message: 'Variant deleted successfully' };
        } catch (error) {
            this.logger.error(`Error deleting variant ${variantId}:`, error);
            if (error instanceof RpcException) throw error;
            throw new RpcException({
                statusCode: 500,
                message: 'Failed to delete product variant',
                error: 'Internal Server Error',
            });
        }
    }

    // ============================================
    // WISHLIST (Favourites)
    // ============================================

    async clearWishlist(userId: string) {
        try {
            const wishlist = await this.prisma.wishlist.findFirst({
                where: { userId, isDefault: true },
            });

            if (!wishlist) {
                throw new RpcException({
                    statusCode: 404,
                    message: 'Wishlist not found',
                    error: 'Not Found',
                });
            }

            await this.prisma.wishlistItem.deleteMany({
                where: { wishlistId: wishlist.id },
            });

            await this.cacheService.invalidateWishlistCache(userId);

            return { success: true, message: 'Wishlist cleared successfully' };
        } catch (error) {
            this.logger.error(`Error clearing wishlist for user ${userId}:`, error);
            if (error instanceof RpcException) throw error;
            throw new RpcException({
                statusCode: 500,
                message: 'Failed to clear wishlist',
                error: 'Internal Server Error',
            });
        }
    }

    private async getOrCreateDefaultWishlist(userId: string) {
        let wishlist = await this.prisma.wishlist.findFirst({
            where: { userId, isDefault: true },
        });
        if (!wishlist) {
            wishlist = await this.prisma.wishlist.create({
                data: { userId },
            });
        }
        return wishlist;
    }

    async getWishlist(userId: string) {
        try {
            const wishlist = await this.prisma.wishlist.findFirst({
                where: { userId, isDefault: true },
                include: { items: { orderBy: { createdAt: 'desc' } } },
            });
            if (!wishlist || wishlist.items.length === 0) {
                return { data: [] };
            }
            const productIds = wishlist.items.map((i) => i.productId);
            const products = await this.prisma.product.findMany({
                where: { id: { in: productIds }, isActive: true },
                include: { images: true },
            });
            const byId = new Map(products.map((p) => [p.id, p]));
            const ordered = productIds
                .map((id) => byId.get(id))
                .filter((p): p is (typeof products)[number] => Boolean(p));
            const withRating = ordered.map((product) => ({ ...product, averageRating: product.ratingAvg, reviewCount: product.ratingCount }));
            return { data: withRating };
        } catch (error) {
            this.logger.error(`Error fetching wishlist for user ${userId}:`, error);
            throw new RpcException({ statusCode: 500, message: 'Failed to fetch wishlist', error: 'Internal Server Error' });
        }
    }

    async addToWishlist(userId: string, productId: string) {
        try {
            const product = await this.prisma.product.findUnique({ where: { id: productId } });
            if (!product) {
                throw new RpcException({ statusCode: 404, message: 'Product not found', error: 'Not Found' });
            }
            const wishlist = await this.getOrCreateDefaultWishlist(userId);
            const existing = await this.prisma.wishlistItem.findFirst({
                where: { wishlistId: wishlist.id, productId },
            });
            if (!existing) {
                await this.prisma.wishlistItem.create({
                    data: { wishlistId: wishlist.id, productId },
                });
            }
            await this.cacheService.invalidateWishlistCache(userId);
            return { success: true, message: 'Added to wishlist' };
        } catch (error) {
            this.logger.error(`Error adding to wishlist for user ${userId}:`, error);
            if (error instanceof RpcException) throw error;
            throw new RpcException({ statusCode: 500, message: 'Failed to add to wishlist', error: 'Internal Server Error' });
        }
    }

    async removeFromWishlist(userId: string, productId: string) {
        try {
            const wishlist = await this.prisma.wishlist.findFirst({ where: { userId, isDefault: true } });
            if (wishlist) {
                await this.prisma.wishlistItem.deleteMany({ where: { wishlistId: wishlist.id, productId } });
                await this.cacheService.invalidateWishlistCache(userId);
            }
            return { success: true, message: 'Removed from wishlist' };
        } catch (error) {
            this.logger.error(`Error removing from wishlist for user ${userId}:`, error);
            throw new RpcException({ statusCode: 500, message: 'Failed to remove from wishlist', error: 'Internal Server Error' });
        }
    }

    // ============================================
    // FLASH SALE
    // ============================================

    private async getFlashSaleConfig() {
        let config = await this.prisma.flashSale.findFirst({ orderBy: { createdAt: 'asc' } });
        if (!config) {
            config = await this.prisma.flashSale.create({ data: {} });
        }
        return config;
    }

    async getPublicFlashSale() {
        const config = await this.prisma.flashSale.findFirst({ orderBy: { createdAt: 'asc' } });
        if (!config || !config.isActive) {
            return { active: false, title: config?.title ?? 'Flash Deals', endsAt: config?.endsAt ?? null, products: [] };
        }
        if (config.endsAt && config.endsAt.getTime() < Date.now()) {
            return { active: false, title: config.title, endsAt: config.endsAt, products: [] };
        }
        const items = await this.prisma.flashSaleItem.findMany({
            where: { flashSaleId: config.id },
            orderBy: { order: 'asc' },
        });
        if (items.length === 0) {
            return { active: true, title: config.title, endsAt: config.endsAt, products: [] };
        }
        const productIds = items.map((i) => i.productId);
        const products = await this.prisma.product.findMany({
            where: { id: { in: productIds }, isActive: true },
            include: { images: true },
        });
        const salePriceById = new Map(items.map((i) => [i.productId, i.salePrice]));
        const byId = new Map(products.map((p) => [p.id, p]));
        const ordered = productIds
            .map((id) => byId.get(id))
            .filter((p): p is (typeof products)[number] => Boolean(p));
        const withRating = ordered.map((product) => {
            const rating = { averageRating: product.ratingAvg, reviewCount: product.ratingCount };
            const sale = salePriceById.get(product.id);
            return sale != null ? { ...product, comparePrice: product.price, price: sale, ...rating } : { ...product, ...rating };
        });
        return { active: true, title: config.title, endsAt: config.endsAt, products: withRating };
    }

    async getFlashSaleAdmin() {
        const config = await this.getFlashSaleConfig();
        const items = await this.prisma.flashSaleItem.findMany({
            where: { flashSaleId: config.id },
            orderBy: { order: 'asc' },
        });
        const productIds = items.map((i) => i.productId);
        const products = productIds.length
            ? await this.prisma.product.findMany({ where: { id: { in: productIds } }, include: { images: true } })
            : [];
        const byId = new Map(products.map((p) => [p.id, p]));
        const merged = items.map((i) => ({
            productId: i.productId,
            salePrice: i.salePrice,
            order: i.order,
            product: byId.get(i.productId) ?? null,
        }));
        return { config, items: merged };
    }

    async updateFlashSale(data: { isActive?: boolean; title?: string; endsAt?: string | null }) {
        const config = await this.getFlashSaleConfig();
        return this.prisma.flashSale.update({
            where: { id: config.id },
            data: {
                ...(data.isActive !== undefined ? { isActive: data.isActive } : {}),
                ...(data.title !== undefined ? { title: data.title } : {}),
                ...(data.endsAt !== undefined ? { endsAt: data.endsAt ? new Date(data.endsAt) : null } : {}),
            },
        });
    }

    async setFlashSaleItems(productIds: string[]) {
        const config = await this.getFlashSaleConfig();
        await this.prisma.flashSaleItem.deleteMany({ where: { flashSaleId: config.id } });
        if (productIds.length) {
            await this.prisma.flashSaleItem.createMany({
                data: productIds.map((productId, index) => ({ flashSaleId: config.id, productId, order: index })),
                skipDuplicates: true,
            });
        }
        return { success: true };
    }

    async addFlashSaleItem(productId: string, salePrice?: number) {
        const config = await this.getFlashSaleConfig();
        const count = await this.prisma.flashSaleItem.count({ where: { flashSaleId: config.id } });
        const existing = await this.prisma.flashSaleItem.findFirst({ where: { flashSaleId: config.id, productId } });
        if (existing) {
            if (salePrice !== undefined) {
                await this.prisma.flashSaleItem.update({ where: { id: existing.id }, data: { salePrice } });
            }
            return { success: true };
        }
        await this.prisma.flashSaleItem.create({
            data: { flashSaleId: config.id, productId, order: count, ...(salePrice !== undefined ? { salePrice } : {}) },
        });
        return { success: true };
    }

    async removeFlashSaleItem(productId: string) {
        const config = await this.getFlashSaleConfig();
        await this.prisma.flashSaleItem.deleteMany({ where: { flashSaleId: config.id, productId } });
        return { success: true };
    }

    private normalizeMetaKeywords(value: string | string[] | undefined): string[] {
        if (!value) return [];
        if (Array.isArray(value)) return value;
        // If it's a comma-separated string, split it
        return value.split(',').map(k => k.trim()).filter(Boolean);
    }


    // ============================================
    // CART (signed-in shoppers; synced from the storefront)
    // ============================================

    /** Cart lines joined with live product data, newest first. Products that no longer exist are dropped. */
    async getCart(userId: string) {
        const lines = await this.prisma.cartItem.findMany({
            where: { userId },
            orderBy: { updatedAt: 'desc' },
        });
        if (lines.length === 0) return { items: [], itemCount: 0, subtotal: 0, updatedAt: null };

        const products = await this.prisma.product.findMany({
            where: { id: { in: lines.map((l) => l.productId) } },
            select: {
                id: true, sku: true, name: true, slug: true, brand: true, price: true,
                stockQty: true, isInStock: true, isActive: true,
                images: { orderBy: { order: 'asc' }, take: 1, select: { url: true } },
            },
        });
        const byId = new Map(products.map((p) => [p.id, p]));

        const items = lines
            .filter((l) => byId.has(l.productId))
            .map((l) => {
                const p = byId.get(l.productId)!;
                const unitPrice = Number(p.price);
                return {
                    productId: p.id,
                    quantity: l.quantity,
                    addedAt: l.createdAt,
                    updatedAt: l.updatedAt,
                    unitPrice,
                    lineTotal: unitPrice * l.quantity,
                    product: {
                        id: p.id, sku: p.sku, name: p.name, slug: p.slug, brand: p.brand,
                        image: p.images[0]?.url ?? null,
                        stockQty: p.stockQty, isInStock: p.isInStock, isActive: p.isActive,
                    },
                };
            });

        return {
            items,
            itemCount: items.reduce((n, i) => n + i.quantity, 0),
            subtotal: items.reduce((n, i) => n + i.lineTotal, 0),
            updatedAt: items[0]?.updatedAt ?? null,
        };
    }

    /**
     * Replace the whole cart with `items` — the storefront sends its full cart
     * after every change, which keeps sync idempotent. Unknown products and
     * non-positive quantities are ignored; quantities are capped at 99.
     */
    async replaceCart(userId: string, items: { productId: string; quantity: number }[] = []) {
        const wanted = new Map<string, number>();
        for (const i of items) {
            const q = Math.min(99, Math.floor(Number(i?.quantity)));
            if (typeof i?.productId === 'string' && q > 0) wanted.set(i.productId, q);
        }
        const existing = wanted.size
            ? await this.prisma.product.findMany({ where: { id: { in: [...wanted.keys()] } }, select: { id: true } })
            : [];
        const valid = existing.map((p) => p.id);

        await this.prisma.$transaction([
            this.prisma.cartItem.deleteMany({ where: { userId, productId: { notIn: valid } } }),
            ...valid.map((productId) =>
                this.prisma.cartItem.upsert({
                    where: { userId_productId: { userId, productId } },
                    create: { userId, productId, quantity: wanted.get(productId)! },
                    update: { quantity: wanted.get(productId)! },
                }),
            ),
        ]);
        return this.getCart(userId);
    }

    async clearCart(userId: string) {
        await this.prisma.cartItem.deleteMany({ where: { userId } });
        return { items: [], itemCount: 0, subtotal: 0, updatedAt: null };
    }

    // ============================================
    // ORDER STOCK (called by the order service)
    // ============================================

    /**
     * Take stock for an order — all lines or none. Each decrement is a
     * conditional UPDATE (stock_qty >= qty), so two shoppers can't both buy
     * the last unit. Safe to retry: a second call for the same order is a no-op.
     */
    async commitOrderStock(orderId: string, items: { productId: string; quantity: number }[]) {
        const wanted = new Map<string, number>();
        for (const i of items ?? []) {
            const q = Math.floor(Number(i?.quantity));
            if (i?.productId && q > 0) wanted.set(i.productId, (wanted.get(i.productId) ?? 0) + q);
        }
        if (!orderId || wanted.size === 0) {
            throw new RpcException({ statusCode: 400, message: 'Nothing to reserve', error: 'Bad Request' });
        }

        const already = await this.prisma.stockMovement.count({ where: { reference: orderId, reason: 'ORDER' } });
        if (already > 0) return { success: true, alreadyCommitted: true };

        const lowHits: LowStockHit[] = [];
        await this.prisma.$transaction(async (tx) => {
            for (const [productId, quantity] of wanted) {
                const res = await tx.product.updateMany({
                    where: { id: productId, isActive: true, stockQty: { gte: quantity } },
                    data: { stockQty: { decrement: quantity } },
                });
                if (res.count === 0) {
                    const p = await tx.product.findUnique({ where: { id: productId }, select: { name: true, stockQty: true, isActive: true } });
                    const message = !p || !p.isActive
                        ? 'One of the items in your cart is no longer available'
                        : p.stockQty <= 0
                            ? `${p.name} is out of stock`
                            : `Only ${p.stockQty} × ${p.name} left in stock — please reduce the quantity`;
                    // throwing rolls back every decrement made so far in this transaction
                    throw new RpcException({ statusCode: 409, message, error: 'Conflict' });
                }
                const after = await tx.product.findUnique({ where: { id: productId }, select: { stockQty: true, minStockQty: true, sku: true, name: true } });
                const stockAfter = after?.stockQty ?? 0;
                if (stockAfter <= 0) await tx.product.update({ where: { id: productId }, data: { isInStock: false } });
                await tx.stockMovement.create({
                    data: { productId, change: -quantity, stockAfter, reason: 'ORDER', reference: orderId },
                });
                if (after && LowStockNotifier.crossed(stockAfter + quantity, stockAfter, after.minStockQty)) {
                    lowHits.push({ productId, sku: after.sku, name: after.name, stockAfter, reorderLevel: after.minStockQty ?? 5 });
                }
            }
        });

        await Promise.all([...wanted.keys()].map((id) => this.cacheService.invalidateProductCache(id)));
        this.lowStock.notify(lowHits, `order ${orderId}`);
        return { success: true };
    }

    /**
     * Put an order's stock back (cancellation, or the order failed to save).
     * Idempotent per order + product, so retries never double-restock.
     */
    async releaseOrderStock(orderId: string, reason: 'ORDER_CANCELLED' | 'ORDER_FAILED' = 'ORDER_CANCELLED') {
        const taken = await this.prisma.stockMovement.findMany({ where: { reference: orderId, reason: 'ORDER' } });
        if (taken.length === 0) return { success: true, released: 0 };

        const done = await this.prisma.stockMovement.findMany({
            where: { reference: orderId, reason: { in: ['ORDER_CANCELLED', 'ORDER_FAILED'] } },
            select: { productId: true },
        });
        const skip = new Set(done.map((d) => d.productId));
        const todo = taken.filter((t) => !skip.has(t.productId));

        await this.prisma.$transaction(async (tx) => {
            for (const t of todo) {
                const qty = -t.change;
                const p = await tx.product.update({
                    where: { id: t.productId },
                    data: { stockQty: { increment: qty }, isInStock: true },
                    select: { stockQty: true },
                });
                await tx.stockMovement.create({
                    data: { productId: t.productId, change: qty, stockAfter: p.stockQty, reason, reference: orderId },
                });
            }
        });

        await Promise.all(todo.map((t) => this.cacheService.invalidateProductCache(t.productId)));
        return { success: true, released: todo.length };
    }

    /**
     * Put returned items back into stock. Idempotent per return + product
     * (a RETURN movement with reference = returnId is written once).
     */
    async restockReturn(returnId: string, items: { productId: string; quantity: number }[] = []) {
        const done = new Set(
            (await this.prisma.stockMovement.findMany({ where: { reference: returnId, reason: 'RETURN' }, select: { productId: true } }))
                .map((m) => m.productId),
        );
        const todo = items.filter((i) => i.productId && i.quantity > 0 && !done.has(i.productId));
        await this.prisma.$transaction(async (tx) => {
            for (const i of todo) {
                const p = await tx.product.update({
                    where: { id: i.productId },
                    data: { stockQty: { increment: i.quantity }, isInStock: true },
                    select: { stockQty: true },
                });
                await tx.stockMovement.create({ data: { productId: i.productId, change: i.quantity, stockAfter: p.stockQty, reason: 'RETURN', reference: returnId } });
            }
        });
        await Promise.all(todo.map((i) => this.cacheService.invalidateProductCache(i.productId)));
        return { success: true, restocked: todo.length };
    }

    /** Recent stock changes for one product (admin). */
    async getStockMovements(productId: string, limit = 50) {
        return this.prisma.stockMovement.findMany({
            where: { productId },
            orderBy: { createdAt: 'desc' },
            take: Math.min(200, Number(limit) || 50),
        });
    }
}
