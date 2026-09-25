import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from '../../libs/prisma/prisma.service';
import { Prisma } from '../generated/prisma';
import { CacheService } from './cache.service';
import { DEFAULT_REORDER_LEVEL, LowStockHit, LowStockNotifier } from './low-stock.notifier';

export const ADJUST_REASONS = ['COUNT', 'DAMAGED', 'LOST', 'FOUND', 'OTHER'] as const;
export type AdjustReason = (typeof ADJUST_REASONS)[number];
const ADJUST_LABEL: Record<AdjustReason, string> = {
    COUNT: 'Stock count correction',
    DAMAGED: 'Damaged / written off',
    LOST: 'Lost / missing',
    FOUND: 'Found',
    OTHER: 'Other',
};

type Tx = Prisma.TransactionClient;
type Change = { productId: string; delta?: number; setTo?: number; reason: string; reference?: string | null; note?: string | null; actor?: string | null };

const bad = (message: string, statusCode = 400): never => {
    throw new RpcException({ statusCode, message, error: statusCode === 404 ? 'Not Found' : 'Bad Request' });
};

/**
 * Manual stock operations for staff: adjustments, deliveries from suppliers
 * (stock receipts / GRNs), CSV bulk updates, the movement log and stock levels.
 * Every change writes a StockMovement with who made it and why.
 */
