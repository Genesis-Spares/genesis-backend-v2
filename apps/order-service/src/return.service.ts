// apps/order-service/src/return.service.ts
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { PrismaService } from '../libs/prisma/prisma.service';
import { Prisma } from './generated/prisma';
import { OrderService } from './order.service';

export const RETURN_REASONS = ['WRONG_PART', 'DOESNT_FIT', 'DAMAGED', 'FAULTY', 'NOT_AS_DESCRIBED', 'CHANGED_MIND'] as const;
export type ReturnReason = (typeof RETURN_REASONS)[number];
/** Reasons where the shop is at fault — the delivery fee is refunded too (see /returns policy). */
export const OUR_FAULT: ReturnReason[] = ['WRONG_PART', 'DOESNT_FIT', 'DAMAGED', 'FAULTY', 'NOT_AS_DESCRIBED'];

const REASON_LABEL: Record<ReturnReason, string> = {
    WRONG_PART: 'Wrong part sent',
    DOESNT_FIT: "Doesn't fit my vehicle",
    DAMAGED: 'Arrived damaged',
    FAULTY: 'Faulty / not working',
    NOT_AS_DESCRIBED: 'Not as described',
    CHANGED_MIND: 'Changed my mind',
};

const CANCELLABLE = ['PENDING', 'CONFIRMED'];
const OPEN_RETURN = ['REQUESTED', 'APPROVED', 'RECEIVED']; // still in play

export interface CreateReturnInput {
    orderId: string;
    customerId: string;
    items: { orderItemId: string; quantity: number }[];
    reason: ReturnReason;
    details?: string;
    photos?: string[];
    resolution?: 'REFUND' | 'EXCHANGE';
}

const fail = (message: string, statusCode = 400): never => {
    throw new RpcException({ statusCode, message, error: statusCode === 404 ? 'Not Found' : statusCode === 403 ? 'Forbidden' : 'Bad Request' });
};

@Injectable()
export class ReturnService {
    private readonly logger = new Logger(ReturnService.name);

    constructor(
        private readonly prisma: PrismaService,
        private readonly orders: OrderService,
        private readonly config: ConfigService,
        @Inject('PRODUCT_SERVICE') private readonly productClient: ClientProxy,
        @Inject('NOTIFICATION_SERVICE') private readonly notificationClient: ClientProxy,
    ) { }

    private get windowDays() {
        return Number(this.config.get('RETURN_WINDOW_DAYS', 7)) || 7;
    }

    // ── helpers ─────────────────────────────────────────────

    private async ownOrder(orderId: string, customerId: string) {
        const order = await this.prisma.order.findUnique({ where: { id: orderId }, include: { items: true } });
        // 404 either way so other customers' order ids aren't confirmed to exist
        if (!order || order.customerId !== customerId) fail('Order not found', 404);
        return order!;
    }

    private async rmaNumber() {
        const d = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        for (let i = 0; i < 5; i++) {
            const n = `RMA-${d}-${Math.floor(1000 + Math.random() * 9000)}`;
            if (!(await this.prisma.returnRequest.findUnique({ where: { rmaNumber: n } }))) return n;
        }
        return `RMA-${d}-${Date.now().toString().slice(-6)}`;
    }

    /** Quantity of each order line already covered by returns that weren't rejected. */
    private async alreadyReturned(orderId: string) {
        const rows = await this.prisma.returnItem.groupBy({
            by: ['orderItemId'],
            where: { returnRequest: { orderId, status: { not: 'REJECTED' } } },
            _sum: { quantity: true },
        });
        return new Map(rows.map((r) => [r.orderItemId, r._sum.quantity ?? 0]));
    }

    private timeline(orderId: string, status: string, note: string, isPublic: boolean, actor: string, changedBy?: string) {
        return this.prisma.orderStatusHistory.create({
            data: { orderId, type: 'UPDATE', status, note, isPublic, actor, changedBy },
        });
    }

