import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../libs/prisma/prisma.service';

/**
 * Options for the storefront vehicle picker (Make → Model → Year), built only
 * from fitments of active products — so every choice leads to parts.
 */
@Injectable()
export class VehicleService {
    constructor(private readonly prisma: PrismaService) { }

    private readonly activeProduct = { product: { isActive: true } };

    async makes() {
        const rows = await this.prisma.productFitment.groupBy({
            by: ['make'],
            where: this.activeProduct,
            _count: { _all: true },
            orderBy: { make: 'asc' },
        });
        // case-insensitive merge ("toyota" + "Toyota")
        const merged = new Map<string, { make: string; parts: number }>();
        for (const r of rows) {
            const k = r.make.toLowerCase();
            const cur = merged.get(k);
            merged.set(k, { make: cur?.make ?? r.make, parts: (cur?.parts ?? 0) + r._count._all });
        }
        return [...merged.values()];
    }

    async models(make: string) {
        if (!make?.trim()) return [];
        const rows = await this.prisma.productFitment.groupBy({
            by: ['model'],
            where: { ...this.activeProduct, make: { equals: make.trim(), mode: 'insensitive' } },
            _count: { _all: true },
            orderBy: { model: 'asc' },
        });
        return rows.map((r) => ({ model: r.model, parts: r._count._all }));
    }

    /** Every year covered by any fitment range for this make/model, newest first. */
    async years(make: string, model: string) {
        if (!make?.trim() || !model?.trim()) return [];
        const rows = await this.prisma.productFitment.findMany({
            where: {
                ...this.activeProduct,
                make: { equals: make.trim(), mode: 'insensitive' },
                model: { equals: model.trim(), mode: 'insensitive' },
            },
            select: { yearFrom: true, yearTo: true },
        });
        const now = new Date().getFullYear() + 1;
        const years = new Set<number>();
        for (const r of rows) {
            const from = Math.max(1970, r.yearFrom ?? r.yearTo ?? now - 25);
            const to = Math.min(now, r.yearTo ?? now);
            for (let y = from; y <= to; y++) years.add(y);
        }
        return [...years].sort((a, b) => b - a);
    }
}
