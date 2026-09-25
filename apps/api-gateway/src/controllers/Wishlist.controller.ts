import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Inject,
    Param,
    Post,
    UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { type JwtPayload } from '../common/types/jwt-payload.type';

/**
 * Shopper wishlist. Any authenticated user (a logged-in shopper) can manage
 * their own default wishlist — scoped to their JWT `sub`, no extra permission.
 */
@Controller('wishlist')
@UseGuards(JwtAuthGuard)
export class WishlistController {
    constructor(
        @Inject('PRODUCT_SERVICE') private readonly productClient: ClientProxy,
    ) { }

    @Get()
    async get(@CurrentUser() user: JwtPayload) {
        return this.forward('wishlist.get', { userId: user.sub });
    }

    @Post()
    async add(@CurrentUser() user: JwtPayload, @Body() body: { productId: string }) {
        return this.forward('wishlist.add', { userId: user.sub, productId: body.productId });
    }

    @Delete(':productId')
    async remove(@CurrentUser() user: JwtPayload, @Param('productId') productId: string) {
        return this.forward('wishlist.remove', { userId: user.sub, productId });
    }

    @Delete()
    async clear(@CurrentUser() user: JwtPayload) {
        return this.forward('wishlist.clear', { userId: user.sub });
    }

    private forward(pattern: string, payload: unknown) {
        return firstValueFrom(
            this.productClient.send(pattern, payload).pipe(
                catchError((error) => {
                    const status =
                        typeof error?.statusCode === 'number'
                            ? error.statusCode
                            : typeof error?.status === 'number'
                                ? error.status
                                : HttpStatus.INTERNAL_SERVER_ERROR;
                    const message = error?.message || 'Wishlist service error';
                    throw new HttpException(
                        {
                            statusCode: status,
                            message,
                            error: error?.error || HttpStatus[status] || 'Error',
                            timestamp: new Date().toISOString(),
                            path: pattern,
                        },
                        status,
                    );
                }),
            ),
        );
    }
}
