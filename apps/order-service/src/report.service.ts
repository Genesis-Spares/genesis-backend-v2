// apps/order-service/src/report.service.ts
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from '../libs/prisma/prisma.service';

/** Orders that count as sales: everything except cancelled / fully refunded. */
const COUNTED = `o.status NOT IN ('CANCELLED','REFUNDED')`;
/** Local calendar day for grouping (timestamps are stored as UTC). */
const DAY = `(o.created_at AT TIME ZONE 'UTC' AT TIME ZONE 'Africa/Nairobi')::date`;

const n = (v: unknown) => Number(v ?? 0);

function range(from?: string, to?: string) {
    const end = to ? new Date(to) : new Date();
    const start = from ? new Date(from) : new Date(end.getTime() - 30 * 86400000);
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start > end) {
        throw new RpcException({ statusCode: 400, message: 'Invalid date range', error: 'Bad Request' });
    }
    if (end.getTime() - start.getTime() > 3 * 366 * 86400000) {
        throw new RpcException({ statusCode: 400, message: 'Date range is limited to 3 years', error: 'Bad Request' });
    }
    return { start, end };
}

/**
 * Read-only reporting over the order database. Product details (names,
 * categories, current cost) live in the product service — the gateway joins them.
 */
@Injectable()
export class ReportService {
    constructor(private readonly prisma: PrismaService) { }

    /** Sales totals for a period, with a daily series and payment-method split. */
    async salesSummary(from?: string, to?: string) {
        const { start, end } = range(from, to);
        const [totals] = await this.prisma.$queryRawUnsafe<Record<string, unknown>[]>(`
            SELECT COUNT(*)                                            AS orders,
                   COALESCE(SUM(o.subtotal), 0)                        AS items_revenue,
                   COALESCE(SUM(o.shipping_amount), 0)                 AS delivery,
                   COALESCE(SUM(o.discount_amount), 0)                 AS discounts,
                   COALESCE(SUM(o.total), 0)                           AS gross,
                   COALESCE(SUM(o.total) FILTER (WHERE o.payment_status IN ('PAID','PARTIALLY_REFUNDED','REFUNDED')), 0) AS collected,
                   COUNT(DISTINCT o.customer_id)                       AS customers
            FROM orders o
            WHERE ${COUNTED} AND o.created_at >= $1 AND o.created_at <= $2`, start, end);
        const [units] = await this.prisma.$queryRawUnsafe<Record<string, unknown>[]>(`
            SELECT COALESCE(SUM(i.quantity), 0) AS units
            FROM order_items i JOIN orders o ON o.id = i.order_id
            WHERE ${COUNTED} AND o.created_at >= $1 AND o.created_at <= $2`, start, end);
        const [refunds] = await this.prisma.$queryRawUnsafe<Record<string, unknown>[]>(`
            SELECT COALESCE(SUM(r.refund_amount), 0) AS refunds, COUNT(*) AS returns
            FROM return_requests r
            WHERE r.status = 'REFUNDED' AND r.refunded_at >= $1 AND r.refunded_at <= $2`, start, end);
        const [cancelled] = await this.prisma.$queryRawUnsafe<Record<string, unknown>[]>(`
            SELECT COUNT(*) AS cancelled FROM orders o
            WHERE o.status = 'CANCELLED' AND o.created_at >= $1 AND o.created_at <= $2`, start, end);
        const daily = await this.prisma.$queryRawUnsafe<{ date: Date; orders: bigint; revenue: unknown }[]>(`
            SELECT ${DAY} AS date, COUNT(*) AS orders, COALESCE(SUM(o.total), 0) AS revenue
            FROM orders o
            WHERE ${COUNTED} AND o.created_at >= $1 AND o.created_at <= $2
            GROUP BY 1 ORDER BY 1`, start, end);
        const methods = await this.prisma.$queryRawUnsafe<{ method: string | null; orders: bigint; revenue: unknown }[]>(`
            SELECT o.payment_method AS method, COUNT(*) AS orders, COALESCE(SUM(o.total), 0) AS revenue
            FROM orders o
            WHERE ${COUNTED} AND o.created_at >= $1 AND o.created_at <= $2
            GROUP BY 1 ORDER BY 3 DESC`, start, end);

        const orders = n(totals.orders);
        const gross = n(totals.gross);
        const refundTotal = n(refunds.refunds);
        return {
            from: start, to: end,
            orders,
            units: n(units.units),
            customers: n(totals.customers),
            itemsRevenue: n(totals.items_revenue),
            delivery: n(totals.delivery),
            discounts: n(totals.discounts),
            gross,
            collected: n(totals.collected),
            refunds: refundTotal,
            returnsRefunded: n(refunds.returns),
            net: gross - refundTotal,
            averageOrder: orders ? gross / orders : 0,
            cancelled: n(cancelled.cancelled),
            daily: daily.map((d) => ({ date: d.date.toISOString().slice(0, 10), orders: n(d.orders), revenue: n(d.revenue) })),
            paymentMethods: methods.map((m) => ({ method: m.method ?? 'unknown', orders: n(m.orders), revenue: n(m.revenue) })),
        };
    }

