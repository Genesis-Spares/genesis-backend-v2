import { Type } from 'class-transformer';
import { ArrayMaxSize, IsArray, IsBoolean, IsOptional, IsString, IsUUID, MaxLength, ValidateNested } from 'class-validator';

export class MarkReadDto {
    @IsOptional()
    @IsArray()
    @ArrayMaxSize(100)
    @IsUUID('4', { each: true })
    ids?: string[];

    @IsOptional()
    @IsBoolean()
    all?: boolean;
}

class PushKeysDto {
    @IsString()
    @MaxLength(200)
    p256dh!: string;

    @IsString()
    @MaxLength(100)
    auth!: string;
}

/** The browser's PushSubscription.toJSON() */
export class PushSubscriptionDto {
    @IsString()
    @MaxLength(1000)
    endpoint!: string;

    @ValidateNested()
    @Type(() => PushKeysDto)
    keys!: PushKeysDto;
}

export class PushUnsubscribeDto {
    @IsString()
    @MaxLength(1000)
    endpoint!: string;
}
