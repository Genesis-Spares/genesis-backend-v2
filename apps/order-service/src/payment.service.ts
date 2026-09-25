import { timingSafeEqual } from 'crypto';
import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from '../libs/prisma/prisma.service';
import { Payment } from './generated/prisma';
import { OrderService } from './order.service';
import { MpesaClient, MpesaError, type StkCallbackBody } from './mpesa.client';

/** Don't let a shopper fire a second prompt while the first is on their screen. */
const PROMPT_COOLDOWN_MS = 60_000;
/** Callbacks usually land within seconds; after this, ask Daraja directly. */
const QUERY_AFTER_MS = 20_000;
const QUERY_EVERY_MS = 10_000;
const SWEEP_EVERY_MS = 60_000;

/** "+254 712 345 678" / "0712345678" / "254712345678" → "254712345678"; null if not a Kenyan mobile. */
export function toMsisdn(raw?: string | null): string | null {
    const d = (raw ?? '').replace(/[\s\-()+]/g, '');
    if (/^0[17]\d{8}$/.test(d)) return '254' + d.slice(1);
    if (/^254[17]\d{8}$/.test(d)) return d;
    if (/^[17]\d{8}$/.test(d)) return '254' + d;
    return null;
}

const maskPhone = (p: string) => (p.length > 7 ? `${p.slice(0, 4)}•••${p.slice(-3)}` : p);

