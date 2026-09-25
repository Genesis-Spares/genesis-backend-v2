/** Payload the order service emits for 'order.placed' / 'order.status.changed'. */
export interface OrderEvent {
    orderId: string;
    orderNumber: string;
    customerId: string;
    email: string;
    name: string;
    phone?: string | null;
    status: string;
    paymentStatus: string;
    paymentMethod?: string | null;
    currency: string;
    subtotal: number;
    shipping: number;
    discount: number;
    total: number;
    items: { name: string; sku: string; quantity: number; unitPrice: number; lineTotal: number }[];
    address?: string | null;
    carrier?: string | null;
    trackingNumber?: string | null;
    estimatedDeliveryAt?: string | null;
    cancelReason?: string | null;
    note?: string | null;
    location?: string | null;
    orderUrl: string;
}

export type OrderMessageKind = 'PLACED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'REFUNDED';

const money = (n: number, currency = 'KES') =>
    currency === 'KES' ? `KSh ${Math.round(n).toLocaleString('en-KE')}` : `${currency} ${n.toFixed(2)}`;

const day = (iso?: string | null) =>
    iso ? new Date(iso).toLocaleDateString('en-KE', { weekday: 'long', day: 'numeric', month: 'long' }) : null;

const PAYMENT: Record<string, string> = { mpesa: 'M-Pesa', card: 'Card', cod: 'Pay on delivery' };

export function kindFor(event: string, status: string): OrderMessageKind | null {
    if (event === 'order.placed') return 'PLACED';
    return (['SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED'] as const).find((k) => k === status) ?? null;
}

/** Everything the email template and SMS need, already formatted. */
export function buildOrderMessage(kind: OrderMessageKind, o: OrderEvent) {
    const first = (o.name || '').split(' ')[0] || 'there';
    const eta = day(o.estimatedDeliveryAt);
    const shipLine = [o.carrier, o.trackingNumber && `tracking no. ${o.trackingNumber}`].filter(Boolean).join(', ');
    const unpaidCod = o.paymentMethod === 'cod' && o.paymentStatus !== 'PAID';

    const copy: Record<OrderMessageKind, { subject: string; headline: string; intro: string; sms: string; accent: string }> = {
        PLACED: {
            subject: `Order ${o.orderNumber} confirmed`,
            headline: 'Thanks — your order is confirmed',
            intro: unpaidCod
                ? `Hi ${first}, we've received your order and are getting your parts ready. You'll pay ${money(o.total, o.currency)} on delivery.`
                : `Hi ${first}, we've received your order and payment. We're getting your parts ready and will let you know when they ship.`,
            sms: `Genesis: Order ${o.orderNumber} confirmed, total ${money(o.total, o.currency)}. We'll text you when it ships. ${o.orderUrl}`,
            accent: '#0c7a54',
        },
        SHIPPED: {
            subject: `Order ${o.orderNumber} is on its way`,
            headline: 'Your order is on its way',
            intro: `Hi ${first}, your parts have left our warehouse${shipLine ? ` with ${shipLine}` : ''}.${eta ? ` Expected ${eta}.` : ''}`,
            sms: `Genesis: Order ${o.orderNumber} has shipped${o.carrier ? ` with ${o.carrier}` : ''}${o.trackingNumber ? ` (${o.trackingNumber})` : ''}.${eta ? ` Expected ${eta}.` : ''} Track: ${o.orderUrl}`,
            accent: '#e4531f',
        },
        DELIVERED: {
            subject: `Order ${o.orderNumber} delivered`,
            headline: 'Your order has been delivered',
            intro: `Hi ${first}, your order has been delivered. We hope the parts fit perfectly — if anything's not right, reply to this email or contact us.`,
            sms: `Genesis: Order ${o.orderNumber} has been delivered. Thank you for shopping with us!`,
            accent: '#0c7a54',
        },
        CANCELLED: {
            subject: `Order ${o.orderNumber} cancelled`,
            headline: 'Your order has been cancelled',
            intro: `Hi ${first}, your order ${o.orderNumber} has been cancelled.${o.paymentStatus === 'PAID' ? " As it was already paid, we'll process your refund and confirm by email." : ''}`,
            sms: `Genesis: Order ${o.orderNumber} has been cancelled.${o.paymentStatus === 'PAID' ? ' Your refund will follow.' : ''} Questions? Reply or call us.`,
            accent: '#5e6773',
        },
        REFUNDED: {
            subject: `Refund for order ${o.orderNumber}`,
            headline: 'Your refund has been issued',
            intro: `Hi ${first}, we've refunded ${money(o.total, o.currency)} for order ${o.orderNumber} via ${PAYMENT[o.paymentMethod ?? ''] ?? 'your original payment method'}. It can take a few days to reflect.`,
            sms: `Genesis: Refund of ${money(o.total, o.currency)} for order ${o.orderNumber} has been issued via ${PAYMENT[o.paymentMethod ?? ''] ?? 'your original payment method'}.`,
            accent: '#5e6773',
        },
    };
    const c = copy[kind];

    // the admin's customer-visible message (or cancellation reason) if they wrote one
    const message = o.note || (kind === 'CANCELLED' ? o.cancelReason : null) || null;

    return {
        subject: c.subject,
        sms: c.sms.length > 300 ? c.sms.slice(0, 297) + '…' : c.sms,
        text: [c.headline, '', c.intro, message ? `\nNote from our team: ${message}` : '', '', `View your order: ${o.orderUrl}`].join('\n'),
        view: {
            headline: c.headline,
            intro: c.intro,
            accent: c.accent,
            message,
            location: o.location,
            orderNumber: o.orderNumber,
            orderUrl: o.orderUrl,
            showItems: kind === 'PLACED' || kind === 'CANCELLED' || kind === 'REFUNDED',
            items: o.items.map((i) => ({ ...i, unitPrice: money(i.unitPrice, o.currency), lineTotal: money(i.lineTotal, o.currency) })),
            subtotal: money(o.subtotal, o.currency),
            shipping: o.shipping > 0 ? money(o.shipping, o.currency) : 'Free',
            discount: o.discount > 0 ? money(o.discount, o.currency) : null,
            total: money(o.total, o.currency),
            payment: unpaidCod
                ? 'Pay on delivery (cash or card)'
                : `${PAYMENT[o.paymentMethod ?? ''] ?? o.paymentMethod ?? '—'} · ${o.paymentStatus === 'PAID' ? 'Paid' : o.paymentStatus.toLowerCase().replace('_', ' ')}`,
            address: o.address,
            shipping_details: kind === 'SHIPPED' ? { carrier: o.carrier, trackingNumber: o.trackingNumber, eta } : null,
            cta: kind === 'SHIPPED' ? 'Track your order' : 'View your order',
            year: new Date().getFullYear(),
        },
    };
}