    /**
     * Per-product sales for the period (joined with product data by the gateway),
     * plus each product's last sale ever — used for slow movers.
     */
    async productSales(from?: string, to?: string) {
        const { start, end } = range(from, to);
        const rows = await this.prisma.$queryRawUnsafe<Record<string, unknown>[]>(`
            SELECT i.product_id,
                   MAX(i.name)                                              AS name,
                   MAX(i.sku)                                               AS sku,
                   SUM(i.quantity)                                          AS units,
                   COUNT(DISTINCT i.order_id)                               AS orders,
                   SUM(i.subtotal)                                          AS revenue,
                   SUM(i.unit_cost * i.quantity) FILTER (WHERE i.unit_cost IS NOT NULL) AS known_cost,
                   COALESCE(SUM(i.quantity) FILTER (WHERE i.unit_cost IS NULL), 0)   AS units_without_cost
            FROM order_items i JOIN orders o ON o.id = i.order_id
            WHERE ${COUNTED} AND o.created_at >= $1 AND o.created_at <= $2
            GROUP BY i.product_id`, start, end);
        const returned = await this.prisma.$queryRawUnsafe<{ product_id: string; units: bigint }[]>(`
            SELECT ri.product_id, SUM(ri.quantity) AS units
            FROM return_items ri JOIN return_requests r ON r.id = ri.return_id
            WHERE r.status <> 'REJECTED' AND r.created_at >= $1 AND r.created_at <= $2
            GROUP BY ri.product_id`, start, end);
        const lastSold = await this.prisma.$queryRawUnsafe<{ product_id: string; last_sold: Date }[]>(`
            SELECT i.product_id, MAX(o.created_at) AS last_sold
            FROM order_items i JOIN orders o ON o.id = i.order_id
            WHERE ${COUNTED}
            GROUP BY i.product_id`);

        const ret = new Map(returned.map((r) => [r.product_id, n(r.units)]));
        return {
            from: start, to: end,
            products: rows.map((r) => ({
                productId: String(r.product_id),
                name: String(r.name),
                sku: String(r.sku),
                units: n(r.units),
                orders: n(r.orders),
                revenue: n(r.revenue),
                knownCost: r.known_cost == null ? null : n(r.known_cost),
                unitsWithoutCost: n(r.units_without_cost),
                returnedUnits: ret.get(String(r.product_id)) ?? 0,
            })),
            lastSold: Object.fromEntries(lastSold.map((l) => [l.product_id, l.last_sold])),
        };
    }

    /** Customers ranked by lifetime value, with period activity and repeat-purchase stats. */
    async customers(from?: string, to?: string, limit = 50) {
        const { start, end } = range(from, to);
        const top = await this.prisma.$queryRawUnsafe<Record<string, unknown>[]>(`
            SELECT o.customer_id,
                   (ARRAY_AGG(o.customer_name  ORDER BY o.created_at DESC))[1] AS name,
                   (ARRAY_AGG(o.customer_email ORDER BY o.created_at DESC))[1] AS email,
                   COUNT(*)                        AS orders,
                   SUM(o.total)                    AS lifetime_value,
                   MIN(o.created_at)               AS first_order,
                   MAX(o.created_at)               AS last_order,
                   COUNT(*)     FILTER (WHERE o.created_at >= $1 AND o.created_at <= $2) AS period_orders,
                   COALESCE(SUM(o.total) FILTER (WHERE o.created_at >= $1 AND o.created_at <= $2), 0) AS period_value
            FROM orders o
            WHERE ${COUNTED}
            GROUP BY o.customer_id
            ORDER BY lifetime_value DESC
            LIMIT $3`, start, end, Math.min(500, Math.max(1, Number(limit) || 50)));
        const [stats] = await this.prisma.$queryRawUnsafe<Record<string, unknown>[]>(`
            WITH c AS (
                SELECT o.customer_id, COUNT(*) AS orders, SUM(o.total) AS value, MIN(o.created_at) AS first_order
                FROM orders o WHERE ${COUNTED} GROUP BY o.customer_id
            )
            SELECT COUNT(*)                                         AS customers,
                   COUNT(*) FILTER (WHERE orders > 1)               AS repeat_customers,
                   COALESCE(AVG(orders), 0)                         AS avg_orders,
                   COALESCE(AVG(value), 0)                          AS avg_value,
                   COUNT(*) FILTER (WHERE first_order >= $1 AND first_order <= $2) AS new_in_period
            FROM c`, start, end);
        const customers = n(stats.customers);
        return {
            from: start, to: end,
            summary: {
                customers,
                repeatCustomers: n(stats.repeat_customers),
                repeatRate: customers ? n(stats.repeat_customers) / customers : 0,
                averageOrders: n(stats.avg_orders),
                averageLifetimeValue: n(stats.avg_value),
                newInPeriod: n(stats.new_in_period),
            },
            top: top.map((c) => ({
                customerId: String(c.customer_id),
                name: c.name as string,
                email: c.email as string,
                orders: n(c.orders),
                lifetimeValue: n(c.lifetime_value),
                averageOrder: n(c.orders) ? n(c.lifetime_value) / n(c.orders) : 0,
                firstOrder: c.first_order,
                lastOrder: c.last_order,
                periodOrders: n(c.period_orders),
                periodValue: n(c.period_value),
            })),
        };
    }
}
