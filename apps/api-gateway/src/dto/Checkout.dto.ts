import { Type } from 'class-transformer';
import {
    ArrayMaxSize,
    ArrayMinSize,
    IsArray,
    IsIn,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
    Max,
    MaxLength,
    Min,
    ValidateNested,
} from 'class-validator';

// cards are off until a card processor is integrated
export const PAYMENT_METHODS = ['mpesa', 'cod'] as const;

export class CheckoutItemDto {
    @IsUUID()
    productId: string;

    @IsInt()
    @Min(1)
    @Max(99)
    quantity: number;
}

/**
 * Shopper checkout body. Deliberately carries NO prices or fees — the
 * gateway re-prices every item from the product service and the order
 * service prices delivery (from the town) and VAT, so the client can't
 * set its own totals.
 */
export class CheckoutDto {
    @IsArray()
    @ArrayMinSize(1)
    @ArrayMaxSize(50)
    @ValidateNested({ each: true })
    @Type(() => CheckoutItemDto)
    items: CheckoutItemDto[];

    @IsString()
    @IsNotEmpty()
    @MaxLength(120)
    fullName: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    phone: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    address: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(80)
    city: string;

    @IsOptional()
    @IsString()
    @MaxLength(120)
    landmark?: string;

    @IsIn(PAYMENT_METHODS)
    paymentMethod: (typeof PAYMENT_METHODS)[number];

    @IsOptional()
    @IsString()
    @MaxLength(500)
    note?: string;
}

/** Price a cart for a town before placing the order (public — also used for guests). */
export class QuoteDto {
    @IsArray()
    @ArrayMinSize(1)
    @ArrayMaxSize(50)
    @ValidateNested({ each: true })
    @Type(() => CheckoutItemDto)
    items: CheckoutItemDto[];

    @IsString()
    @IsNotEmpty()
    @MaxLength(80)
    city: string;
}

/** Re-send the M-Pesa prompt, optionally to a different phone. */
export class PayOrderDto {
    @IsOptional()
    @IsString()
    @MaxLength(20)
    phone?: string;
}
