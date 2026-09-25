import { Type } from 'class-transformer';
import {
    ArrayMaxSize,
    IsArray,
    IsBoolean,
    IsInt,
    IsNumber,
    IsOptional,
    IsString,
    Max,
    MaxLength,
    Min,
    ValidateNested,
} from 'class-validator';

export class DeliveryZoneDto {
    @IsString()
    @MaxLength(80)
    name: string;

    @IsOptional()
    @IsString()
    @MaxLength(200)
    description?: string;

    @IsArray()
    @ArrayMaxSize(300)
    @IsString({ each: true })
    @MaxLength(60, { each: true })
    cities: string[];

    @IsOptional()
    @IsBoolean()
    isDefault?: boolean;

    @IsNumber()
    @Min(0)
    fee: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    perKgFee?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    includedKg?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    freeAbove?: number | null;

    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(60)
    minDays?: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(60)
    maxDays?: number;

    @IsOptional()
    @IsBoolean()
    allowsCod?: boolean;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @IsOptional()
    @IsInt()
    sortOrder?: number;
}

export class UpdateCheckoutSettingsDto {
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(100)
    vatRate?: number;

    @IsOptional()
    @IsBoolean()
    vatOnShipping?: boolean;

    @IsOptional()
    @IsString()
    updatedBy?: string;
}

export class QuoteItemDto {
    @IsNumber()
    @Min(0)
    unitPrice: number;

    @IsInt()
    @Min(1)
    quantity: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    weightKg?: number | null;
}

export class QuoteRequestDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => QuoteItemDto)
    items: QuoteItemDto[];

    @IsString()
    @MaxLength(80)
    city: string;
}
