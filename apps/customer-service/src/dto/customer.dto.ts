// apps/customer-service/src/dto/customer.dto.ts
import {
    IsString,
    IsEmail,
    IsOptional,
    IsUUID,
    IsBoolean,
    IsObject,
    IsArray,
    IsDateString,
    IsEnum,
    IsNumber,
    Min,
    Max,
    IsPhoneNumber,
    IsUrl,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';

export class CreateCustomerDto {
    @IsUUID()
    userId: string;

    @IsEmail()
    email: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsPhoneNumber()
    @IsOptional()
    phone?: string;

    @IsUrl()
    @IsOptional()
    avatar?: string;

    @IsDateString()
    @IsOptional()
    dateOfBirth?: string;

    @IsString()
    @IsOptional()
    @IsEnum(['MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY'])
    gender?: string;

    @IsString()
    @IsOptional()
    language?: string;

    @IsString()
    @IsOptional()
    timezone?: string;

    @IsString()
    @IsOptional()
    currency?: string;
}

export class UpdateCustomerDto {
    @IsString()
    @IsOptional()
    avatar?: string;

    @IsDateString()
    @IsOptional()
    dateOfBirth?: string;

    @IsString()
    @IsOptional()
    @IsEnum(['MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY'])
    gender?: string;

    @IsString()
    @IsOptional()
    language?: string;

    @IsString()
    @IsOptional()
    timezone?: string;

    @IsString()
    @IsOptional()
    currency?: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}

export class CustomerPreferenceDto {
    @IsBoolean()
    @IsOptional()
    emailNotifications?: boolean;

    @IsBoolean()
    @IsOptional()
    smsNotifications?: boolean;

    @IsBoolean()
    @IsOptional()
    pushNotifications?: boolean;

    @IsBoolean()
    @IsOptional()
    marketingEmails?: boolean;

    @IsBoolean()
    @IsOptional()
    dataSharingConsent?: boolean;

    @IsBoolean()
    @IsOptional()
    cookieConsent?: boolean;

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    preferredCategories?: string[];

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    preferredBrands?: string[];
}

export class AddressDto {
    @IsString()
    label: string;

    @IsString()
    @IsOptional()
    @IsEnum(['SHIPPING', 'BILLING', 'BOTH'])
    type?: string;

    @IsString()
    line1: string;

    @IsString()
    @IsOptional()
    line2?: string;

    @IsString()
    city: string;

    @IsString()
    @IsOptional()
    state?: string;

    @IsString()
    postalCode: string;

    @IsString()
    country: string;

    @IsPhoneNumber()
    @IsOptional()
    phone?: string;

    @IsBoolean()
    @IsOptional()
    isDefault?: boolean;

    @IsNumber()
    @IsOptional()
    @Min(-90)
    @Max(90)
    latitude?: number;

    @IsNumber()
    @IsOptional()
    @Min(-180)
    @Max(180)
    longitude?: number;

    @IsString()
    @IsOptional()
    deliveryInstructions?: string;
}

export class UpdateAddressDto extends PartialType(AddressDto) { }
export class CreateNoteDto {
    @IsString()
    content: string;

    @IsUUID()
    authorId: string;  // Make sure this is required (no @IsOptional())

    @IsString()
    @IsOptional()
    @IsEnum(['GENERAL', 'SUPPORT', 'SALES', 'COMPLAINT', 'FEEDBACK'])
    type?: string;

    @IsBoolean()
    @IsOptional()
    isInternal?: boolean;

    @IsBoolean()
    @IsOptional()
    isPinned?: boolean;
}

export class CustomerQueryDto {
    @IsString()
    @IsOptional()
    search?: string;

    @IsString()
    @IsOptional()
    loyaltyTier?: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;

    @IsString()
    @IsOptional()
    sortBy?: 'createdAt' | 'lastLoginAt' | 'loyaltyPoints' | 'loginCount';

    @IsString()
    @IsOptional()
    sortOrder?: 'asc' | 'desc';

    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    page?: number;

    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    limit?: number;
}

export class SyncUserDataDto {
    @IsUUID()
    userId: string;

    @IsEmail()
    email: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsPhoneNumber()
    @IsOptional()
    phone?: string;
}