@Injectable()
export class PaymentService implements OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger(PaymentService.name);
    private timer?: NodeJS.Timeout;
    private sweeping = false;

    constructor(
        private readonly prisma: PrismaService,
        private readonly orders: OrderService,
        private readonly mpesa: MpesaClient,
        private readonly config: ConfigService,
    ) { }

    onModuleInit() {
        this.mpesa.onMockCallback = (body) => this.applyCallback(body);
        this.timer = setInterval(() => void this.sweep(), SWEEP_EVERY_MS);
    }

    onModuleDestroy() {
        clearInterval(this.timer);
    }

    private fail(statusCode: number, message: string): never {
        throw new RpcException({ statusCode, message, error: statusCode === 404 ? 'Not Found' : statusCode === 409 ? 'Conflict' : 'Bad Request' });
    }

    /** What the shopper (and the order screen) sees — no Daraja internals. */
    view(p: Payment | null | undefined, message?: string) {
        if (!p) return null;
        return {
            id: p.id,
            status: p.status,
            amount: Number(p.amount),
            currency: p.currency,
            phone: maskPhone(p.phone),
            receiptNumber: p.receiptNumber,
            message: message ?? (p.status === 'PENDING' ? 'Check your phone and enter your M-Pesa PIN' : p.resultDesc),
            createdAt: p.createdAt,
            paidAt: p.paidAt,
        };
    }

    /**
     * Send (or re-send) the STK prompt for an unpaid M-Pesa order. Gateway
     * failures don't throw — they come back as a FAILED payment the shopper
     * can retry, since the order itself already exists.
     */
    async startMpesa(orderId: string, opts: { customerId?: string; phone?: string } = {}) {
        const order = await this.prisma.order.findUnique({
            where: { id: orderId },
            include: { payments: { orderBy: { createdAt: 'desc' }, take: 1 } },
        });
        if (!order || (opts.customerId && order.customerId !== opts.customerId)) this.fail(404, 'Order not found');
        if (order.paymentMethod !== 'mpesa') this.fail(400, 'This order is not paid with M-Pesa');
        if (order.paymentStatus === 'PAID') this.fail(400, 'This order is already paid');
        if (order.status !== 'PENDING') this.fail(400, 'This order can no longer be paid');
        if (order.paymentDueAt && order.paymentDueAt < new Date()) this.fail(400, 'The time to pay for this order has run out');

        const last = order.payments[0];
        if (last?.status === 'PENDING') {
            // the earlier prompt may still be paid — never risk charging twice
            const settled = await this.reconcile(last);
            if (settled?.status === 'SUCCESS') return { payment: this.view(settled), paid: true };
            if (!settled || settled.status === 'PENDING') {
                if (Date.now() - last.createdAt.getTime() < PROMPT_COOLDOWN_MS) {
                    this.fail(409, 'A payment prompt was just sent to your phone. Complete it, or wait a minute to resend.');
                }
                await this.prisma.payment.update({ where: { id: last.id }, data: { status: 'FAILED', resultDesc: 'Replaced by a new payment prompt' } });
            }
        }

        const phone = toMsisdn(opts.phone ?? order.customerPhone);
        if (!phone) this.fail(400, 'Enter a Safaricom number, e.g. 0712 345 678');

        // M-Pesa only moves whole shillings
        const amount = Math.ceil(Number(order.total));
        const payment = await this.prisma.payment.create({ data: { orderId, amount, phone, currency: order.currency } });
        try {
            const r = await this.mpesa.stkPush({
                amount,
                phone,
                accountReference: order.orderNumber.replace(/^GNS-/, '').replace(/-/g, ''),
                description: 'Genesis order',
            });
            const updated = await this.prisma.payment.update({
                where: { id: payment.id },
                data: { merchantRequestId: r.merchantRequestId, checkoutRequestId: r.checkoutRequestId },
            });
            return { payment: this.view(updated, r.customerMessage), paid: false };
        } catch (e) {
            const message = e instanceof MpesaError ? e.message : 'M-Pesa is not responding right now';
            if (!(e instanceof MpesaError)) this.logger.error(`STK push failed for order ${order.orderNumber}`, e as Error);
            const failed = await this.prisma.payment.update({ where: { id: payment.id }, data: { status: 'FAILED', resultDesc: message } });
            return { payment: this.view(failed, `${message}. Please try again.`), paid: false };
        }
    }

    /** Daraja → gateway → here. The secret in the URL is the only thing proving it came from our own STK request. */
    async handleCallback(secret: string, body: StkCallbackBody) {
        const expected = this.config.get<string>('MPESA_CALLBACK_SECRET') || '';
        const a = Buffer.from(String(secret ?? ''));
        const b = Buffer.from(expected);
        if (!expected || a.length !== b.length || !timingSafeEqual(a, b)) {
            this.logger.warn('Rejected M-Pesa callback with a bad secret');
            return { accepted: false };
        }
        await this.applyCallback(body);
        return { accepted: true };
    }

    async applyCallback(body: StkCallbackBody) {
        const cb = body?.Body?.stkCallback;
        if (!cb?.CheckoutRequestID) {
            this.logger.warn(`Malformed M-Pesa callback: ${JSON.stringify(body)?.slice(0, 300)}`);
            return;
        }
        const payment = await this.prisma.payment.findUnique({ where: { checkoutRequestId: cb.CheckoutRequestID } });
        if (!payment) {
            this.logger.warn(`M-Pesa callback for unknown request ${cb.CheckoutRequestID}`);
            return;
        }
        const meta = Object.fromEntries((cb.CallbackMetadata?.Item ?? []).map((i) => [i.Name, i.Value]));
        await this.settle(payment, {
            resultCode: Number(cb.ResultCode),
            resultDesc: cb.ResultDesc ?? '',
            receipt: meta.MpesaReceiptNumber != null ? String(meta.MpesaReceiptNumber) : null,
            amount: meta.Amount != null ? Number(meta.Amount) : null,
            raw: body,
        });
    }

    /** Record how a prompt ended and, on success, confirm the order. Safe to call twice. */
    private async settle(
        payment: Payment,
        r: { resultCode: number; resultDesc: string; receipt: string | null; amount: number | null; raw: unknown },
    ): Promise<Payment> {
        if (payment.status === 'SUCCESS') return payment;
        const raw = r.raw as object;
        if (r.resultCode !== 0) {
            return this.prisma.payment.update({
                where: { id: payment.id },
                data: { status: 'FAILED', resultCode: r.resultCode, resultDesc: r.resultDesc, raw },
            });
        }
        const updated = await this.prisma.payment.update({
            where: { id: payment.id },
            data: { status: 'SUCCESS', resultCode: 0, resultDesc: r.resultDesc, receiptNumber: r.receipt, paidAt: new Date(), raw },
        });
        const alreadyPaid = await this.prisma.payment.count({ where: { orderId: payment.orderId, status: 'SUCCESS', id: { not: payment.id } } });
        if (alreadyPaid) {
            await this.orders.addTrackingEvent(payment.orderId, {
                note: `Second M-Pesa payment received${r.receipt ? ` (receipt ${r.receipt})` : ''} — refund the duplicate`,
                isPublic: false,
                actor: 'system',
            });
            return updated;
        }
        const expected = Number(payment.amount);
        const amountNote = r.amount != null && r.amount < expected
            ? `M-Pesa reported KES ${r.amount} but KES ${expected} was requested — check before dispatch`
            : null;
        await this.orders.confirmPayment(payment.orderId, { receipt: r.receipt, amountNote });
        return updated;
    }

    /** Ask Daraja about a prompt whose callback hasn't arrived. Returns the (possibly updated) payment. */
    private async reconcile(payment: Payment): Promise<Payment | null> {
        if (payment.status !== 'PENDING' || !payment.checkoutRequestId) return payment;
        try {
            const q = await this.mpesa.stkQuery(payment.checkoutRequestId);
            if (q.state === 'PENDING') {
                // touch updatedAt so polling doesn't query Daraja on every request
                return this.prisma.payment.update({ where: { id: payment.id }, data: { raw: q.raw ?? payment.raw ?? {} } });
            }
            return this.settle(payment, { resultCode: q.resultCode, resultDesc: q.resultDesc, receipt: null, amount: null, raw: q.raw });
        } catch (e) {
            this.logger.warn(`M-Pesa status query failed for ${payment.checkoutRequestId}: ${(e as Error)?.message}`);
            return null;
        }
    }

    /** Polled by the storefront's "check your phone" screen. */
    async status(orderId: string, customerId?: string) {
        const load = () => this.prisma.order.findUnique({
            where: { id: orderId },
            include: { payments: { orderBy: { createdAt: 'desc' }, take: 1 } },
        });
        let order = await load();
        if (!order || (customerId && order.customerId !== customerId)) this.fail(404, 'Order not found');

        const last = order.payments[0];
        const now = Date.now();
        if (last?.status === 'PENDING' && now - last.createdAt.getTime() > QUERY_AFTER_MS && now - last.updatedAt.getTime() > QUERY_EVERY_MS) {
            await this.reconcile(last);
            order = (await load())!;
        }

        const latest = order.payments[0];
        const due = order.paymentDueAt;
        const canRetry = order.paymentMethod === 'mpesa'
            && order.status === 'PENDING'
            && order.paymentStatus !== 'PAID'
            && (!due || due.getTime() > now)
            && (latest?.status !== 'PENDING' || now - latest.createdAt.getTime() >= PROMPT_COOLDOWN_MS);

        return {
            orderId: order.id,
            orderNumber: order.orderNumber,
            status: order.status,
            paymentStatus: order.paymentStatus,
            paymentMethod: order.paymentMethod,
            total: Number(order.total),
            paymentDueAt: due,
            payment: this.view(latest),
            canRetry,
        };
    }

    /**
     * Every minute: settle prompts whose callback never came, then cancel
     * M-Pesa orders that are still unpaid past their deadline.
     */
    async sweep() {
        if (this.sweeping) return;
        this.sweeping = true;
        try {
            const stale = await this.prisma.payment.findMany({
                where: { status: 'PENDING', checkoutRequestId: { not: null }, createdAt: { lt: new Date(Date.now() - 2 * 60_000) } },
                take: 20,
                orderBy: { createdAt: 'asc' },
            });
            for (const p of stale) await this.reconcile(p);

            const overdue = await this.prisma.order.findMany({
                where: { paymentMethod: 'mpesa', status: 'PENDING', paymentStatus: { not: 'PAID' }, paymentDueAt: { lt: new Date() } },
                select: { id: true, orderNumber: true },
                take: 50,
            });
            for (const o of overdue) {
                const pending = await this.prisma.payment.findMany({ where: { orderId: o.id, status: 'PENDING' } });
                const results = await Promise.all(pending.map((p) => this.reconcile(p)));
                // a query that errored or is still processing means the customer may be paying right now
                if (results.some((r) => r === null || r.status === 'PENDING')) continue;
                if (results.some((r) => r?.status === 'SUCCESS')) continue;
                await this.orders.expireUnpaidOrder(o.id)
                    .then(() => this.logger.log(`Cancelled unpaid M-Pesa order ${o.orderNumber}`))
                    .catch((e) => this.logger.error(`Could not cancel unpaid order ${o.orderNumber}`, e as Error));
            }
        } catch (e) {
            this.logger.error('Payment sweep failed', e as Error);
        } finally {
            this.sweeping = false;
        }
    }
}
