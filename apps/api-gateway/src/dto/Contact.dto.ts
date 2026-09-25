import { Transform } from 'class-transformer';
import { IsEmail, IsIn, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export const CONTACT_TOPICS = [
    'Parts enquiry',
    'Fitment question',
    'Order / delivery',
    'Trade account',
    'Returns & warranty',
    'Something else',
] as const;

const trim = ({ value }: { value: unknown }) => (typeof value === 'string' ? value.trim() : value);

/**
 * Public storefront "Contact us" form. Only visitor-safe fields: priority,
 * customer link and status are decided server-side, never by the sender.
 */
export class ContactMessageDto {
    @Transform(trim) @IsString() @MinLength(2) @MaxLength(100)
    name: string;

    @Transform(trim) @IsEmail() @MaxLength(160)
    email: string;

    @Transform(trim) @IsOptional() @IsString() @MaxLength(20)
    phone?: string;

    @IsIn(CONTACT_TOPICS)
    topic: (typeof CONTACT_TOPICS)[number];

    @Transform(trim) @IsString() @MinLength(10, { message: 'Please write a little more detail (at least 10 characters).' }) @MaxLength(3000)
    message: string;

    @Transform(trim) @IsOptional() @IsString() @MaxLength(40)
    orderNumber?: string;

    /** Honeypot — hidden from humans; bots fill it in. */
    @IsOptional() @IsString() @MaxLength(200)
    website?: string;
}
