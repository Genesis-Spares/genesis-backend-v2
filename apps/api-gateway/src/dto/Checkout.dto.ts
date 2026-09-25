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

export const DELIVERY_METHODS = {
    'same-day': { label: 'Same-Day Delivery (Nairobi)', fee: 0 },
    courier: { label: 'Countrywide Courier', fee: 450 },
} as const;

export const PAYMENT_METHODS = ['mpesa', 'card', 'cod'] as const;

export class CheckoutItemDto {
    @IsUUID()
    productId: string;

    @IsInt()
    @Min(1)
    @Max(99)
    quantity: number;
}

/**
 * Shopper checkout body. Deliberately carries NO prices — the gateway
 * re-prices every item from the product service so the client can't
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

    @IsIn(Object.keys(DELIVERY_METHODS))
    deliveryMethod: keyof typeof DELIVERY_METHODS;

    @IsIn(PAYMENT_METHODS)
    paymentMethod: (typeof PAYMENT_METHODS)[number];

    @IsOptional()
    @IsString()
    @MaxLength(500)
    note?: string;
}