    private notify(r: { id: string; rmaNumber: string; status: string; instructions?: string | null; rejectReason?: string | null; refundAmount?: Prisma.Decimal | number | null; reason: string; items: { name: string; quantity: number }[] }, order: { id: string; orderNumber: string; customerId: string; customerEmail: string; customerName: string; currency: string }) {
        try {
            const storefront = (this.config.get<string>('STOREFRONT_URL') || 'http://localhost:3000').replace(/\/$/, '');
            this.notificationClient.emit('return.status.changed', {
                rmaNumber: r.rmaNumber,
                status: r.status,
                reason: REASON_LABEL[r.reason as ReturnReason] ?? r.reason,
                items: r.items.map((i) => ({ name: i.name, quantity: i.quantity })),
                instructions: r.instructions ?? null,
                rejectReason: r.rejectReason ?? null,
                refundAmount: r.refundAmount != null ? Number(r.refundAmount) : null,
                currency: order.currency,
                orderNumber: order.orderNumber,
                customerId: order.customerId,
                email: order.customerEmail,
                name: order.customerName,
                orderUrl: `${storefront}/account/orders/${order.id}`,
            }).subscribe({ error: (e) => this.logger.warn(`Return email not queued: ${(e as Error)?.message}`) });
        } catch (e) {
            this.logger.warn(`Return email not queued: ${(e as Error)?.message}`);
        }
    }

    // ── customer ────────────────────────────────────────────

    /** Customer cancels their own order before it's packed/dispatched. */
    async customerCancel(orderId: string, customerId: string, reason?: string) {
        const order = await this.ownOrder(orderId, customerId);
        if (!CANCELLABLE.includes(order.status)) {
            fail(order.status === 'CANCELLED'
                ? 'This order is already cancelled.'
                : "This order is already being prepared or has shipped, so it can't be cancelled online. Contact us — or return it once delivered.");
        }
        const note = reason?.trim() ? `Cancelled by customer — ${reason.trim().slice(0, 300)}` : 'Cancelled by customer';
        return this.orders.updateOrderStatus(orderId, { status: 'CANCELLED', note, isPublic: true, actor: 'customer', changedBy: customerId });
    }

    /** What (if anything) the customer can still return from an order. */
    async eligibility(orderId: string, customerId: string) {
        const order = await this.ownOrder(orderId, customerId);
        const returns = await this.prisma.returnRequest.findMany({ where: { orderId }, include: { items: true }, orderBy: { createdAt: 'desc' } });
        const deadline = order.deliveredAt ? new Date(order.deliveredAt.getTime() + this.windowDays * 86400000) : null;

        let reason: string | null = null;
        if (order.status !== 'DELIVERED' || !order.deliveredAt) reason = 'Returns open once your order has been delivered.';
        else if (deadline && deadline < new Date()) reason = `The ${this.windowDays}-day return window closed on ${deadline.toDateString()}.`;

        const used = await this.alreadyReturned(orderId);
        const items = order.items.map((i) => ({
            orderItemId: i.id, productId: i.productId, name: i.name, sku: i.sku, image: i.image,
            ordered: i.quantity, returnable: Math.max(0, i.quantity - (used.get(i.id) ?? 0)),
            unitPrice: Number(i.unitPrice),
        }));
        if (!reason && !items.some((i) => i.returnable > 0)) reason = 'Every item on this order is already in a return.';

        return {
            canCancel: CANCELLABLE.includes(order.status),
            canReturn: !reason,
            reason,
            deadline,
            windowDays: this.windowDays,
            items,
            returns: returns.map((r) => this.toCustomer(r)),
        };
    }

    async create(input: CreateReturnInput) {
        const order = await this.ownOrder(input.orderId, input.customerId);
        const elig = await this.eligibility(input.orderId, input.customerId);
        if (!elig.canReturn) fail(elig.reason ?? 'This order can no longer be returned.');
        if (!RETURN_REASONS.includes(input.reason)) fail('Choose a reason for the return.');

        const byId = new Map(elig.items.map((i) => [i.orderItemId, i]));
        const lines = (input.items ?? []).filter((l) => l.quantity > 0);
        if (!lines.length) fail('Select at least one item to return.');
        for (const l of lines) {
            const it = byId.get(l.orderItemId);
            if (!it) fail('One of the selected items is not on this order.');
            if (l.quantity > it!.returnable) fail(`You can return at most ${it!.returnable} × ${it!.name}.`);
        }
        if ((input.photos?.length ?? 0) > 4) fail('Attach up to 4 photos.');

        const rmaNumber = await this.rmaNumber();
        const created = await this.prisma.$transaction(async (tx) => {
            const r = await tx.returnRequest.create({
                data: {
                    rmaNumber,
                    orderId: order.id,
                    customerId: input.customerId,
                    reason: input.reason,
                    details: input.details?.trim().slice(0, 2000) || null,
                    photos: input.photos ?? [],
                    resolution: input.resolution === 'EXCHANGE' ? 'EXCHANGE' : 'REFUND',
                    items: {
                        create: lines.map((l) => {
                            const it = byId.get(l.orderItemId)!;
                            return { orderItemId: it.orderItemId, productId: it.productId, sku: it.sku, name: it.name, quantity: l.quantity, unitPrice: it.unitPrice };
                        }),
                    },
                },
                include: { items: true },
            });
            await tx.orderStatusHistory.create({
                data: { orderId: order.id, type: 'UPDATE', status: order.status, note: `Return ${rmaNumber} requested — ${REASON_LABEL[input.reason]}`, isPublic: true, actor: 'customer', changedBy: input.customerId },
            });
            return r;
        });
        this.notify(created, order);
        return this.toCustomer(created);
    }

