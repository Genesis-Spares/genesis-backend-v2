// apps/customer-service/src/dto/message.dto.ts
import { IsString, IsEmail, IsOptional, IsUUID, IsEnum, IsBoolean, IsNumber, MaxLength, MinLength, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';

export const MESSAGE_STATUSES = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'] as const;
export const MESSAGE_PRIORITIES = ['LOW', 'NORMAL', 'HIGH', 'URGENT'] as const;

// No authentication is required to hit the create endpoint (see the gateway's
// Message.controller.ts) — this is the shape a public "contact us" form
// would submit, so customerId is optional and everything else is captured
// directly rather than requiring an account.
export class CreateMessageDto {
    @IsUUID()
    @IsOptional()
    customerId?: string;

    @IsString()
    customerName: string;

    @IsEmail()
    customerEmail: string;

    @IsString()
    @IsOptional()
    customerPhone?: string;

    @IsString()
    subject: string;

    @IsString()
    body: string;

    @IsEnum(MESSAGE_PRIORITIES)
    @IsOptional()
    priority?: (typeof MESSAGE_PRIORITIES)[number];

    @IsUUID()
    @IsOptional()
    orderId?: string;

    @IsString()
    @IsOptional()
    orderNumber?: string;
}

export class ReplyMessageDto {
    @IsString()
    @MinLength(1)
    @MaxLength(5000)
    body: string;

    /** Display name/email of the author — set by the gateway from the JWT. */
    @IsString()
    @IsOptional()
    @MaxLength(200)
    authorName?: string;

    @IsUUID()
    authorId: string;

    // true = an internal staff note, not sent/visible to the customer.
    @IsBoolean()
    @IsOptional()
    isInternal?: boolean;
}

export class UpdateMessageStatusDto {
    @IsEnum(MESSAGE_STATUSES)
    status: (typeof MESSAGE_STATUSES)[number];

    @IsUUID()
    @IsOptional()
    assignedTo?: string;
}

/**
 * Partial update from the dashboard. `null` clears assignee / linked order.
 * assignedToName / actor fields are set by the gateway, not the browser.
 */
export class UpdateMessageDto {
    @IsEnum(MESSAGE_STATUSES)
    @IsOptional()
    status?: (typeof MESSAGE_STATUSES)[number];

    @IsEnum(MESSAGE_PRIORITIES)
    @IsOptional()
    priority?: (typeof MESSAGE_PRIORITIES)[number];

    @ValidateIf((_, v) => v !== null)
    @IsUUID()
    @IsOptional()
    assignedTo?: string | null;

    @IsString()
    @IsOptional()
    @MaxLength(200)
    assignedToName?: string | null;

    @ValidateIf((_, v) => v !== null)
    @IsString()
    @IsOptional()
    @MaxLength(40)
    orderNumber?: string | null;

    @ValidateIf((_, v) => v !== null)
    @IsUUID()
    @IsOptional()
    orderId?: string | null;
}

export class MessageQueryDto {
    @IsString()
    @IsOptional()
    search?: string;

    @IsString()
    @IsOptional()
    @IsEnum(MESSAGE_STATUSES)
    status?: (typeof MESSAGE_STATUSES)[number];

    @IsString()
    @IsOptional()
    @IsEnum(MESSAGE_PRIORITIES)
    priority?: (typeof MESSAGE_PRIORITIES)[number];

    @IsString()
    @IsOptional()
    sortBy?: 'createdAt' | 'updatedAt' | 'priority';

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

    /** a staff user id, or "none" for unassigned */
    @IsString()
    @IsOptional()
    assignedTo?: string;
}
