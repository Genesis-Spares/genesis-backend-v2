import { Body, Controller, Get, HttpException, HttpStatus, Inject, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Transform, Type } from 'class-transformer';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsEmail, IsIn, IsInt, IsNumber, IsOptional, IsString, IsUUID, MaxLength, Min, ValidateIf, ValidateNested } from 'class-validator';
import { catchError, firstValueFrom } from 'rxjs';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../common/guards/permissions.guard';
import { Permissions } from '../common/decorators/permissions.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { type JwtPayload } from '../common/types/jwt-payload.type';

const trim = ({ value }: { value: unknown }) => (typeof value === 'string' ? value.trim() : value);

class AdjustDto {
    @IsUUID() productId: string;
    @IsIn(['CHANGE', 'SET']) mode: 'CHANGE' | 'SET';
    @IsInt() quantity: number;
    @IsIn(['COUNT', 'DAMAGED', 'LOST', 'FOUND', 'OTHER']) reason: 'COUNT' | 'DAMAGED' | 'LOST' | 'FOUND' | 'OTHER';
    @Transform(trim) @IsOptional() @IsString() @MaxLength(300) note?: string;
}

class ReceiveLineDto {
    @IsOptional() @IsUUID() productId?: string;
    @ValidateIf((o) => !o.productId) @IsString() @MaxLength(80) sku?: string;
    @IsInt() @Min(1) quantity: number;
    @IsOptional() @IsNumber({ maxDecimalPlaces: 2 }) @Min(0) unitCost?: number;
}

class ReceiveDto {
    @IsOptional() @IsUUID() supplierId?: string;
    @Transform(trim) @IsOptional() @IsString() @MaxLength(120) supplierName?: string;
    @Transform(trim) @IsOptional() @IsString() @MaxLength(80) supplierRef?: string;
    @Transform(trim) @IsOptional() @IsString() @MaxLength(500) note?: string;
    @IsOptional() @IsBoolean() updateCost?: boolean;
    @IsArray() @ArrayMinSize(1) @ArrayMaxSize(500) @ValidateNested({ each: true }) @Type(() => ReceiveLineDto) lines: ReceiveLineDto[];
}

class BulkLineDto {
    @IsString() @MaxLength(80) sku: string;
    @IsInt() quantity: number;
    @IsOptional() @IsNumber({ maxDecimalPlaces: 2 }) @Min(0) unitCost?: number;
}

class BulkDto {
    @IsIn(['RECEIVE', 'SET']) mode: 'RECEIVE' | 'SET';
    @IsOptional() @IsBoolean() dryRun?: boolean;
    @IsOptional() @IsUUID() supplierId?: string;
    @Transform(trim) @IsOptional() @IsString() @MaxLength(120) supplierName?: string;
    @Transform(trim) @IsOptional() @IsString() @MaxLength(80) supplierRef?: string;
    @Transform(trim) @IsOptional() @IsString() @MaxLength(500) note?: string;
    @IsArray() @ArrayMinSize(1) @ArrayMaxSize(5000) @ValidateNested({ each: true }) @Type(() => BulkLineDto) lines: BulkLineDto[];
}

class SupplierDto {
    @Transform(trim) @IsString() @MaxLength(120) name: string;
    @Transform(trim) @IsOptional() @IsString() @MaxLength(120) contactName?: string;
    @Transform(trim) @IsOptional() @IsString() @MaxLength(30) phone?: string;
    @Transform(trim) @IsOptional() @IsEmail() @MaxLength(160) email?: string;
    @Transform(trim) @IsOptional() @IsString() @MaxLength(500) notes?: string;
    @IsOptional() @IsBoolean() isActive?: boolean;
}

/**
 * Staff inventory: stock levels, movement log, adjustments, deliveries (GRNs),
 * CSV bulk updates and suppliers. Everything needs product:update — cost
 * prices and supplier details aren't for customers (who have product:read).
 */
@Controller('inventory')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Permissions('product:update')
export class InventoryController {
    constructor(@Inject('PRODUCT_SERVICE') private readonly productClient: ClientProxy) { }

    private forward(pattern: string, payload: unknown) {
        return firstValueFrom(
            this.productClient.send(pattern, payload).pipe(
                catchError((error) => {
                    const status = typeof error?.statusCode === 'number' ? error.statusCode : HttpStatus.INTERNAL_SERVER_ERROR;
                    throw new HttpException({ statusCode: status, message: error?.message || 'Inventory service error', error: error?.error || HttpStatus[status] }, status);
                }),
            ),
        );
    }

    @Get('levels')
    levels(@Query('filter') filter?: string, @Query('search') search?: string, @Query('page') page?: string, @Query('limit') limit?: string) {
        return this.forward('inventory.levels', { filter: ['low', 'out'].includes(filter ?? '') ? filter : 'all', search: search || undefined, page: Number(page) || 1, limit: Number(limit) || 50 });
    }

    @Get('movements')
    movements(@Query('productId') productId?: string, @Query('reason') reason?: string, @Query('search') search?: string,
        @Query('from') from?: string, @Query('to') to?: string, @Query('page') page?: string, @Query('limit') limit?: string) {
        return this.forward('inventory.movements.list', { productId: productId || undefined, reason: reason || undefined, search: search || undefined, from: from || undefined, to: to || undefined, page: Number(page) || 1, limit: Number(limit) || 50 });
    }

    @Get('export')
    export() {
        return this.forward('inventory.export', {});
    }

    @Post('adjust')
    adjust(@CurrentUser() u: JwtPayload, @Body() dto: AdjustDto) {
        return this.forward('inventory.adjust', { ...dto, actor: u.email });
    }

    @Post('receipts')
    receive(@CurrentUser() u: JwtPayload, @Body() dto: ReceiveDto) {
        return this.forward('inventory.receive', { ...dto, actor: u.email });
    }

    @Get('receipts')
    receipts(@Query('supplierId') supplierId?: string, @Query('page') page?: string, @Query('limit') limit?: string) {
        return this.forward('inventory.receipts', { supplierId: supplierId || undefined, page: Number(page) || 1, limit: Number(limit) || 20 });
    }

    @Post('bulk')
    bulk(@CurrentUser() u: JwtPayload, @Body() dto: BulkDto) {
        return this.forward('inventory.bulk', { ...dto, actor: u.email });
    }

    @Get('suppliers')
    suppliers() {
        return this.forward('supplier.list', {});
    }

    @Post('suppliers')
    createSupplier(@Body() dto: SupplierDto) {
        return this.forward('supplier.save', dto);
    }

    @Put('suppliers/:id')
    updateSupplier(@Param('id', ParseUUIDPipe) id: string, @Body() dto: SupplierDto) {
        return this.forward('supplier.save', { ...dto, id });
    }
}