    async listForCustomer(customerId: string) {
        const rows = await this.prisma.returnRequest.findMany({
            where: { customerId }, include: { items: true, order: { select: { orderNumber: true } } }, orderBy: { createdAt: 'desc' },
        });
        return rows.map((r) => ({ ...this.toCustomer(r), orderNumber: r.order.orderNumber }));
    }

    /** Customer-safe shape: no internal admin note. */
    private toCustomer(r: Prisma.ReturnRequestGetPayload<{ include: { items: true } }>) {
        const { adminNote: _n, ...rest } = r;
        return { ...rest, reasonLabel: REASON_LABEL[r.reason as ReturnReason] ?? r.reason, refundAmount: r.refundAmount != null ? Number(r.refundAmount) : null };
    }

    // ── staff ───────────────────────────────────────────────

    async list(q: { status?: string; search?: string; page?: number; limit?: number }) {
        const take = Math.min(100, Math.max(1, Number(q.limit) || 20));
        const page = Math.max(1, Number(q.page) || 1);
        const where: Prisma.ReturnRequestWhereInput = {};
        if (q.status) where.status = q.status;
        if (q.search?.trim()) {
            const s = q.search.trim();
            where.OR = [
                { rmaNumber: { contains: s, mode: 'insensitive' } },
                { order: { orderNumber: { contains: s, mode: 'insensitive' } } },
                { order: { customerName: { contains: s, mode: 'insensitive' } } },
                { order: { customerEmail: { contains: s, mode: 'insensitive' } } },
                { items: { some: { name: { contains: s, mode: 'insensitive' } } } },
            ];
        }
        const [data, total, counts] = await Promise.all([
            this.prisma.returnRequest.findMany({
                where, orderBy: { createdAt: 'desc' }, skip: (page - 1) * take, take,
                include: { items: true, order: { select: { id: true, orderNumber: true, customerName: true, customerEmail: true, total: true, shippingAmount: true, currency: true, paymentMethod: true, paymentStatus: true } } },
            }),
            this.prisma.returnRequest.count({ where }),
            this.prisma.returnRequest.groupBy({ by: ['status'], _count: { _all: true } }),
        ]);
        return {
            data: data.map((r) => ({ ...r, reasonLabel: REASON_LABEL[r.reason as ReturnReason] ?? r.reason, ourFault: OUR_FAULT.includes(r.reason as ReturnReason) })),
            meta: { total, page, limit: take, totalPages: Math.max(1, Math.ceil(total / take)) },
            byStatus: Object.fromEntries(counts.map((c) => [c.status, c._count._all])),
        };
    }

    private async loadForStaff(id: string) {
        const r = await this.prisma.returnRequest.findUnique({ where: { id }, include: { items: true, order: true } });
        if (!r) fail('Return not found', 404);
        return r!;
    }

    async approve(id: string, instructions: string | undefined, actor: { changedBy?: string; actor?: string }) {
        const r = await this.loadForStaff(id);
        if (r.status !== 'REQUESTED') fail(`Only requested returns can be approved (this one is ${r.status.toLowerCase()}).`);
        const text = instructions?.trim() || 'Please bring the part(s) in the original packaging to our Industrial Area counter, or reply to this email to arrange collection. Quote your RMA number.';
        const updated = await this.prisma.returnRequest.update({ where: { id }, data: { status: 'APPROVED', instructions: text.slice(0, 1000), approvedAt: new Date() }, include: { items: true } });
        await this.timeline(r.orderId, r.order.status, `Return ${r.rmaNumber} approved`, true, actor.actor ?? 'staff', actor.changedBy);
        this.notify(updated, r.order);
        return updated;
    }

