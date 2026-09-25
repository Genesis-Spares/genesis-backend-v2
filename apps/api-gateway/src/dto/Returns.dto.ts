import { Transform, Type } from 'class-transformer';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, IsUUID, Matches, Max, MaxLength, Min, ValidateNested } from 'class-validator';

const trim = ({ value }: { value: unknown }) => (typeof value === 'string' ? value.trim() : value);

export class CancelOrderBodyDto {
    @Transform(trim) @IsOptional() @IsString() @MaxLength(300)
    reason?: string;
}

class ReturnLineDto {
    @IsUUID()
    orderItemId: string;

    @IsInt() @Min(1) @Max(99)
    quantity: number;
}

export class CreateReturnDto {
    @IsArray() @ArrayMinSize(1) @ArrayMaxSize(50) @ValidateNested({ each: true }) @Type(() => ReturnLineDto)
    items: ReturnLineDto[];

    @IsIn(['WRONG_PART', 'DOESNT_FIT', 'DAMAGED', 'FAULTY', 'NOT_AS_DESCRIBED', 'CHANGED_MIND'])
    reason: 'WRONG_PART' | 'DOESNT_FIT' | 'DAMAGED' | 'FAULTY' | 'NOT_AS_DESCRIBED' | 'CHANGED_MIND';

    @Transform(trim) @IsOptional() @IsString() @MaxLength(2000)
    details?: string;

    /** Only images uploaded to our Cloudinary account — no arbitrary links. */
    @IsOptional() @IsArray() @ArrayMaxSize(4)
    @IsString({ each: true })
    @Matches(/^https:\/\/res\.cloudinary\.com\/[\w-]+\/image\/upload\/[\w\-./]+$/, { each: true, message: 'photos must be uploaded images' })
    photos?: string[];

    @IsOptional() @IsIn(['REFUND', 'EXCHANGE'])
    resolution?: 'REFUND' | 'EXCHANGE';
}

export class ApproveReturnDto {
    @Transform(trim) @IsOptional() @IsString() @MaxLength(1000)
    instructions?: string;
}

export class RejectReturnDto {
    @Transform(trim) @IsString() @MaxLength(1000)
    reason: string;
}

export class ReceiveReturnDto {
    @IsBoolean()
    restock: boolean;

    @Transform(trim) @IsOptional() @IsString() @MaxLength(1000)
    note?: string;
}

export class RefundReturnDto {
    @IsNumber({ maxDecimalPlaces: 2 }) @Min(0.01)
    amount: number;

    @Transform(trim) @IsOptional() @IsString() @MaxLength(1000)
    note?: string;
}
