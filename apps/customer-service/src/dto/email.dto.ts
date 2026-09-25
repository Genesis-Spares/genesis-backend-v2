import { Type } from 'class-transformer';
import {
    ArrayMaxSize,
    IsArray,
    IsBoolean,
    IsEmail,
    IsInt,
    IsOptional,
    IsString,
    IsUUID,
    IsUrl,
    MaxLength,
    Min,
    ValidateNested,
} from 'class-validator';

export class EmailRecipientInputDto {
    @IsOptional()
    @IsUUID()
    customerId?: string;

    @IsEmail()
    @MaxLength(254)
    email: string;

    @IsOptional()
    @IsString()
    @MaxLength(120)
    name?: string;
}

export class EmailAttachmentDto {
    @IsString()
    @MaxLength(200)
    name: string;

    @IsUrl({ require_protocol: true, require_tld: false })
    @MaxLength(1000)
    url: string;

    @IsOptional()
    @IsInt()
    @Min(0)
    size?: number;

    @IsOptional()
    @IsString()
    @MaxLength(120)
    type?: string;
}

/** Create or update a draft. Every field is optional so drafts can be saved half-written. */
export class SaveEmailDto {
    @IsOptional()
    @IsString()
    @MaxLength(250)
    subject?: string;

    @IsOptional()
    @IsString()
    @MaxLength(500_000)
    html?: string;

    @IsOptional()
    @IsArray()
    @ArrayMaxSize(500)
    @ValidateNested({ each: true })
    @Type(() => EmailRecipientInputDto)
    recipients?: EmailRecipientInputDto[];

    @IsOptional()
    @IsArray()
    @ArrayMaxSize(20)
    @IsEmail({}, { each: true })
    cc?: string[];

    @IsOptional()
    @IsArray()
    @ArrayMaxSize(20)
    @IsEmail({}, { each: true })
    bcc?: string[];

    @IsOptional()
    @IsArray()
    @ArrayMaxSize(10)
    @ValidateNested({ each: true })
    @Type(() => EmailAttachmentDto)
    attachments?: EmailAttachmentDto[];

    @IsOptional()
    @IsBoolean()
    branded?: boolean;

    @IsOptional()
    @IsBoolean()
    marketing?: boolean;
}
