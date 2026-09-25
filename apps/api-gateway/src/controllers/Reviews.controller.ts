import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, ParseUUIDPipe, Patch, Put, Query, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Transform } from 'class-transformer';
import { IsBoolean, IsIn, IsInt, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';
import { catchError, firstValueFrom } from 'rxjs';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../common/guards/permissions.guard';
import { Permissions } from '../common/decorators/permissions.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { type JwtPayload } from '../common/types/jwt-payload.type';

const trim = ({ value }: { value: unknown }) => (typeof value === 'string' ? value.trim() : value);

class ReviewBodyDto {
    @IsInt() @Min(1) @Max(5)
    rating: number;

    @Transform(trim) @IsOptional() @IsString() @MaxLength(120)
    title?: string;

    @Transform(trim) @IsOptional() @IsString() @MaxLength(2000)
    content?: string;

    /** e.g. "2015 Toyota Fielder" */
    @Transform(trim) @IsOptional() @IsString() @MaxLength(80)
    vehicle?: string;

    @IsOptional() @IsBoolean()
    fitted?: boolean;

    /** How the reviewer is shown ("Jane W.") — their own name from their profile. */
    @Transform(trim) @IsOptional() @IsString() @MaxLength(40)
    firstName?: string;

    @Transform(trim) @IsOptional() @IsString() @MaxLength(40)
    lastName?: string;
}

class ModerateDto {
    @IsIn(['PUBLISHED', 'HIDDEN'])
    status: 'PUBLISHED' | 'HIDDEN';

    @Transform(trim) @IsOptional() @IsString() @MaxLength(300)
    reason?: string;
}

function forward(client: ClientProxy, pattern: string, payload: unknown) {
    return firstValueFrom(
        client.send(pattern, payload).pipe(
            catchError((error) => {
                const status = typeof error?.statusCode === 'number' ? error.statusCode : HttpStatus.INTERNAL_SERVER_ERROR;
                throw new HttpException({ statusCode: status, message: error?.message || 'Review service error', error: error?.error || HttpStatus[status] }, status);
            }),
        ),
    );
}

/** A shopper's own reviews — always scoped to the JWT user. */
@Controller('me/reviews')
@UseGuards(JwtAuthGuard)
export class MyReviewsController {
    constructor(@Inject('PRODUCT_SERVICE') private readonly productClient: ClientProxy) { }

    @Get(':productId/eligibility')
    eligibility(@CurrentUser() user: JwtPayload, @Param('productId', ParseUUIDPipe) productId: string) {
        return forward(this.productClient, 'review.eligibility', { userId: user.sub, productId });
    }

    @Put(':productId')
    upsert(@CurrentUser() user: JwtPayload, @Param('productId', ParseUUIDPipe) productId: string, @Body() dto: ReviewBodyDto) {
        return forward(this.productClient, 'review.upsert', { ...dto, productId, userId: user.sub });
    }

    @Delete(':productId')
    remove(@CurrentUser() user: JwtPayload, @Param('productId', ParseUUIDPipe) productId: string) {
        return forward(this.productClient, 'review.delete.own', { userId: user.sub, productId });
    }
}

/** Staff moderation. Reading needs review:read; hiding/showing needs review:delete (managers+). */
@Controller('reviews')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class AdminReviewsController {
    constructor(@Inject('PRODUCT_SERVICE') private readonly productClient: ClientProxy) { }

    @Get()
    @Permissions('review:read')
    list(
        @Query('status') status?: string,
        @Query('rating') rating?: string,
        @Query('search') search?: string,
        @Query('productId') productId?: string,
        @Query('page') page?: string,
        @Query('limit') limit?: string,
    ) {
        return forward(this.productClient, 'review.list.all', {
            status: ['PUBLISHED', 'HIDDEN'].includes(status ?? '') ? status : undefined,
            rating: Number(rating) || undefined,
            search: search || undefined,
            productId: productId || undefined,
            page: Number(page) || 1,
            limit: Number(limit) || 20,
        });
    }

    @Patch(':id')
    @Permissions('review:delete')
    moderate(@Param('id', ParseUUIDPipe) id: string, @Body() dto: ModerateDto) {
        return forward(this.productClient, 'review.moderate', { id, status: dto.status, reason: dto.reason });
    }
}
