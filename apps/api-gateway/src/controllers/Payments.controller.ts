import { Body, Controller, HttpCode, Inject, Logger, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { rpc } from '../common/utils/rpc.util';

/**
 * Safaricom Daraja posts STK push results here (public, no JWT). The secret
 * path segment (MPESA_CALLBACK_SECRET) is checked by the order service.
 * Daraja doesn't retry on errors, so always acknowledge.
 */
@Controller('payments')
export class PaymentsController {
    private readonly logger = new Logger(PaymentsController.name);

    constructor(@Inject('ORDER_SERVICE') private readonly orderClient: ClientProxy) { }

    @Post('mpesa/callback/:secret')
    @HttpCode(200)
    async mpesaCallback(@Param('secret') secret: string, @Body() body: unknown) {
        await rpc(this.orderClient, 'payment.mpesa.callback', { secret, body }).catch((e) =>
            this.logger.error(`M-Pesa callback could not be processed: ${(e as Error)?.message}`),
        );
        return { ResultCode: 0, ResultDesc: 'Accepted' };
    }
}