@Injectable()
export class InventoryService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly cache: CacheService,
        private readonly lowStock: LowStockNotifier,
    ) { }

    // ── core ────────────────────────────────────────────────

    /** Apply one stock change inside a transaction; returns a low-stock hit if it crossed the reorder level. */
    private async apply(tx: Tx, c: Change): Promise<LowStockHit | null> {
        // row lock so concurrent orders/adjustments can't interleave
        const rows = await tx.$queryRaw<{ stock_qty: number; min_stock_qty: number | null; sku: string; name: string }[]>`
            SELECT stock_qty, min_stock_qty, sku, name FROM products WHERE id = ${c.productId} FOR UPDATE`;
        const p = rows[0];
        if (!p) bad('Product not found', 404);
        const before = p.stock_qty;
        const after = c.setTo !== undefined ? c.setTo : before + (c.delta ?? 0);
        if (after < 0) bad(`${p.sku}: stock can't go below zero (currently ${before}).`);
        if (after === before) return null;

        await tx.product.update({ where: { id: c.productId }, data: { stockQty: after, isInStock: after > 0 } });
        await tx.stockMovement.create({
            data: { productId: c.productId, change: after - before, stockAfter: after, reason: c.reason, reference: c.reference ?? null, note: c.note ?? null, actor: c.actor ?? null },
        });
        return LowStockNotifier.crossed(before, after, p.min_stock_qty)
            ? { productId: c.productId, sku: p.sku, name: p.name, stockAfter: after, reorderLevel: p.min_stock_qty ?? DEFAULT_REORDER_LEVEL }
            : null;
    }

    private async afterCommit(productIds: string[], hits: (LowStockHit | null)[], cause: string) {
        await Promise.all([...new Set(productIds)].map((id) => this.cache.invalidateProductCache(id)));
        this.lowStock.notify(hits.filter((h): h is LowStockHit => !!h), cause);
    }

    private async grnNumber() {
        const d = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        for (let i = 0; i < 5; i++) {
            const n = `GRN-${d}-${Math.floor(1000 + Math.random() * 9000)}`;
            if (!(await this.prisma.stockReceipt.findUnique({ where: { grnNumber: n } }))) return n;
        }
        return `GRN-${d}-${Date.now().toString().slice(-6)}`;
    }

    // ── adjustments ─────────────────────────────────────────

    /** Correct stock by a delta (+/-) or set it to a counted number. Reason required. */
    async adjust(input: { productId: string; mode: 'CHANGE' | 'SET'; quantity: number; reason: AdjustReason; note?: string; actor?: string }) {
        if (!ADJUST_REASONS.includes(input.reason)) bad('Choose a reason for the adjustment.');
        const q = Math.trunc(Number(input.quantity));
        if (!Number.isFinite(q) || (input.mode === 'SET' ? q < 0 : q === 0)) bad(input.mode === 'SET' ? 'Enter the counted quantity (0 or more).' : 'Enter a non-zero change.');
        const note = [ADJUST_LABEL[input.reason], input.note?.trim()].filter(Boolean).join(' — ').slice(0, 500);

        const hit = await this.prisma.$transaction((tx) =>
            this.apply(tx, { productId: input.productId, ...(input.mode === 'SET' ? { setTo: q } : { delta: q }), reason: 'ADJUSTMENT', note, actor: input.actor }),
        );
        await this.afterCommit([input.productId], [hit], 'adjustment');
        return this.prisma.product.findUnique({ where: { id: input.productId }, select: { id: true, sku: true, name: true, stockQty: true, minStockQty: true } });
    }

    // ── deliveries (GRN) ────────────────────────────────────

    async receive(input: {
        supplierId?: string; supplierName?: string; supplierRef?: string; note?: string; actor?: string; updateCost?: boolean;
        lines: { productId?: string; sku?: string; quantity: number; unitCost?: number | null }[];
    }) {
        const lines = (input.lines ?? []).filter((l) => Number(l.quantity) > 0);
        if (!lines.length) bad('Add at least one product with a quantity.');

        // resolve products by id or SKU
        const ids = lines.map((l) => l.productId).filter(Boolean) as string[];
        const skus = lines.filter((l) => !l.productId && l.sku).map((l) => l.sku!.trim());
        const products = await this.prisma.product.findMany({
            where: { OR: [{ id: { in: ids } }, { sku: { in: skus, mode: 'insensitive' } }] },
            select: { id: true, sku: true, name: true },
        });
        const byId = new Map(products.map((p) => [p.id, p]));
        const bySku = new Map(products.map((p) => [p.sku.toLowerCase(), p]));
        const resolved = lines.map((l) => {
            const p = l.productId ? byId.get(l.productId) : bySku.get((l.sku ?? '').trim().toLowerCase());
            if (!p) bad(`Unknown product ${l.sku ?? l.productId}.`);
            return { product: p!, quantity: Math.trunc(Number(l.quantity)), unitCost: l.unitCost != null && Number(l.unitCost) >= 0 ? Number(l.unitCost) : null };
        });

        // supplier: existing, or create by name on the fly
        let supplierId = input.supplierId ?? null;
        if (!supplierId && input.supplierName?.trim()) {
            const name = input.supplierName.trim().slice(0, 120);
            supplierId = (await this.prisma.supplier.upsert({ where: { name }, update: {}, create: { name } })).id;
        }

        const grnNumber = await this.grnNumber();
        const totalCost = resolved.reduce((n, l) => n + (l.unitCost ?? 0) * l.quantity, 0);
        const { receipt, hits } = await this.prisma.$transaction(async (tx) => {
            const receipt = await tx.stockReceipt.create({
                data: {
                    grnNumber, supplierId, supplierRef: input.supplierRef?.trim() || null, note: input.note?.trim() || null, actor: input.actor ?? null, totalCost,
                    lines: { create: resolved.map((l) => ({ productId: l.product.id, sku: l.product.sku, name: l.product.name, quantity: l.quantity, unitCost: l.unitCost })) },
                },
                include: { lines: true, supplier: true },
            });
            const hits: (LowStockHit | null)[] = [];
            for (const l of resolved) {
                hits.push(await this.apply(tx, { productId: l.product.id, delta: l.quantity, reason: 'RESTOCK', reference: receipt.id, note: grnNumber, actor: input.actor }));
                if ((input.updateCost ?? true) && l.unitCost != null) await tx.product.update({ where: { id: l.product.id }, data: { costPrice: l.unitCost } });
            }
            return { receipt, hits };
        });
        await this.afterCommit(resolved.map((l) => l.product.id), hits, grnNumber);
        return receipt;
    }

    async listReceipts(q: { supplierId?: string; page?: number; limit?: number }) {
        const take = Math.min(100, Math.max(1, Number(q.limit) || 20));
        const page = Math.max(1, Number(q.page) || 1);
        const where: Prisma.StockReceiptWhereInput = q.supplierId ? { supplierId: q.supplierId } : {};
        const [data, total] = await Promise.all([
            this.prisma.stockReceipt.findMany({ where, orderBy: { createdAt: 'desc' }, skip: (page - 1) * take, take, include: { lines: true, supplier: { select: { id: true, name: true } } } }),
            this.prisma.stockReceipt.count({ where }),
        ]);
        return { data, meta: { total, page, limit: take, totalPages: Math.max(1, Math.ceil(total / take)) } };
    }

    // ── bulk (CSV) ──────────────────────────────────────────

    /**
     * CSV import. RECEIVE adds quantities as one delivery (GRN); SET overwrites
     * stock with counted numbers (stock take). dryRun previews without saving.
     */
    async bulk(input: { mode: 'RECEIVE' | 'SET'; lines: { sku: string; quantity: number; unitCost?: number | null }[]; dryRun?: boolean; supplierId?: string; supplierName?: string; supplierRef?: string; note?: string; actor?: string }) {
        const lines = (input.lines ?? []).map((l, i) => ({ row: i + 1, sku: String(l.sku ?? '').trim(), quantity: Math.trunc(Number(l.quantity)), unitCost: l.unitCost ?? null }));
        const products = await this.prisma.product.findMany({
            where: { sku: { in: lines.map((l) => l.sku).filter(Boolean), mode: 'insensitive' } },
            select: { id: true, sku: true, name: true, stockQty: true },
        });
        const bySku = new Map(products.map((p) => [p.sku.toLowerCase(), p]));
        const preview = lines.map((l) => {
            const p = bySku.get(l.sku.toLowerCase());
            const problem = !l.sku ? 'Missing SKU'
                : !p ? 'Unknown SKU'
                    : !Number.isFinite(l.quantity) || l.quantity < 0 || (input.mode === 'RECEIVE' && l.quantity === 0) ? 'Invalid quantity' : null;
            return {
                row: l.row, sku: l.sku, quantity: l.quantity, unitCost: l.unitCost, productId: p?.id ?? null, name: p?.name ?? null,
                current: p?.stockQty ?? null, after: p && !problem ? (input.mode === 'SET' ? l.quantity : p.stockQty + l.quantity) : null, problem,
            };
        });
        const ok = preview.filter((l) => !l.problem);
        const summary = { rows: lines.length, valid: ok.length, invalid: lines.length - ok.length };
        if (input.dryRun) return { mode: input.mode, summary, preview };
        if (!ok.length) bad('No valid rows to import.');

        if (input.mode === 'RECEIVE') {
            const receipt = await this.receive({
                supplierId: input.supplierId, supplierName: input.supplierName, supplierRef: input.supplierRef, note: input.note ?? 'CSV import', actor: input.actor,
                lines: ok.map((l) => ({ productId: l.productId!, quantity: l.quantity, unitCost: l.unitCost })),
            });
            return { mode: input.mode, summary, grnNumber: receipt.grnNumber, preview };
        }
        const hits = await this.prisma.$transaction(async (tx) => {
            const out: (LowStockHit | null)[] = [];
            for (const l of ok) out.push(await this.apply(tx, { productId: l.productId!, setTo: l.quantity, reason: 'ADJUSTMENT', note: `Stock take (CSV)${input.note ? ` — ${input.note}` : ''}`, actor: input.actor }));
            return out;
        });
        await this.afterCommit(ok.map((l) => l.productId!), hits, 'stock take');
        return { mode: input.mode, summary, preview };
    }

    // ── reporting ───────────────────────────────────────────

    async movements(q: { productId?: string; reason?: string; search?: string; from?: string; to?: string; page?: number; limit?: number }) {
        const take = Math.min(200, Math.max(1, Number(q.limit) || 50));
        const page = Math.max(1, Number(q.page) || 1);
        const where: Prisma.StockMovementWhereInput = {};
        if (q.productId) where.productId = q.productId;
        if (q.reason) where.reason = q.reason;
        if (q.from || q.to) where.createdAt = { ...(q.from ? { gte: new Date(q.from) } : {}), ...(q.to ? { lte: new Date(q.to) } : {}) };
        if (q.search?.trim()) {
            const ids = await this.prisma.product.findMany({
                where: { OR: [{ sku: { contains: q.search.trim(), mode: 'insensitive' } }, { name: { contains: q.search.trim(), mode: 'insensitive' } }] },
                select: { id: true }, take: 200,
            });
            where.productId = { in: ids.map((i) => i.id) };
        }
        const [rows, total] = await Promise.all([
            this.prisma.stockMovement.findMany({ where, orderBy: { createdAt: 'desc' }, skip: (page - 1) * take, take }),
            this.prisma.stockMovement.count({ where }),
        ]);
        const products = await this.prisma.product.findMany({ where: { id: { in: [...new Set(rows.map((r) => r.productId))] } }, select: { id: true, sku: true, name: true } });
        const byId = new Map(products.map((p) => [p.id, p]));
        return {
            data: rows.map((r) => ({ ...r, product: byId.get(r.productId) ?? null })),
            meta: { total, page, limit: take, totalPages: Math.max(1, Math.ceil(total / take)) },
        };
    }

    /** Stock levels with value at cost; filter: all | low | out. */
    /**
     * Compact product facts for reports: all products (active or not) that have
     * the given ids, plus every active product so slow movers can be found.
     */
    async lookup(q: { ids?: string[] }) {
        const ids = (q?.ids ?? []).filter((id) => typeof id === 'string').slice(0, 5000);
        const rows = await this.prisma.product.findMany({
            where: { OR: [{ isActive: true }, ...(ids.length ? [{ id: { in: ids } }] : [])] },
            select: {
                id: true, sku: true, name: true, brand: true, costPrice: true, price: true,
                stockQty: true, isActive: true, createdAt: true, category: { select: { id: true, name: true } },
            },
        });
        return rows.map((p) => ({
            id: p.id, sku: p.sku, name: p.name, brand: p.brand,
            categoryId: p.category?.id ?? null, category: p.category?.name ?? null,
            costPrice: p.costPrice == null ? null : Number(p.costPrice),
            price: Number(p.price), stockQty: p.stockQty, isActive: p.isActive, createdAt: p.createdAt,
        }));
    }

    async levels(q: { filter?: 'all' | 'low' | 'out'; search?: string; page?: number; limit?: number }) {
        const take = Math.min(200, Math.max(1, Number(q.limit) || 50));
        const page = Math.max(1, Number(q.page) || 1);
        const where: Prisma.ProductWhereInput = { isActive: true };
        if (q.search?.trim()) {
            const s = q.search.trim();
            where.OR = [{ sku: { contains: s, mode: 'insensitive' } }, { name: { contains: s, mode: 'insensitive' } }, { brand: { contains: s, mode: 'insensitive' } }];
        }
        if (q.filter === 'out') where.stockQty = { lte: 0 };
        if (q.filter === 'low') {
            // column-to-column comparison needs SQL
            const low = await this.prisma.$queryRaw<{ id: string }[]>`
                SELECT id FROM products WHERE is_active AND stock_qty > 0 AND stock_qty <= COALESCE(min_stock_qty, ${DEFAULT_REORDER_LEVEL})`;
            where.id = { in: low.map((r) => r.id) };
        }
        const [data, total, summary] = await Promise.all([
            this.prisma.product.findMany({
                where, orderBy: [{ stockQty: 'asc' }, { name: 'asc' }], skip: (page - 1) * take, take,
                select: { id: true, sku: true, name: true, brand: true, stockQty: true, minStockQty: true, costPrice: true, price: true, images: { take: 1, orderBy: { order: 'asc' }, select: { url: true } } },
            }),
            this.prisma.product.count({ where }),
            this.prisma.$queryRaw<{ units: bigint; value: number | null; low: bigint; out: bigint; skus: bigint }[]>`
                SELECT COALESCE(SUM(GREATEST(stock_qty,0)),0) AS units,
                       COALESCE(SUM(GREATEST(stock_qty,0) * COALESCE(cost_price, 0)),0)::float AS value,
                       COUNT(*) FILTER (WHERE stock_qty > 0 AND stock_qty <= COALESCE(min_stock_qty, ${DEFAULT_REORDER_LEVEL})) AS low,
                       COUNT(*) FILTER (WHERE stock_qty <= 0) AS out,
                       COUNT(*) AS skus
                FROM products WHERE is_active`,
        ]);
        const s = summary[0];
        return {
            data: data.map((p) => ({ ...p, image: p.images[0]?.url ?? null, images: undefined, reorderLevel: p.minStockQty ?? DEFAULT_REORDER_LEVEL })),
            meta: { total, page, limit: take, totalPages: Math.max(1, Math.ceil(total / take)) },
            summary: { skus: Number(s?.skus ?? 0), units: Number(s?.units ?? 0), stockValue: Number(s?.value ?? 0), low: Number(s?.low ?? 0), out: Number(s?.out ?? 0) },
        };
    }

    /** All active products for a CSV download. */
    async export() {
        return this.prisma.product.findMany({
            where: { isActive: true }, orderBy: { sku: 'asc' },
            select: { sku: true, name: true, brand: true, stockQty: true, minStockQty: true, costPrice: true, price: true },
        });
    }

    // ── suppliers ───────────────────────────────────────────

    listSuppliers() {
        return this.prisma.supplier.findMany({ orderBy: { name: 'asc' }, include: { _count: { select: { receipts: true } } } });
    }

    async saveSupplier(input: { id?: string; name: string; contactName?: string; phone?: string; email?: string; notes?: string; isActive?: boolean }) {
        const name = input.name?.trim();
        if (!name) bad('Supplier name is required.');
        const data = {
            name: name!.slice(0, 120), contactName: input.contactName?.trim() || null, phone: input.phone?.trim() || null,
            email: input.email?.trim() || null, notes: input.notes?.trim() || null, ...(input.isActive !== undefined ? { isActive: input.isActive } : {}),
        };
        try {
            return input.id ? await this.prisma.supplier.update({ where: { id: input.id }, data }) : await this.prisma.supplier.create({ data });
        } catch (e) {
            if ((e as { code?: string }).code === 'P2002') bad(`A supplier called "${name}" already exists.`);
            throw e;
        }
    }
}
