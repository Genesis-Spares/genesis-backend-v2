// apps/product-service/src/dto/product.dto.ts
import {
    IsString,
    IsNumber,
    IsOptional,
    IsUUID,
    IsArray,
    IsBoolean,
    IsObject,
    IsUrl,
    Min,
    Max,
    MinLength,
    MaxLength,
    IsEnum,
    ValidateNested,
    IsInt,
    ArrayMaxSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';

export class ProductImageDto {
    @IsUrl({}, { message: 'url must be a valid URL' })
    url: string;

    @IsString({ message: 'alt must be a string' })
    @IsOptional()
    alt?: string;

    @IsBoolean({ message: 'isPrimary must be a boolean' })
    @IsOptional()
    isPrimary?: boolean;

    @IsNumber({}, { message: 'order must be a number' })
    @IsOptional()
    @Type(() => Number)
    order?: number;
}

export class ProductVariantDto {
    @IsString({ message: 'sku must be a string' })
    @MinLength(3, { message: 'sku must be at least 3 characters' })
    sku: string;

    @IsString({ message: 'name must be a string' })
    @MinLength(2, { message: 'name must be at least 2 characters' })
    name: string;

    @IsNumber({}, { message: 'price must be a number' })
    @Min(0, { message: 'price must be greater than or equal to 0' })
    @Type(() => Number)
    price: number;

    @IsNumber({}, { message: 'comparePrice must be a number' })
    @IsOptional()
    @Min(0, { message: 'comparePrice must be greater than or equal to 0' })
    @Type(() => Number)
    comparePrice?: number;

    @IsNumber({}, { message: 'stockQty must be a number' })
    @IsOptional()
    @Min(0, { message: 'stockQty must be greater than or equal to 0' })
    @Type(() => Number)
    stockQty?: number;

    @IsObject({ message: 'attributes must be an object' })
    attributes: Record<string, string>;

    @IsNumber({}, { message: 'weight must be a number' })
    @IsOptional()
    @Min(0, { message: 'weight must be greater than or equal to 0' })
    @Type(() => Number)
    weight?: number;

    @IsArray({ message: 'images must be an array' })
    @IsOptional()
    images?: string[];
}

export class ProductAttributeDto {
    @IsString({ message: 'name must be a string' })
    name: string;

    @IsString({ message: 'value must be a string' })
    value: string;

    @IsNumber({}, { message: 'displayOrder must be a number' })
    @IsOptional()
    @Type(() => Number)
    displayOrder?: number;
}

/** One vehicle a part fits. Years are inclusive; leave empty for open-ended. */
export class ProductFitmentDto {
    @IsString() @MinLength(1) @MaxLength(40)
    make: string;

    @IsString() @MinLength(1) @MaxLength(60)
    model: string;

    @IsInt() @Min(1950) @Max(2100) @IsOptional() @Type(() => Number)
    yearFrom?: number;

    @IsInt() @Min(1950) @Max(2100) @IsOptional() @Type(() => Number)
    yearTo?: number;

    @IsString() @IsOptional() @MaxLength(60)
    engine?: string;

    @IsString() @IsOptional() @MaxLength(120)
    notes?: string;
}

export const PART_NUMBER_TYPES = ['OE', 'MANUFACTURER', 'AFTERMARKET'] as const;

/** An OE / manufacturer / aftermarket number this part is sold under or replaces. */
export class ProductPartNumberDto {
    @IsString() @MinLength(2) @MaxLength(60)
    number: string;

    @IsEnum(PART_NUMBER_TYPES) @IsOptional()
    type?: (typeof PART_NUMBER_TYPES)[number];

    @IsString() @IsOptional() @MaxLength(40)
    brand?: string;
}

export class CreateProductDto {
    @IsString({ message: 'sku must be a string' })
    @MinLength(3, { message: 'sku must be at least 3 characters' })
    @MaxLength(50, { message: 'sku must be at most 50 characters' })
    sku: string;

    @IsString({ message: 'name must be a string' })
    @MinLength(2, { message: 'name must be at least 2 characters' })
    @MaxLength(200, { message: 'name must be at most 200 characters' })
    name: string;

    @IsString({ message: 'slug must be a string' })
    @MinLength(2, { message: 'slug must be at least 2 characters' })
    @MaxLength(200, { message: 'slug must be at most 200 characters' })
    slug: string;

    @IsString({ message: 'description must be a string' })
    @IsOptional()
    @MaxLength(5000, { message: 'description must be at most 5000 characters' })
    description?: string;

    @IsString({ message: 'brand must be a string' })
    @IsOptional()
    @MaxLength(100, { message: 'brand must be at most 100 characters' })
    brand?: string;

    @IsNumber({}, { message: 'price must be a number' })
    @Min(0, { message: 'price must be greater than or equal to 0' })
    @Type(() => Number)
    price: number;

    @IsNumber({}, { message: 'comparePrice must be a number' })
    @IsOptional()
    @Min(0, { message: 'comparePrice must be greater than or equal to 0' })
    @Type(() => Number)
    comparePrice?: number;

    @IsNumber({}, { message: 'costPrice must be a number' })
    @IsOptional()
    @Min(0, { message: 'costPrice must be greater than or equal to 0' })
    @Type(() => Number)
    costPrice?: number;

    @IsNumber({}, { message: 'stockQty must be a number' })
    @IsOptional()
    @Min(0, { message: 'stockQty must be greater than or equal to 0' })
    @Type(() => Number)
    stockQty?: number;

    @IsNumber({}, { message: 'minStockQty must be a number' })
    @IsOptional()
    @Min(0, { message: 'minStockQty must be greater than or equal to 0' })
    @Type(() => Number)
    minStockQty?: number;

    @IsUUID(undefined, { message: 'categoryId must be a valid UUID' })
    @IsOptional()
    categoryId?: string;

    @IsArray({ message: 'images must be an array' })
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => ProductImageDto)
    images?: ProductImageDto[];

    @IsArray({ message: 'variants must be an array' })
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => ProductVariantDto)
    variants?: ProductVariantDto[];

    @IsArray({ message: 'attributes must be an array' })
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => ProductAttributeDto)
    attributes?: ProductAttributeDto[];

    @IsNumber({}, { message: 'weight must be a number' })
    @IsOptional()
    @Min(0, { message: 'weight must be greater than or equal to 0' })
    @Type(() => Number)
    weight?: number;

    @IsObject({ message: 'dimensions must be an object' })
    @IsOptional()
    dimensions?: Record<string, any>;

    @IsString({ message: 'compatibility must be a string' })
    @IsOptional()
    compatibility?: string;

    /** Structured fitment — replaces the product's whole list when provided. */
    @IsArray()
    @IsOptional()
    @ArrayMaxSize(200)
    @ValidateNested({ each: true })
    @Type(() => ProductFitmentDto)
    fitments?: ProductFitmentDto[];

    /** Fits any vehicle (oil, bulbs, tools…). */
    @IsBoolean()
    @IsOptional()
    isUniversal?: boolean;

    /** Cross-reference numbers — replaces the product's whole list when provided. */
    @IsArray()
    @IsOptional()
    @ArrayMaxSize(100)
    @ValidateNested({ each: true })
    @Type(() => ProductPartNumberDto)
    partNumbers?: ProductPartNumberDto[];

    @IsArray({ message: 'tags must be an array' })
    @IsOptional()
    tags?: string[];

    @IsString({ message: 'metaTitle must be a string' })
    @IsOptional()
    @MaxLength(60, { message: 'metaTitle must be at most 60 characters' })
    metaTitle?: string;

    @IsString({ message: 'metaDescription must be a string' })
    @IsOptional()
    @MaxLength(160, { message: 'metaDescription must be at most 160 characters' })
    metaDescription?: string;

    @IsArray({ message: 'metaKeywords must be an array' })
    @IsOptional()
    @IsString({ each: true, message: 'each metaKeyword must be a string' })
    metaKeywords?: string[];

    @IsBoolean({ message: 'isActive must be a boolean' })
    @IsOptional()
    isActive?: boolean;

}

