import { Body, Controller, Get, HttpCode, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { QuoteDto } from '../dto/Checkout.dto';
import { priceCartItems, rpc } from '../common/utils/rpc.util';

/**
 * Public checkout helpers — NO authentication, so the cart page can show
 * delivery and VAT to guests too. Prices always come from the catalogue.
 */
@Controller('checkout')
export class CheckoutController {
    constructor(
        @Inject('ORDER_SERVICE') private readonly orderClient: ClientProxy,
        @Inject('PRODUCT_SERVICE') private readonly productClient: ClientProxy,
    ) { }

    /** Delivery zones (with the towns they cover) and the VAT rate. */
    @Get('delivery-zones')
    deliveryZones() {
        return rpc(this.orderClient, 'pricing.zones.public', {});
    }

    /** Subtotal, delivery, VAT and total for a cart delivered to `city`. */
    @Post('quote')
    @HttpCode(200)
    async quote(@Body() dto: QuoteDto) {
        const items = await priceCartItems(this.productClient, dto.items);
        return rpc(this.orderClient, 'pricing.quote', {
            city: dto.city,
            items: items.map((i) => ({ unitPrice: i.unitPrice, quantity: i.quantity, weightKg: i.weightKg })),
        });
    }
}