    async reject(id: string, reason: string, actor: { changedBy?: string; actor?: string }) {
        const r = await this.loadForStaff(id);
        if (!['REQUESTED', 'APPROVED'].includes(r.status)) fail(`A ${r.status.toLowerCase()} return can't be rejected.`);
        if (!reason?.trim()) fail('Give the customer a reason.');
        const updated = await this.prisma.returnRequest.update({ where: { id }, data: { status: 'REJECTED', rejectReason: reason.trim().slice(0, 1000), rejectedAt: new Date() }, include: { items: true } });
        await this.timeline(r.orderId, r.order.status, `Return ${r.rmaNumber} declined — ${reason.trim().slice(0, 200)}`, true, actor.actor ?? 'staff', actor.changedBy);
        this.notify(updated, r.order);
        return updated;
    }

    /** Parts are back with us. Restock only if they're resaleable. */
    async receive(id: string, restock: boolean, note: string | undefined, actor: { changedBy?: string; actor?: string }) {
        const r = await this.loadForStaff(id);
        if (r.status !== 'APPROVED') fail('Approve the return before marking it received.');
        if (restock) {
            try {
                await firstValueFrom(this.productClient.send('inventory.return.restock', {
                    returnId: r.id, items: r.items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
                }).pipe(timeout(10_000)));
            } catch (e) {
                this.logger.error(`Restock for ${r.rmaNumber} failed`, e as Error);
                fail("Couldn't update stock right now — try again, or mark received without restocking.", 503);
            }
        }
        const updated = await this.prisma.returnRequest.update({
            where: { id },
            data: { status: 'RECEIVED', receivedAt: new Date(), restocked: restock, adminNote: note?.trim() ? note.trim().slice(0, 1000) : r.adminNote },
            include: { items: true },
        });
        await this.timeline(r.orderId, r.order.status, `Return ${r.rmaNumber} received${restock ? ' and restocked' : ' (not restocked)'}`, false, actor.actor ?? 'staff', actor.changedBy);
        this.notify(updated, r.order);
        return updated;
    }

    /** Record the refund (money is sent via the payment provider) and update the order's payment status. */
    async refund(id: string, amount: number, note: string | undefined, actor: { changedBy?: string; actor?: string }) {
        const r = await this.loadForStaff(id);
        if (r.status !== 'RECEIVED') fail('Mark the return as received before refunding.');
        const amt = Math.round(Number(amount) * 100) / 100;
        if (!(amt > 0)) fail('Enter a refund amount.');

        const prior = await this.prisma.returnRequest.aggregate({ where: { orderId: r.orderId, status: 'REFUNDED' }, _sum: { refundAmount: true } });
        const refundedSoFar = Number(prior._sum.refundAmount ?? 0);
        const orderTotal = Number(r.order.total);
        if (refundedSoFar + amt > orderTotal + 0.001) fail(`That's more than is left on the order (${(orderTotal - refundedSoFar).toFixed(2)} ${r.order.currency}).`);

        const fully = refundedSoFar + amt >= orderTotal - 0.001;
        const [updated] = await this.prisma.$transaction([
            this.prisma.returnRequest.update({
                where: { id },
                data: { status: 'REFUNDED', refundAmount: amt, refundedAt: new Date(), adminNote: note?.trim() ? note.trim().slice(0, 1000) : r.adminNote },
                include: { items: true },
            }),
            this.prisma.order.update({ where: { id: r.orderId }, data: { paymentStatus: fully ? 'REFUNDED' : 'PARTIALLY_REFUNDED' } }),
            this.prisma.orderStatusHistory.create({
                data: { orderId: r.orderId, type: 'PAYMENT', status: r.order.status, note: `Refund of ${r.order.currency} ${amt.toLocaleString('en-KE')} issued for return ${r.rmaNumber}`, isPublic: true, actor: actor.actor ?? 'staff', changedBy: actor.changedBy },
            }),
        ]);
        this.notify(updated, r.order);
        return updated;
    }

    /** Suggested refund: returned items, plus the delivery fee when we were at fault. */
    static suggestedRefund(r: { reason: string; items: { unitPrice: Prisma.Decimal | number; quantity: number }[] }, shipping: number) {
        const items = r.items.reduce((n, i) => n + Number(i.unitPrice) * i.quantity, 0);
        return OUR_FAULT.includes(r.reason as ReturnReason) ? items + shipping : items;
    }

    /** Orders cancelled after payment that still need their money back — for the dashboard. */
    async refundsDue() {
        return this.prisma.order.findMany({
            where: { status: 'CANCELLED', paymentStatus: 'PAID' },
            orderBy: { cancelledAt: 'desc' },
            take: 20,
            select: { id: true, orderNumber: true, customerName: true, total: true, currency: true, cancelledAt: true },
        });
    }
}

export { REASON_LABEL, OPEN_RETURN };
