import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Inject,
    Param,
    ParseUUIDPipe,
    Put,
    UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Type } from 'class-transformer';
import { ArrayMaxSize, IsArray, IsInt, IsUUID, Max, Min, ValidateNested } from 'class-validator';
import { catchError, firstValueFrom } from 'rxjs';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../common/guards/permissions.guard';
import { Permissions } from '../common/decorators/permissions.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { type JwtPayload } from '../common/types/jwt-payload.type';

class CartLineDto {
    @IsUUID()
    productId: string;

    @IsInt()
    @Min(1)
    @Max(99)
    quantity: number;
}

class ReplaceCartDto {
    @IsArray()
    @ArrayMaxSize(100)
    @ValidateNested({ each: true })
    @Type(() => CartLineDto)
    items: CartLineDto[];
}

/**
 * Server copy of a signed-in shopper's cart. The storefront PUTs its whole
 * cart after each change; admins can read any customer's cart by user id.
 */
@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
    constructor(@Inject('PRODUCT_SERVICE') private readonly productClient: ClientProxy) { }

    @Get()
    get(@CurrentUser() user: JwtPayload) {
        return this.forward('cart.get', { userId: user.sub });
    }

    @Put()
    replace(@CurrentUser() user: JwtPayload, @Body() dto: ReplaceCartDto) {
        return this.forward('cart.replace', { userId: user.sub, items: dto.items });
    }

    @Delete()
    clear(@CurrentUser() user: JwtPayload) {
        return this.forward('cart.clear', { userId: user.sub });
    }

    /** Admin: a customer's current cart (userId = auth user id, i.e. customer.userId). */
    @Get('user/:userId')
    @UseGuards(PermissionsGuard)
    @Permissions('customer:read')
    getForUser(@Param('userId', ParseUUIDPipe) userId: string) {
        return this.forward('cart.get', { userId });
    }

    private forward(pattern: string, payload: unknown) {
        return firstValueFrom(
            this.productClient.send(pattern, payload).pipe(
                catchError((error) => {
                    const status = typeof error?.statusCode === 'number' ? error.statusCode : HttpStatus.INTERNAL_SERVER_ERROR;
                    throw new HttpException(
                        { statusCode: status, message: error?.message || 'Cart service error', error: error?.error || HttpStatus[status], path: pattern },
                        status,
                    );
                }),
            ),
        );
    }
}
