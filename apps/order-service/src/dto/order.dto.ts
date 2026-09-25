// apps/order-service/src/dto/order.dto.ts
import {
    IsString,
    IsEmail,
    IsOptional,
    IsUUID,
    IsBoolean,
    IsArray,
    IsEnum,
    IsNumber,
    IsInt,
    Min,
    ValidateNested,
    ArrayMinSize,
    IsPhoneNumber,
    IsObject,
    IsDateString,
    MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export const ORDER_STATUSES = [
    'PENDING',
    'CONFIRMED',
    'PROCESSING',
    'SHIPPED',
    'DELIVERED',
    'CANCELLED',
    'REFUNDED',
] as const;

export const PAYMENT_STATUSES = [
    'PENDING',
    'PAID',
    'FAILED',
    'REFUNDED',
    'PARTIALLY_REFUNDED',
] as const;

export class OrderAddressDto {
    @IsString()
    @IsOptional()
    label?: string;

    @IsString()
    fullName: string;

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
    @IsOptional()
    postalCode?: string;

    @IsString()
    country: string;

    @IsPhoneNumber()
    @IsOptional()
    phone?: string;
}

export class OrderItemInputDto {
    @IsUUID()
    productId: string;

    @IsString()
    @IsOptional()
    variantId?: string;

    @IsString()
    sku: string;

    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    image?: string;

    @IsNumber()
    @Min(0)
    unitPrice: number;

    /** cost price at the time of sale — for profit reporting */
    @IsNumber()
    @Min(0)
    @IsOptional()
    unitCost?: number;

    /** per-unit weight, used to price delivery; not stored on the line */
    @IsNumber()
    @Min(0)
    @IsOptional()
    weightKg?: number;

    @IsInt()
    @Min(1)
    quantity: number;

    @IsObject()
    @IsOptional()
    attributes?: Record<string, unknown>;
}

export class CreateOrderDto {
    @IsUUID()
    customerId: string;

    @IsEmail()
    customerEmail: string;

    @IsString()
    customerName: string;

    @IsPhoneNumber()
    @IsOptional()
    customerPhone?: string;

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => OrderItemInputDto)
    items: OrderItemInputDto[];

    @ValidateNested()
    @Type(() => OrderAddressDto)
    shippingAddress: OrderAddressDto;

    @ValidateNested()
    @Type(() => OrderAddressDto)
    @IsOptional()
    billingAddress?: OrderAddressDto;

    @IsString()
    @IsOptional()
    paymentMethod?: string;

    @IsString()
    @IsOptional()
    currency?: string;

    @IsNumber()
    @Min(0)
    @IsOptional()
    taxAmount?: number;

    @IsNumber()
    @Min(0)
    @IsOptional()
    shippingAmount?: number;

    @IsNumber()
    @Min(0)
    @IsOptional()
    discountAmount?: number;

    @IsString()
    @IsOptional()
    couponCode?: string;

    @IsString()
    @IsOptional()
    customerNote?: string;
}

export class UpdateOrderDto {
    @ValidateNested()
    @Type(() => OrderAddressDto)
    @IsOptional()
    shippingAddress?: OrderAddressDto;

    @ValidateNested()
    @Type(() => OrderAddressDto)
    @IsOptional()
    billingAddress?: OrderAddressDto;

    @IsString()
    @IsOptional()
    paymentMethod?: string;

    @IsString()
    @IsOptional()
    customerNote?: string;

    @IsString()
    @IsOptional()
    couponCode?: string;
}

/** Who made a change — filled in by the gateway from the admin's JWT, never trusted from the browser. */
class ActorFields {
    @IsUUID()
    @IsOptional()
    changedBy?: string;

    @IsString()
    @IsOptional()
    @MaxLength(200)
    actor?: string;
}

export class UpdateOrderStatusDto extends ActorFields {
    @IsEnum(ORDER_STATUSES)
    status: (typeof ORDER_STATUSES)[number];

    /** Message for the timeline. Defaults to a customer-friendly line per status. */
    @IsString()
    @IsOptional()
    @MaxLength(500)
    note?: string;

    @IsString()
    @IsOptional()
    @MaxLength(120)
    location?: string;

    /** false = internal entry, hidden from the customer's tracker. Default true. */
    @IsBoolean()
    @IsOptional()
    isPublic?: boolean;

    // SHIPPED — dispatch details (carrier is required, either here or already on the order)
    @IsString()
    @IsOptional()
    @MaxLength(80)
    trackingCarrier?: string;

    @IsString()
    @IsOptional()
    @MaxLength(80)
    trackingNumber?: string;

    @IsDateString()
    @IsOptional()
    estimatedDeliveryAt?: string;

    /** DELIVERED — cash/POS collected on delivery; marks a PENDING payment as PAID. */
    @IsBoolean()
    @IsOptional()
    paymentCollected?: boolean;
}

export class UpdatePaymentStatusDto extends ActorFields {
    @IsEnum(PAYMENT_STATUSES)
    paymentStatus: (typeof PAYMENT_STATUSES)[number];

    @IsString()
    @IsOptional()
    paymentMethod?: string;

    @IsString()
    @IsOptional()
    @MaxLength(500)
    note?: string;
}

export class UpdateTrackingDto extends ActorFields {
    @IsString()
    @IsOptional()
    @MaxLength(80)
    trackingNumber?: string;

    @IsString()
    @IsOptional()
    @MaxLength(80)
    trackingCarrier?: string;

    @IsDateString()
    @IsOptional()
    estimatedDeliveryAt?: string;
}

/** A shipment / progress update that doesn't change the order status. */
export class AddTrackingEventDto extends ActorFields {
    @IsString()
    @MaxLength(500)
    note: string;

    @IsString()
    @IsOptional()
    @MaxLength(120)
    location?: string;

    @IsBoolean()
    @IsOptional()
    isPublic?: boolean;
}

export class CancelOrderDto extends ActorFields {
    @IsString()
    @IsOptional()
    @MaxLength(500)
    reason?: string;
}

export class CreateOrderNoteDto {
    @IsString()
    content: string;

    @IsUUID()
    authorId: string;

    @IsBoolean()
    @IsOptional()
    isInternal?: boolean;
}

export class UpdateOrderNoteDto {
    @IsString()
    @IsOptional()
    content?: string;

    @IsBoolean()
    @IsOptional()
    isInternal?: boolean;
}

export class OrderQueryDto {
    /** Orders containing this product (used by the dashboard's product view). */
    @IsUUID()
    @IsOptional()
    productId?: string;

    @IsString()
    @IsOptional()
    search?: string;

    @IsString()
    @IsOptional()
    @IsEnum(ORDER_STATUSES)
    status?: (typeof ORDER_STATUSES)[number];

    @IsString()
    @IsOptional()
    @IsEnum(PAYMENT_STATUSES)
    paymentStatus?: (typeof PAYMENT_STATUSES)[number];

    @IsUUID()
    @IsOptional()
    customerId?: string;

    @IsString()
    @IsOptional()
    dateFrom?: string;

    @IsString()
    @IsOptional()
    dateTo?: string;

    @IsString()
    @IsOptional()
    sortBy?: 'createdAt' | 'total' | 'status' | 'orderNumber';

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
