import { Injectable, Logger } from '@nestjs/common';
import { CreateProductDto, ProductQueryDto, ProductVariantDto, UpdateProductDto } from '../dto/product.dto';
import { PrismaService } from '../../libs/prisma/prisma.service';
import { RpcException } from '@nestjs/microservices';
import { CacheService } from './cache.service';
import { Prisma } from '../generated/prisma';

@Injectable()
export class ProductService {
    private readonly logger = new Logger(ProductService.name);

    constructor(
        private readonly prisma: PrismaService,
        private readonly cacheService: CacheService,
    ) { }

    // ============================================
    // CREATE PRODUCT
    // ============================================
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
                    compatibility: dto.compatibility,
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

            if (search) {
                where.OR = [
                    { name: { contains: search, mode: 'insensitive' } },
                    { description: { contains: search, mode: 'insensitive' } },
                    { sku: { contains: search, mode: 'insensitive' } },
                    { brand: { contains: search, mode: 'insensitive' } }
                ];
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
            } else if (sortBy === 'popularity') {
                orderBy.createdAt = sortOrder;
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
                        _count: {
                            select: { reviews: true },
                        },
                    },
                }),
                this.prisma.product.count({ where }),
            ]);

            // Calculate average rating for each product
            const productsWithRating = await Promise.all(
                products.map(async (product) => {
                    const avgRating = await this.prisma.productReview.aggregate({
                        where: { productId: product.id },
                        _avg: { rating: true },
                    });

                    return {
                        ...product,
                        averageRating: avgRating._avg.rating || 0,
                    };
                }),
            );

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
                        orderBy: { createdAt: 'desc' },
                        take: 5,
                    },
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

            // Calculate average rating
            const avgRating = await this.prisma.productReview.aggregate({
                where: { productId: id },
                _avg: { rating: true },
                _count: true,
            });

            const result = {
                ...product,
                averageRating: avgRating._avg.rating || 0,
                reviewCount: avgRating._count,
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
                        orderBy: { createdAt: 'desc' },
                        take: 10,
                    },
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

            // Calculate average rating
            const avgRating = await this.prisma.productReview.aggregate({
                where: { productId: product.id },
                _avg: { rating: true },
            });

            const result = {
                ...product,
                averageRating: avgRating._avg.rating || 0,
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
    async updateProduct(id: string, dto: UpdateProductDto) {
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
                    compatibility: dto.compatibility,
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
            const product = await this.prisma.product.update({
                where: { id: productId },
                data: {
                    stockQty,
                    isInStock: stockQty > 0,
                },
            });

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

    private normalizeMetaKeywords(value: string | string[] | undefined): string[] {
        if (!value) return [];
        if (Array.isArray(value)) return value;
        // If it's a comma-separated string, split it
        return value.split(',').map(k => k.trim()).filter(Boolean);
    }

}
