import { Controller, Get, HttpException, HttpStatus, Inject, Query, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Type } from 'class-transformer';
import { IsInt, IsISO8601, IsOptional, Max, Min } from 'class-validator';
import { catchError, firstValueFrom } from 'rxjs';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../common/guards/permissions.guard';
import { Permissions } from '../common/decorators/permissions.decorator';

class RangeQuery {
    @IsOptional() @IsISO8601() from?: string;
    @IsOptional() @IsISO8601() to?: string;
}

class CustomersQuery extends RangeQuery {
    @IsOptional() @Type(() => Number) @IsInt() @Min(1) @Max(500) limit?: number;
}

type ProductSale = {
    productId: string; name: string; sku: string; units: number; orders: number; revenue: number;
    knownCost: number | null; unitsWithoutCost: number; returnedUnits: number;
};
type ProductFact = {
    id: string; sku: string; name: string; brand: string | null; categoryId: string | null; category: string | null;
    costPrice: number | null; price: number; stockQty: number; isActive: boolean; createdAt: string;
};
type Rollup = { key: string; label: string; products: number; units: number; revenue: number; cost: number; profit: number | null; costMissing: boolean };

const DAY_MS = 86400000;

/**
 * Sales reports for the dashboard. Order figures come from the order service;
 * product names, categories, brands, cost and stock come from the product service.
 *
 * Cost of goods: each order line stores the product's cost at the time of sale.
 * Older lines without it fall back to today's cost price (flagged as an estimate);
 * if a product has no cost price at all its profit is left blank.
 */
@Controller('reports')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Permissions('analytics:read')
export class ReportsController {
    constructor(
        @Inject('ORDER_SERVICE') private readonly orderClient: ClientProxy,
        @Inject('PRODUCT_SERVICE') private readonly productClient: ClientProxy,
    ) { }

    private call<T>(client: ClientProxy, pattern: string, payload: unknown): Promise<T> {
        return firstValueFrom(
            client.send<T>(pattern, payload).pipe(
                catchError((error) => {
                    const status = typeof error?.statusCode === 'number' ? error.statusCode : HttpStatus.INTERNAL_SERVER_ERROR;
                    throw new HttpException({ statusCode: status, message: error?.message || 'Report service error', error: error?.error || HttpStatus[status] }, status);
                }),
            ),
        );
    }

    private range(q: RangeQuery) {
        const to = q.to ? new Date(q.to) : new Date();
        const from = q.from ? new Date(q.from) : new Date(to.getTime() - 30 * DAY_MS);
        if (from > to) throw new HttpException('"from" must be before "to"', HttpStatus.BAD_REQUEST);
        return { from, to };
    }

    /** Headline sales for the range, the same-length period before it, and profit. */
    @Get('overview')
    async overview(@Query() q: RangeQuery) {
        const { from, to } = this.range(q);
        const span = to.getTime() - from.getTime();
        const prevTo = new Date(from.getTime() - 1);
        const prevFrom = new Date(prevTo.getTime() - span);
        const [current, previous, products] = await Promise.all([
            this.call<Record<string, unknown>>(this.orderClient, 'report.sales', { from, to }),
            this.call<Record<string, unknown>>(this.orderClient, 'report.sales', { from: prevFrom, to: prevTo }),
            this.productReport(from, to),
        ]);
        return {
            ...current,
            previous: { from: prevFrom, to: prevTo, ...pick(previous, ['orders', 'units', 'customers', 'gross', 'net', 'refunds', 'averageOrder']) },
            profit: products.totals,
        };
    }

    /** Per-product sales with profit, category and brand rollups, and slow movers. */
    @Get('products')
    async products(@Query() q: RangeQuery) {
        const { from, to } = this.range(q);
        return this.productReport(from, to);
    }

    /** Customer lifetime value and repeat-purchase stats. */
    @Get('customers')
    async customers(@Query() q: CustomersQuery) {
        const { from, to } = this.range(q);
        return this.call(this.orderClient, 'report.customers', { from, to, limit: q.limit ?? 50 });
    }