export class UpdateProductDto extends PartialType(CreateProductDto) { }

export class ProductQueryDto {
    @IsString({ message: 'search must be a string' })
    @IsOptional()
    search?: string;

    @IsUUID(undefined, { message: 'categoryId must be a valid UUID' })
    @IsOptional()
    categoryId?: string;

    @IsString({ message: 'brand must be a string' })
    @IsOptional()
    brand?: string;

    @IsNumber({}, { message: 'minPrice must be a number' })
    @IsOptional()
    @Min(0, { message: 'minPrice must be greater than or equal to 0' })
    @Type(() => Number)
    minPrice?: number;

    @IsNumber({}, { message: 'maxPrice must be a number' })
    @IsOptional()
    @Min(0, { message: 'maxPrice must be greater than or equal to 0' })
    @Type(() => Number)
    maxPrice?: number;

    @IsBoolean({ message: 'inStock must be a boolean' })
    @IsOptional()
    @Type(() => Boolean)
    inStock?: boolean;

    @IsBoolean({ message: 'isActive must be a boolean' })
    @IsOptional()
    @Type(() => Boolean)
    isActive?: boolean;

    @IsString({ message: 'sortBy must be a string' })
    @IsOptional()
    @IsEnum(['price', 'name', 'createdAt', 'popularity', 'rating', 'stock'])
    sortBy?: 'price' | 'name' | 'createdAt' | 'popularity' | 'rating' | 'stock';

    @IsString({ message: 'sortOrder must be a string' })
    @IsOptional()
    @IsEnum(['asc', 'desc'])
    sortOrder?: 'asc' | 'desc';

    // vehicle finder: parts that fit this make/model(/year), plus universal parts
    @IsString() @IsOptional() @MaxLength(40)
    make?: string;

    @IsString() @IsOptional() @MaxLength(60)
    model?: string;

    @IsInt() @IsOptional() @Min(1950) @Max(2100) @Type(() => Number)
    year?: number;

    @IsNumber({}, { message: 'page must be a number' })
    @IsOptional()
    @Min(1, { message: 'page must be at least 1' })
    @Type(() => Number)
    page?: number;

    @IsNumber({}, { message: 'limit must be a number' })
    @IsOptional()
    @Min(1, { message: 'limit must be at least 1' })
    @Max(100, { message: 'limit must be at most 100' })
    @Type(() => Number)
    limit?: number;
}

export class UpdateInventoryDto {
    @IsNumber({}, { message: 'stockQty must be a number' })
    @Min(0, { message: 'stockQty must be greater than or equal to 0' })
    stockQty: number;

    @IsString({ message: 'reason must be a string' })
    @IsOptional()
    reason?: string;
}

export class ProductResponseDto {
    id: string;
    sku: string;
    name: string;
    slug: string;
    description?: string;
    brand?: string;

    price: number;
    comparePrice?: number;
    costPrice?: number;

    stockQty: number;
    minStockQty?: number;
    isInStock: boolean;
    isActive: boolean;

    categoryId?: string;

    weight?: number;
    dimensions?: Record<string, any>;
    compatibility?: string;
    tags: string[];

    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string[];

    images: ProductImageDto[];
    variants: ProductVariantDto[];
    attributes: ProductAttributeDto[];

    averageRating?: number;
    reviewCount?: number;

    createdAt: Date;
    updatedAt: Date;
}