// apps/product-service/src/dto/category.dto.ts
import {
    IsString,
    IsOptional,
    IsUUID,
    IsBoolean,
    IsUrl,
    MinLength,
    MaxLength,
    IsObject,
    IsArray,
    IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';

// ============================================
// CREATE CATEGORY DTO
// ============================================
export class CreateCategoryDto {
    @IsString({ message: 'name must be a string' })
    @MinLength(2, { message: 'name must be at least 2 characters' })
    @MaxLength(100, { message: 'name must be at most 100 characters' })
    name: string;

    @IsString({ message: 'slug must be a string' })
    @MinLength(2, { message: 'slug must be at least 2 characters' })
    @MaxLength(100, { message: 'slug must be at most 100 characters' })
    @IsOptional()
    slug?: string;

    @IsString({ message: 'description must be a string' })
    @MaxLength(500, { message: 'description must be at most 500 characters' })
    @IsOptional()
    description?: string;

    @IsString({ message: 'icon must be a string' })
    @IsOptional()
    icon?: string;

    @IsUrl({}, { message: 'imageUrl must be a valid URL' })
    @IsOptional()
    imageUrl?: string;

    @IsUUID(undefined, { message: 'parentId must be a valid UUID' })
    @IsOptional()
    parentId?: string;

    @IsBoolean({ message: 'isActive must be a boolean' })
    @IsOptional()
    isActive?: boolean;

    @IsObject({ message: 'metadata must be an object' })
    @IsOptional()
    metadata?: Record<string, any>;

    @IsArray({ message: 'children must be an array' })
    @IsOptional()
    children?: CreateCategoryDto[];
}

// ============================================
// UPDATE CATEGORY DTO
// ============================================
export class UpdateCategoryDto {
    @IsString({ message: 'name must be a string' })
    @MinLength(2, { message: 'name must be at least 2 characters' })
    @MaxLength(100, { message: 'name must be at most 100 characters' })
    @IsOptional()
    name?: string;

    @IsString({ message: 'slug must be a string' })
    @MinLength(2, { message: 'slug must be at least 2 characters' })
    @MaxLength(100, { message: 'slug must be at most 100 characters' })
    @IsOptional()
    slug?: string;

    @IsString({ message: 'description must be a string' })
    @MaxLength(500, { message: 'description must be at most 500 characters' })
    @IsOptional()
    description?: string;

    @IsString({ message: 'icon must be a string' })
    @IsOptional()
    icon?: string;

    @IsUrl({}, { message: 'imageUrl must be a valid URL' })
    @IsOptional()
    imageUrl?: string;

    @IsUUID(undefined, { message: 'parentId must be a valid UUID' })
    @IsOptional()
    parentId?: string;

    @IsBoolean({ message: 'isActive must be a boolean' })
    @IsOptional()
    isActive?: boolean;

    @IsObject({ message: 'metadata must be an object' })
    @IsOptional()
    metadata?: Record<string, any>;
}

// ============================================
// CATEGORY QUERY DTO
// ============================================
export class CategoryQueryDto {
    @IsString({ message: 'search must be a string' })
    @IsOptional()
    search?: string;

    @IsUUID(undefined, { message: 'parentId must be a valid UUID' })
    @IsOptional()
    parentId?: string;

    @IsBoolean({ message: 'isActive must be a boolean' })
    @IsOptional()
    @Type(() => Boolean)
    isActive?: boolean;

    @IsString({ message: 'dateFrom must be a string' })
    @IsOptional()
    dateFrom?: string;

    @IsString({ message: 'dateTo must be a string' })
    @IsOptional()
    dateTo?: string;

    @IsBoolean({ message: 'includeProducts must be a boolean' })
    @IsOptional()
    @Type(() => Boolean)
    includeProducts?: boolean;

    @IsBoolean({ message: 'includeChildren must be a boolean' })
    @IsOptional()
    @Type(() => Boolean)
    includeChildren?: boolean;

    @IsString({ message: 'sortBy must be a string' })
    @IsOptional()
    sortBy?: string;

    @IsString({ message: 'sortOrder must be a string' })
    @IsOptional()
    sortOrder?: 'asc' | 'desc';

    @IsOptional()
    @Type(() => Number)
    page?: number;

    @IsOptional()
    @Type(() => Number)
    limit?: number;

    @IsArray({ message: 'ids must be an array' })
    @IsOptional()
    @Type(() => String)
    ids?: string[];
}

// ============================================
// CATEGORY RESPONSE DTO
// ============================================
export class CategoryResponseDto {
    id: string;
    name: string;
    slug: string;
    description?: string;
    icon?: string;
    imageUrl?: string;
    isActive: boolean;
    parentId?: string;
    parent?: CategoryResponseDto;
    children?: CategoryResponseDto[];
    productsCount?: number;
    createdAt: Date;
    updatedAt: Date;
    metadata?: Record<string, any>;
}

// ============================================
// CATEGORY TREE DTO (for nested categories)
// ============================================
export class CategoryTreeDto {
    id: string;
    name: string;
    slug: string;
    description?: string;
    icon?: string;
    imageUrl?: string;
    isActive: boolean;
    children: CategoryTreeDto[];
    productsCount?: number;
    metadata?: Record<string, any>;
}

// ============================================
// CATEGORY WITH PRODUCTS DTO
// ============================================
import { ProductResponseDto } from './product.dto';

export class CategoryWithProductsDto extends CategoryResponseDto {
    products: ProductResponseDto[];
    productCount: number;
}

// ============================================
// BULK CATEGORY DTOs
// ============================================
export class BulkCreateCategoriesDto {
    @IsArray({ message: 'categories must be an array' })
    @Type(() => CreateCategoryDto)
    categories: CreateCategoryDto[];
}

export class BulkUpdateCategoriesDto {
    @IsArray({ message: 'categories must be an array' })
    @Type(() => UpdateCategoryDto)
    categories: UpdateCategoryDto[];
}

export class BulkDeleteCategoriesDto {
    @IsArray({ message: 'ids must be an array' })
    @IsUUID(undefined, { each: true, message: 'Each id must be a valid UUID' })
    ids: string[];
}

// ============================================
// CATEGORY REORDER DTO
// ============================================
export class ReorderCategoryDto {
    @IsUUID(undefined, { message: 'categoryId must be a valid UUID' })
    categoryId: string;

    @IsString({ message: 'action must be a string' })
    action: 'up' | 'down' | 'top' | 'bottom';

    @IsString({ message: 'targetId must be a string' })
    @IsOptional()
    targetId?: string;
}

// ============================================
// CATEGORY VALIDATION
// ============================================
export class ValidateCategoryDto {
    @IsString({ message: 'name must be a string' })
    name: string;

    @IsUUID(undefined, { message: 'parentId must be a valid UUID' })
    @IsOptional()
    parentId?: string;
}