    private async productReport(from: Date, to: Date) {
        const sales = await this.call<{ products: ProductSale[]; lastSold: Record<string, string> }>(this.orderClient, 'report.products', { from, to });
        const facts = await this.call<ProductFact[]>(this.productClient, 'product.lookup', { ids: sales.products.map((p) => p.productId) });
        const byId = new Map(facts.map((f) => [f.id, f]));

        const rows = sales.products.map((s) => {
            const f = byId.get(s.productId);
            const current = f?.costPrice ?? null;
            // units sold before costs were recorded: use today's cost if there is one
            const estimated = s.unitsWithoutCost > 0 && current != null;
            const costMissing = s.unitsWithoutCost > 0 && current == null;
            const cost = (s.knownCost ?? 0) + (estimated ? s.unitsWithoutCost * current : 0);
            const profit = costMissing ? null : s.revenue - cost;
            return {
                productId: s.productId,
                name: f?.name ?? s.name,
                sku: f?.sku ?? s.sku,
                brand: f?.brand ?? null,
                category: f?.category ?? null,
                categoryId: f?.categoryId ?? null,
                units: s.units,
                orders: s.orders,
                revenue: round(s.revenue),
                cost: costMissing ? null : round(cost),
                profit: profit == null ? null : round(profit),
                margin: profit == null || !s.revenue ? null : profit / s.revenue,
                costEstimated: estimated,
                returnedUnits: s.returnedUnits,
                returnRate: s.units ? s.returnedUnits / s.units : 0,
                stockQty: f?.stockQty ?? null,
                isActive: f?.isActive ?? false,
                deleted: !f,
            };
        }).sort((a, b) => b.revenue - a.revenue);

        const rollup = (keyOf: (r: typeof rows[number]) => [string, string]) => {
            const m = new Map<string, Rollup>();
            for (const r of rows) {
                const [key, label] = keyOf(r);
                const g = m.get(key) ?? { key, label, products: 0, units: 0, revenue: 0, cost: 0, profit: 0, costMissing: false };
                g.products += 1; g.units += r.units; g.revenue += r.revenue;
                if (r.cost == null) g.costMissing = true; else g.cost += r.cost;
                m.set(key, g);
            }
            return [...m.values()].map((g) => {
                const profit = g.costMissing ? null : round(g.revenue - g.cost);
                return { ...g, revenue: round(g.revenue), cost: round(g.cost), profit, margin: profit == null || !g.revenue ? null : profit / g.revenue };
            }).sort((a, b) => b.revenue - a.revenue);
        };

        // in stock, active, and nothing sold in the range
        const sold = new Set(rows.map((r) => r.productId));
        const now = Date.now();
        const slowMovers = facts
            .filter((f) => f.isActive && f.stockQty > 0 && !sold.has(f.id))
            .map((f) => {
                const last = sales.lastSold[f.id] ? new Date(sales.lastSold[f.id]) : null;
                const since = last ?? new Date(f.createdAt);
                return {
                    productId: f.id, name: f.name, sku: f.sku, brand: f.brand, category: f.category,
                    stockQty: f.stockQty, costPrice: f.costPrice, price: f.price,
                    stockValue: f.costPrice != null ? round(f.costPrice * f.stockQty) : null,
                    retailValue: round(f.price * f.stockQty),
                    lastSoldAt: last,
                    daysIdle: Math.max(0, Math.floor((now - since.getTime()) / DAY_MS)),
                };
            })
            .sort((a, b) => (b.stockValue ?? b.retailValue) - (a.stockValue ?? a.retailValue));

        const revenue = rows.reduce((n, r) => n + r.revenue, 0);
        const costed = rows.filter((r) => r.cost != null);
        const cost = costed.reduce((n, r) => n + (r.cost ?? 0), 0);
        const costedRevenue = costed.reduce((n, r) => n + r.revenue, 0);
        const profit = costedRevenue - cost;

        return {
            from, to,
            totals: {
                revenue: round(revenue),
                units: rows.reduce((n, r) => n + r.units, 0),
                products: rows.length,
                cost: round(cost),
                profit: round(profit),
                margin: costedRevenue ? profit / costedRevenue : null,
                // share of revenue whose cost is known (profit only covers that part)
                costCoverage: revenue ? costedRevenue / revenue : 1,
                estimated: rows.some((r) => r.costEstimated),
                slowMoverStockValue: round(slowMovers.reduce((n, s) => n + (s.stockValue ?? 0), 0)),
            },
            products: rows,
            categories: rollup((r) => [r.categoryId ?? 'none', r.category ?? 'Uncategorised']),
            brands: rollup((r) => [(r.brand ?? '').toLowerCase() || 'none', r.brand ?? 'No brand']),
            slowMovers,
        };
    }
}

const round = (n: number) => Math.round(n * 100) / 100;
function pick<T extends Record<string, unknown>>(o: T, keys: string[]) {
    return Object.fromEntries(keys.map((k) => [k, o[k]]));
}
