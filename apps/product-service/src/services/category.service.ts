// apps/product-service/src/services/category.service.ts
import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../../libs/prisma/prisma.service";
import { CacheService } from "./cache.service";
import { RpcException } from "@nestjs/microservices";
import {
    CategoryQueryDto,
    CategoryResponseDto,
    CategoryTreeDto,
    CreateCategoryDto,
    ReorderCategoryDto,
    UpdateCategoryDto,
    BulkDeleteCategoriesDto,
} from "../dto/category.dto";

@Injectable()
export class CategoryService {
    private readonly logger = new Logger(CategoryService.name);

    constructor(
        private readonly prisma: PrismaService,
        private readonly cacheService: CacheService,
    ) { }

    // ============================================
    // CREATE CATEGORY
    // ============================================
    async createCategory(dto: CreateCategoryDto) {
        try {
            const slug = dto.slug || this.generateSlug(dto.name);

            const existing = await this.prisma.category.findUnique({
                where: { slug }
            });

            if (existing) {
                throw new RpcException({
                    statusCode: 400,
                    message: `Category with slug ${slug} already exists`,
                    error: 'Bad Request',
                });
            }

            const category = await this.prisma.category.create({
                data: {
                    name: dto.name,
                    slug,
                    description: dto.description,
                    icon: dto.icon,
                    imageUrl: dto.imageUrl,
                    parentId: dto.parentId,
                    isActive: dto.isActive !== undefined ? dto.isActive : true,
                    metadata: dto.metadata,
                },
                include: {
                    parent: true,
                    children: {
                        include: {
                            _count: {
                                select: { products: true },
                            },
                        },
                    },
                    _count: {
                        select: { products: true },
                    },
                },
            });

            await this.cacheService.invalidateCategoryCache();

            this.logger.log(`Category created: ${category.id} - ${category.name}`);
            return this.toResponseDto(category);
        } catch (error) {
            this.logger.error('Error creating category:', error);
            if (error instanceof RpcException) throw error;
            throw new RpcException({
                statusCode: 500,
                message: 'Failed to create category',
                error: 'Internal Server Error',
            });
        }
    }

    // ============================================
    // FIND ALL CATEGORIES
    // ============================================
    async findAllCategories(query?: CategoryQueryDto): Promise<{
        data: CategoryResponseDto[];
        meta: any;
    }> {
        try {
            const {
                search,
                parentId,
                isActive,
                dateFrom,
                dateTo,
                includeProducts = false,
                includeChildren = true,
                sortBy = 'name',
                sortOrder = 'asc',
                page = 1,
                limit = 20,
                ids,
            } = query || {};

            // Build cache key
            const cacheKey = `categories:${JSON.stringify({ search, parentId, isActive, dateFrom, dateTo, includeProducts, includeChildren, sortBy, sortOrder, page, limit, ids })}`;

            // Check cache
            const cached = await this.cacheService.get(cacheKey);
            if (cached) {
                this.logger.debug('Categories cache hit');
                return cached;
            }

            // Build where clause
            const where: any = {};

            if (search) {
                where.OR = [
                    { name: { contains: search, mode: 'insensitive' } },
                    { description: { contains: search, mode: 'insensitive' } },
                    { slug: { contains: search, mode: 'insensitive' } },
                ];
            }

            if (parentId !== undefined) {
                where.parentId = parentId || null;
            }

            if (isActive !== undefined) {
                where.isActive = isActive;
            }

            if (ids && ids.length > 0) {
                where.id = { in: ids };
            }

            if (dateFrom) {
                where.createdAt = {
                    ...where.createdAt,
                    gte: new Date(dateFrom),
                };
            }

            if (dateTo) {
                const endDate = new Date(dateTo);
                endDate.setHours(23, 59, 59, 999);
                where.createdAt = {
                    ...where.createdAt,
                    lte: endDate,
                };
            }

            // Build include
            const include: any = {
                parent: true,
                _count: {
                    select: { products: true },
                },
            };

            if (includeChildren) {
                include.children = {
                    where: isActive !== undefined ? { isActive } : {},
                    orderBy: { name: 'asc' },
                    include: {
                        _count: {
                            select: { products: true },
                        },
                    },
                };
            }

            if (includeProducts) {
                include.products = {
                    where: isActive !== undefined ? { isActive: true } : {},
                    take: 10,
                };
            }

            // Build order by - handle special fields
            const orderBy: any = {};
            const sortableFields = ['name', 'slug', 'isActive', 'createdAt', 'updatedAt', 'productsCount'];

            if (sortableFields.includes(sortBy)) {
                if (sortBy === 'productsCount') {
                    // Sort by product count will be done after fetching
                    orderBy.name = sortOrder;
                } else {
                    orderBy[sortBy] = sortOrder;
                }
            } else {
                orderBy.name = sortOrder;
            }

            // Calculate pagination
            const skip = (page - 1) * limit;

            // Execute query
            const [categories, total] = await Promise.all([
                this.prisma.category.findMany({
                    where,
                    include,
                    orderBy,
                    skip,
                    take: limit,
                }),
                this.prisma.category.count({ where }),
            ]);

            // Transform to DTOs
            let data = categories.map((category) => this.toResponseDto(category));

            // Sort by productsCount if needed
            if (sortBy === 'productsCount') {
                const sorted = data.sort((a, b) => {
                    const aCount = a.productsCount || 0;
                    const bCount = b.productsCount || 0;
                    return sortOrder === 'asc' ? aCount - bCount : bCount - aCount;
                });
                data = sorted;
            }

            const result = {
                data,
                meta: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit),
                },
            };

