import { Controller, Logger } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import type { OrderEvent } from '../services/order-messages';
import { StaffNotificationsService, type Viewer } from './staff-notifications.service';
import { PushService, type BrowserSubscription } from './push.service';

const money = (n: number, currency = 'KES') =>
    currency === 'KES' ? `KSh ${Math.round(Number(n) || 0).toLocaleString('en-KE')}` : `${currency} ${Number(n).toFixed(2)}`;

/**
 * Staff-facing alerts: listens to the same business events the email handlers use and
 * turns the ones staff should act on into dashboard notifications (+ web push).
 * Also answers the gateway's requests for the notification feed and push subscriptions.
 */
@Controller()
export class StaffNotificationsController {
    private readonly logger = new Logger(StaffNotificationsController.name);

    constructor(
        private readonly staff: StaffNotificationsService,
        private readonly push: PushService,
    ) { }

    private safely(what: string, fn: () => Promise<unknown>) {
        return fn().catch((e) => this.logger.error(`Staff notification for ${what} failed`, e as Error));
    }

    // ── business events ─────────────────────────────────────────────────────────

    @EventPattern('order.placed')
    onOrderPlaced(@Payload() o: OrderEvent) {
        if (!o?.orderId) return;
        const items = o.items?.reduce((n, i) => n + (i.quantity || 0), 0) ?? 0;
        const paid = o.paymentStatus === 'PAID';
        return this.safely(`order ${o.orderNumber}`, () => this.staff.notify({
            type: 'ORDER_PLACED',
            title: `New order ${o.orderNumber} · ${money(o.total, o.currency)}`,
            body: `${o.name || 'A customer'} · ${items} item${items === 1 ? '' : 's'} · ${paid ? 'paid by M-Pesa' : 'pay on delivery'}`,
            link: `/orders/${o.orderId}`,
            permission: 'order:read',
            data: { orderId: o.orderId, orderNumber: o.orderNumber, total: o.total },
        }));
    }

    @EventPattern('order.status.changed')
    onOrderStatus(@Payload() o: OrderEvent) {
        if (!o?.orderId || o.status !== 'CANCELLED') return;
        return this.safely(`order ${o.orderNumber}`, () => this.staff.notify({
            type: 'ORDER_CANCELLED',
            title: `Order ${o.orderNumber} cancelled`,
            body: `${o.name || 'Customer'} · ${money(o.total, o.currency)}${o.cancelReason ? ` · ${o.cancelReason}` : ''}`,
            link: `/orders/${o.orderId}`,
            permission: 'order:read',
            data: { orderId: o.orderId, orderNumber: o.orderNumber },
        }));
    }

    @EventPattern('return.status.changed')
    onReturn(@Payload() r: { rmaNumber: string; status: string; reason: string; orderNumber: string; name: string; items: { name: string; quantity: number }[] }) {
        if (r?.status !== 'REQUESTED') return;
        const first = r.items?.[0];
        return this.safely(`return ${r.rmaNumber}`, () => this.staff.notify({
            type: 'RETURN_REQUESTED',
            title: `Return requested · ${r.rmaNumber}`,
            body: `${r.name || 'Customer'} · order ${r.orderNumber}${first ? ` · ${first.quantity} × ${first.name}` : ''}${r.items?.length > 1 ? ` +${r.items.length - 1} more` : ''}`,
            link: '/returns',
            permission: 'order:read',
            data: { rmaNumber: r.rmaNumber, orderNumber: r.orderNumber },
        }));
    }

    @EventPattern('support.message.received')
    onMessage(@Payload() m: { messageId: string; reference: string; name: string; subject: string; body: string; priority: string }) {
        if (!m?.messageId) return;
        const urgent = m.priority === 'HIGH' || m.priority === 'URGENT';
        return this.safely(`message ${m.reference}`, () => this.staff.notify({
            type: 'MESSAGE_RECEIVED',
            title: `${urgent ? 'Urgent message' : 'New message'} from ${m.name || 'a customer'}`,
            body: `${m.subject}${m.body ? ` · ${m.body.replace(/\s+/g, ' ').slice(0, 100)}` : ''}`,
            link: '/messages',
            permission: 'message:read',
            data: { messageId: m.messageId, reference: m.reference, priority: m.priority },
        }));
    }

    @EventPattern('inventory.low_stock')
    onLowStock(@Payload() d: { products: { productId: string; sku: string; name: string; stockAfter: number }[] }) {
        if (!d?.products?.length) return;
        const out = d.products.filter((p) => p.stockAfter <= 0).length;
        const first = d.products[0];
        return this.safely('low stock', () => this.staff.notify({
            type: 'LOW_STOCK',
            title: out
                ? `${out} product${out === 1 ? ' is' : 's are'} out of stock`
                : `${d.products.length} product${d.products.length === 1 ? ' needs' : 's need'} reordering`,
            body: d.products.length === 1
                ? `${first.name} (${first.sku}) · ${first.stockAfter <= 0 ? 'out of stock' : `${first.stockAfter} left`}`
                : d.products.slice(0, 3).map((p) => `${p.sku} ${p.stockAfter <= 0 ? 'out' : `${p.stockAfter} left`}`).join(' · ') + (d.products.length > 3 ? ` +${d.products.length - 3} more` : ''),
            link: '/inventory',
            permission: 'product:update',
            data: { skus: d.products.map((p) => p.sku) },
        }));
    }

    // ── requests from the API gateway ───────────────────────────────────────────

    @MessagePattern('staff.notifications.list')
    list(@Payload() p: Viewer & { limit?: number; before?: string; unreadOnly?: boolean }) {
        return this.staff.list(p, p);
    }

    @MessagePattern('staff.notifications.read')
    read(@Payload() p: Viewer & { ids?: string[]; all?: boolean }) {
        return p.all ? this.staff.markAllRead(p) : this.staff.markRead(p, p.ids ?? []);
    }

    @MessagePattern('staff.push.key')
    key() {
        return { publicKey: this.push.getPublicKey() };
    }

    @MessagePattern('staff.push.subscribe')
    async subscribe(@Payload() p: Viewer & { subscription: BrowserSubscription; userAgent?: string }) {
        try {
            await this.push.subscribe(p.userId, p.permissions, p.subscription, p.userAgent);
            return { ok: true };
        } catch (e) {
            throw new RpcException({ statusCode: 400, message: (e as Error).message });
        }
    }

    @MessagePattern('staff.push.unsubscribe')
    async unsubscribe(@Payload() p: { userId: string; endpoint: string }) {
        await this.push.unsubscribe(p.userId, p.endpoint);
        return { ok: true };
    }

    /** "Send a test notification" from the dashboard: goes only to the caller's devices. */
    @MessagePattern('staff.push.test')
    async test(@Payload() p: { userId: string }) {
        const res = await this.push.sendToStaff(null, {
            title: 'Notifications are on',
            body: 'This device will get alerts for new orders, returns, messages and low stock.',
            url: '/dashboard',
            tag: 'test',
        }, p.userId);
        if (!res.sent) throw new RpcException({ statusCode: 404, message: 'No subscribed device found for your account' });
        return res;
    }
}