            // Cache the result
            await this.cacheService.set(cacheKey, result, 300);

            return result;
        } catch (error) {
            this.logger.error('Error fetching categories:', error);
            throw new RpcException({
                statusCode: 500,
                message: 'Failed to fetch categories',
                error: 'Internal Server Error',
            });
        }
    }

    // ============================================
    // EXPORT CATEGORIES
    // ============================================
    async exportCategories(query?: CategoryQueryDto): Promise<{ data: CategoryResponseDto[] }> {
        try {
            // Fetch all categories without pagination
            const result = await this.findAllCategories({
                ...query,
                limit: 999999,
                page: 1,
            });

            return { data: result.data };
        } catch (error) {
            this.logger.error('Error exporting categories:', error);
            throw new RpcException({
                statusCode: 500,
                message: 'Failed to export categories',
                error: 'Internal Server Error',
            });
        }
    }

    // ============================================
    // FIND CATEGORY BY ID
    // ============================================
    async findCategoryById(id: string): Promise<CategoryResponseDto> {
        try {
            const cacheKey = `category:${id}`;
            const cached = await this.cacheService.get(cacheKey);
            if (cached) {
                this.logger.debug(`Category cache hit: ${id}`);
                return cached;
            }

            const category = await this.prisma.category.findUnique({
                where: { id },
                include: {
                    parent: true,
                    children: {
                        where: { isActive: true },
                        include: {
                            _count: {
                                select: { products: true },
                            },
                        },
                    },
                    _count: {
                        select: { products: true },
                    },
                },
            });

            if (!category) {
                throw new RpcException({
                    statusCode: 404,
                    message: 'Category not found',
                    error: 'Not Found',
                });
            }

            const result = this.toResponseDto(category);
            await this.cacheService.set(cacheKey, result, 600);

            return result;
        } catch (error) {
            this.logger.error(`Error finding category ${id}:`, error);
            if (error instanceof RpcException) throw error;
            throw new RpcException({
                statusCode: 500,
                message: 'Failed to fetch category',
                error: 'Internal Server Error',
            });
        }
    }

    // ============================================
    // FIND CATEGORY BY SLUG
    // ============================================
    async findCategoryBySlug(slug: string): Promise<CategoryResponseDto> {
        try {
            const cacheKey = `category:slug:${slug}`;
            const cached = await this.cacheService.get(cacheKey);
            if (cached) {
                this.logger.debug(`Category slug cache hit: ${slug}`);
                return cached;
            }

            const category = await this.prisma.category.findUnique({
                where: { slug },
                include: {
                    parent: true,
                    children: {
                        where: { isActive: true },
                        include: {
                            _count: {
                                select: { products: true },
                            },
                        },
                    },
                    products: {
                        where: { isActive: true },
                        take: 20,
                        include: {
                            images: {
                                orderBy: { order: 'asc' },
                                take: 1,
                            },
                        },
                    },
                    _count: {
                        select: { products: true },
                    },
                },
            });

            if (!category) {
                throw new RpcException({
                    statusCode: 404,
                    message: 'Category not found',
                    error: 'Not Found',
                });
            }

            const result = this.toResponseDto(category);
            await this.cacheService.set(cacheKey, result, 600);

            return result;
        } catch (error) {
            this.logger.error(`Error finding category by slug ${slug}:`, error);
            if (error instanceof RpcException) throw error;
            throw new RpcException({
                statusCode: 500,
                message: 'Failed to fetch category',
                error: 'Internal Server Error',
            });
        }
    }

    // ============================================
    // GET CATEGORY TREE
    // ============================================
    async getCategoryTree(): Promise<CategoryTreeDto[]> {
        try {
            const cacheKey = 'categories:tree';
            const cached = await this.cacheService.get(cacheKey);
            if (cached) {
                this.logger.debug('Category tree cache hit');
                return cached;
            }

            const categories = await this.prisma.category.findMany({
                where: { isActive: true },
                include: {
                    children: {
                        where: { isActive: true },
                        include: {
                            children: {
                                where: { isActive: true },
                                include: {
                                    _count: {
                                        select: { products: true },
                                    },
                                },
                            },
                            _count: {
                                select: { products: true },
                            },
                        },
                    },
                    _count: {
                        select: { products: true },
                    },
                },
                orderBy: { name: 'asc' },
            });

            // Build tree
            const categoryMap = new Map();
            const roots: CategoryTreeDto[] = [];

            // First pass: create all nodes
            for (const category of categories) {
                categoryMap.set(category.id, {
                    id: category.id,
                    name: category.name,
                    slug: category.slug,
                    description: category.description,
                    icon: category.icon,
                    imageUrl: category.imageUrl,
                    isActive: category.isActive,
                    children: [],
                    productsCount: category._count?.products || 0,
                    metadata: category.metadata,
                });
            }

            // Second pass: build hierarchy
            for (const category of categories) {
                const node = categoryMap.get(category.id);
                if (category.parentId) {
                    const parent = categoryMap.get(category.parentId);
                    if (parent) {
                        parent.children.push(node);
                    }
                } else {
                    roots.push(node);
                }
            }

            // Sort children recursively
            const sortChildren = (nodes: CategoryTreeDto[]) => {
                nodes.sort((a, b) => a.name.localeCompare(b.name));
                for (const node of nodes) {
                    if (node.children.length > 0) {
                        sortChildren(node.children);
                    }
                }
            };
            sortChildren(roots);

            await this.cacheService.set(cacheKey, roots, 600);

            return roots;
        } catch (error) {
            this.logger.error('Error getting category tree:', error);
            throw new RpcException({
                statusCode: 500,
                message: 'Failed to get category tree',
                error: 'Internal Server Error',
            });
        }
    }

    // ============================================
    // UPDATE CATEGORY
    // ============================================
    async updateCategory(id: string, dto: UpdateCategoryDto): Promise<CategoryResponseDto> {
        try {
            const existing = await this.prisma.category.findUnique({
                where: { id },
            });

            if (!existing) {
                throw new RpcException({
                    statusCode: 404,
                    message: 'Category not found',
                    error: 'Not Found',
                });
            }

            // Check if new slug is unique
            if (dto.slug && dto.slug !== existing.slug) {
                const slugExists = await this.prisma.category.findUnique({
                    where: { slug: dto.slug },
                });

                if (slugExists) {
                    throw new RpcException({
                        statusCode: 400,
                        message: `Category with slug '${dto.slug}' already exists`,
                        error: 'Bad Request',
                    });
                }
            }

            // Check if parent exists (if provided)
            if (dto.parentId) {
                if (dto.parentId === id) {
                    throw new RpcException({
                        statusCode: 400,
                        message: 'Category cannot be its own parent',
                        error: 'Bad Request',
                    });
                }

                const parent = await this.prisma.category.findUnique({
                    where: { id: dto.parentId },
                });

                if (!parent) {
                    throw new RpcException({
                        statusCode: 404,
                        message: 'Parent category not found',
                        error: 'Not Found',
                    });
                }

                const descendants = await this.getCategoryDescendants(id);
                if (descendants.some(d => d.id === dto.parentId)) {
                    throw new RpcException({
                        statusCode: 400,
                        message: 'Cannot set parent to a descendant category',
                        error: 'Bad Request',
                    });
                }
            }

            const category = await this.prisma.category.update({
                where: { id },
                data: {
                    name: dto.name,
                    slug: dto.slug,
                    description: dto.description,
                    icon: dto.icon,
                    imageUrl: dto.imageUrl,
                    parentId: dto.parentId,
                    isActive: dto.isActive,
                    metadata: dto.metadata,
                },
                include: {
                    parent: true,
                    children: {
                        where: { isActive: true },
                        include: {
                            _count: {
                                select: { products: true },
                            },
                        },
                    },
                    _count: {
                        select: { products: true },
                    },
                },
            });

            await this.cacheService.invalidateCategoryCache();
            await this.cacheService.delete(`category:${id}`);
            if (dto.slug) {
                await this.cacheService.delete(`category:slug:${existing.slug}`);
            }

            this.logger.log(`Category updated: ${category.id} - ${category.name}`);
            return this.toResponseDto(category);
        } catch (error) {
            this.logger.error(`Error updating category ${id}:`, error);
            if (error instanceof RpcException) throw error;
            throw new RpcException({
                statusCode: 500,
                message: 'Failed to update category',
                error: 'Internal Server Error',
            });
        }
    }

    // ============================================
    // DELETE CATEGORY
    // ============================================
    async deleteCategory(id: string): Promise<{ success: boolean; message: string }> {
        try {
            const category = await this.prisma.category.findUnique({
                where: { id },
                include: {
                    _count: {
                        select: { products: true, children: true },
                    },
                },
            });

            if (!category) {
                throw new RpcException({
                    statusCode: 404,
                    message: 'Category not found',
                    error: 'Not Found',
                });
            }

            if (category._count.products > 0) {
                throw new RpcException({
                    statusCode: 400,
                    message: `Cannot delete category with ${category._count.products} products. Move or delete products first.`,
                    error: 'Bad Request',
                });
            }

            if (category._count.children > 0) {
                throw new RpcException({
                    statusCode: 400,
                    message: `Cannot delete category with ${category._count.children} subcategories. Delete or move subcategories first.`,
                    error: 'Bad Request',
                });
            }

            await this.prisma.category.delete({
                where: { id },
            });

            await this.cacheService.invalidateCategoryCache();
            await this.cacheService.delete(`category:${id}`);
            await this.cacheService.delete(`category:slug:${category.slug}`);

            this.logger.log(`Category deleted: ${id}`);
            return { success: true, message: 'Category deleted successfully' };
        } catch (error) {
            this.logger.error(`Error deleting category ${id}:`, error);
            if (error instanceof RpcException) throw error;
            throw new RpcException({
                statusCode: 500,
                message: 'Failed to delete category',
                error: 'Internal Server Error',
            });
        }
    }

    // ============================================
    // BULK DELETE CATEGORIES
    // ============================================
    async bulkDeleteCategories(data: BulkDeleteCategoriesDto): Promise<{
        success: boolean;
        deleted: number;
        ids: string[];
        message: string;
    }> {
        try {
            const { ids } = data;

            if (!ids || ids.length === 0) {
                throw new RpcException({
                    statusCode: 400,
                    message: 'No category IDs provided',
                    error: 'Bad Request',
                });
            }

            // Check if all categories exist and have no products/children
            const categories = await this.prisma.category.findMany({
                where: { id: { in: ids } },
                include: {
                    _count: {
                        select: { products: true, children: true },
                    },
                },
            });

            if (categories.length !== ids.length) {
                const foundIds = categories.map(c => c.id);
                const missingIds = ids.filter(id => !foundIds.includes(id));
                throw new RpcException({
                    statusCode: 404,
                    message: `Categories not found: ${missingIds.join(', ')}`,
                    error: 'Not Found',
                });
            }

            // Check for categories with products or children
            const invalidCategories = categories.filter(
                c => c._count.products > 0 || c._count.children > 0
            );

            if (invalidCategories.length > 0) {
                const invalidNames = invalidCategories.map(c => `${c.name} (${c._count.products} products, ${c._count.children} subcategories)`);
                throw new RpcException({
                    statusCode: 400,
                    message: `Cannot delete categories with products or subcategories: ${invalidNames.join(', ')}`,
                    error: 'Bad Request',
                });
            }

            // Delete all valid categories
            const result = await this.prisma.category.deleteMany({
                where: { id: { in: ids } },
            });

            // Clear cache
            await this.cacheService.invalidateCategoryCache();
            for (const id of ids) {
                await this.cacheService.delete(`category:${id}`);
            }

            this.logger.log(`Bulk deleted ${result.count} categories`);
            return {
                success: true,
                deleted: result.count,
                ids,
                message: `Successfully deleted ${result.count} categories`,
            };
        } catch (error) {
            this.logger.error('Error bulk deleting categories:', error);
            if (error instanceof RpcException) throw error;
            throw new RpcException({
                statusCode: 500,
                message: 'Failed to bulk delete categories',
                error: 'Internal Server Error',
            });
        }
    }

    // ============================================
    // REORDER CATEGORY
    // ============================================
    async reorderCategory(dto: ReorderCategoryDto): Promise<{ success: boolean }> {
        try {
            // Implementation depends on your ordering strategy
            // You might have a displayOrder field or use adjacency list
            this.logger.log(`Category reordered: ${dto.categoryId} - ${dto.action}`);
            return { success: true };
        } catch (error) {
            this.logger.error(`Error reordering category:`, error);
            throw new RpcException({
                statusCode: 500,
                message: 'Failed to reorder category',
                error: 'Internal Server Error',
            });
        }
    }

    // ============================================
    // VALIDATE CATEGORY
    // ============================================
    async validateCategory(data: { name: string; parentId?: string }): Promise<{ valid: boolean; message?: string }> {
        try {
            const existing = await this.prisma.category.findFirst({
                where: {
                    name: data.name,
                    parentId: data.parentId || null,
                },
            });

            if (existing) {
                return {
                    valid: false,
                    message: `Category with name '${data.name}' already exists under this parent`,
                };
            }

            if (data.parentId) {
                const parent = await this.prisma.category.findUnique({
                    where: { id: data.parentId },
                });

                if (!parent) {
                    return {
                        valid: false,
                        message: 'Parent category not found',
                    };
                }
            }

            return { valid: true };
        } catch (error) {
            this.logger.error('Error validating category:', error);
            return {
                valid: false,
                message: 'Validation failed',
            };
        }
    }

    // ============================================
    // PRIVATE HELPERS
    // ============================================
    private generateSlug(name: string): string {
        return name
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    private async getCategoryDescendants(id: string): Promise<any[]> {
        const descendants: any[] = [];
        const queue = [id];

        while (queue.length > 0) {
            const currentId = queue.shift()!;
            const children = await this.prisma.category.findMany({
                where: { parentId: currentId },
                select: { id: true },
            });

            for (const child of children) {
                descendants.push(child);
                queue.push(child.id);
            }
        }

        return descendants;
    }

    private toResponseDto(category: any): CategoryResponseDto {
        return {
            id: category.id,
            name: category.name,
            slug: category.slug,
            description: category.description,
            icon: category.icon,
            imageUrl: category.imageUrl,
            isActive: category.isActive,
            parentId: category.parentId,
            parent: category.parent ? this.toResponseDto(category.parent) : undefined,
            children: category.children?.map((child: any) => this.toResponseDto(child)) || [],
            productsCount: category._count?.products || 0,
            createdAt: category.createdAt,
            updatedAt: category.updatedAt,
            metadata: category.metadata,
        };
    }
}