import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from '../libs/prisma/prisma.service';
import { DeliveryZone } from './generated/prisma';
import { DeliveryZoneDto, QuoteRequestDto, UpdateCheckoutSettingsDto } from './dto/pricing.dto';

export const round2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;

export const normalizeCity = (city: string) => city.trim().toLowerCase().replace(/\s+/g, ' ');

export interface Quote {
    zone: { id: string; name: string; minDays: number; maxDays: number; allowsCod: boolean };
    currency: 'KES';
    subtotal: number;
    shipping: number;
    taxRate: number;
    taxAmount: number;
    total: number;
    weightKg: number;
    freeDeliveryAbove: number | null;
    /** how much more in goods unlocks free delivery; null when not applicable */
    amountToFreeDelivery: number | null;
}

@Injectable()
export class PricingService {
    constructor(private readonly prisma: PrismaService) { }

    private bad(message: string): never {
        throw new RpcException({ statusCode: 400, message, error: 'Bad Request' });
    }

    async getSettings() {
        const s = await this.prisma.checkoutSettings.upsert({ where: { id: 1 }, create: { id: 1 }, update: {} });
        return { vatRate: Number(s.vatRate), vatOnShipping: s.vatOnShipping, updatedAt: s.updatedAt, updatedBy: s.updatedBy };
    }

    async updateSettings(dto: UpdateCheckoutSettingsDto) {
        await this.prisma.checkoutSettings.upsert({
            where: { id: 1 },
            create: { id: 1, vatRate: dto.vatRate, vatOnShipping: dto.vatOnShipping, updatedBy: dto.updatedBy },
            update: { vatRate: dto.vatRate, vatOnShipping: dto.vatOnShipping, updatedBy: dto.updatedBy },
        });
        return this.getSettings();
    }

    // ── zones ─────────────────────────────────────────────

    listZones(includeInactive = true) {
        return this.prisma.deliveryZone.findMany({
            where: includeInactive ? {} : { isActive: true },
            orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
        });
    }

    /** What the storefront needs to build its town picker and explain fees. */
    async publicZones() {
        const [zones, settings] = await Promise.all([this.listZones(false), this.getSettings()]);
        return {
            vatRate: settings.vatRate,
            vatOnShipping: settings.vatOnShipping,
            zones: zones.map((z) => ({
                id: z.id,
                name: z.name,
                description: z.description,
                cities: z.cities,
                isDefault: z.isDefault,
                fee: Number(z.fee),
                perKgFee: Number(z.perKgFee),
                includedKg: Number(z.includedKg),
                freeAbove: z.freeAbove == null ? null : Number(z.freeAbove),
                minDays: z.minDays,
                maxDays: z.maxDays,
                allowsCod: z.allowsCod,
            })),
        };
    }

    async createZone(dto: DeliveryZoneDto) {
        const data = await this.validateZone(dto);
        return this.prisma.$transaction(async (tx) => {
            if (data.isDefault) await tx.deliveryZone.updateMany({ where: { isDefault: true }, data: { isDefault: false } });
            return tx.deliveryZone.create({ data });
        });
    }

    async updateZone(id: string, dto: DeliveryZoneDto) {
        await this.findZoneOrThrow(id);
        const data = await this.validateZone(dto, id);
        return this.prisma.$transaction(async (tx) => {
            if (data.isDefault) await tx.deliveryZone.updateMany({ where: { isDefault: true, id: { not: id } }, data: { isDefault: false } });
            return tx.deliveryZone.update({ where: { id }, data });
        });
    }

    async deleteZone(id: string) {
        await this.findZoneOrThrow(id);
        await this.prisma.deliveryZone.delete({ where: { id } });
        return { success: true };
    }

    private async findZoneOrThrow(id: string) {
        const zone = await this.prisma.deliveryZone.findUnique({ where: { id } });
        if (!zone) throw new RpcException({ statusCode: 404, message: 'Delivery zone not found', error: 'Not Found' });
        return zone;
    }

    private async validateZone(dto: DeliveryZoneDto, id?: string) {
        const cities = [...new Set((dto.cities ?? []).map(normalizeCity).filter(Boolean))];
        const isDefault = dto.isDefault ?? false;
        const isActive = dto.isActive ?? true;
        if (!isDefault && cities.length === 0) this.bad('List at least one town, or make this the default zone.');
        if (isDefault && !isActive) this.bad('The default zone must be active.');
        const minDays = dto.minDays ?? 1;
        const maxDays = dto.maxDays ?? Math.max(minDays, 3);
        if (maxDays < minDays) this.bad('Maximum delivery days must be at least the minimum.');

        // a town in two active zones would make its fee ambiguous
        if (isActive && cities.length) {
            const clash = await this.prisma.deliveryZone.findFirst({
                where: { isActive: true, cities: { hasSome: cities }, ...(id ? { id: { not: id } } : {}) },
            });
            if (clash) {
                const town = cities.find((c) => clash.cities.includes(c));
                this.bad(`"${town}" is already in the "${clash.name}" zone.`);
            }
        }

        return {
            name: dto.name.trim(),
            description: dto.description?.trim() || null,
            cities,
            isDefault,
            fee: dto.fee,
            perKgFee: dto.perKgFee ?? 0,
            includedKg: dto.includedKg ?? 0,
            freeAbove: dto.freeAbove ?? null,
            minDays,
            maxDays,
            allowsCod: dto.allowsCod ?? false,
            isActive,
            sortOrder: dto.sortOrder ?? 0,
        };
    }

    /** The zone covering `city`, else the default zone, else null (we don't deliver there). */
    async resolveZone(city: string): Promise<DeliveryZone | null> {
        const c = normalizeCity(city ?? '');
        const zones = await this.listZones(false);
        return zones.find((z) => z.cities.includes(c)) ?? zones.find((z) => z.isDefault) ?? null;
    }

    async quote(req: QuoteRequestDto): Promise<Quote> {
        if (!req.items?.length) this.bad('Your cart is empty.');
        const zone = await this.resolveZone(req.city);
        if (!zone) this.bad(`Sorry, we don't deliver to ${req.city.trim() || 'that town'} yet.`);
        const { vatRate, vatOnShipping } = await this.getSettings();

        const subtotal = round2(req.items.reduce((s, i) => s + i.unitPrice * i.quantity, 0));
        const weightKg = round2(req.items.reduce((s, i) => s + (i.weightKg ?? 0) * i.quantity, 0));
        const freeAbove = zone.freeAbove == null ? null : Number(zone.freeAbove);

        let shipping = 0;
        if (freeAbove == null || subtotal < freeAbove) {
            const extraKg = Math.max(0, weightKg - Number(zone.includedKg));
            shipping = round2(Number(zone.fee) + Math.ceil(extraKg) * Number(zone.perKgFee));
        }

        const taxable = subtotal + (vatOnShipping ? shipping : 0);
        // whole shillings: M-Pesa can't charge cents, so the total stays payable as shown
        const taxAmount = Math.round((taxable * vatRate) / 100);

        return {
            zone: { id: zone.id, name: zone.name, minDays: zone.minDays, maxDays: zone.maxDays, allowsCod: zone.allowsCod },
            currency: 'KES',
            subtotal,
            shipping,
            taxRate: vatRate,
            taxAmount,
            total: round2(subtotal + shipping + taxAmount),
            weightKg,
            freeDeliveryAbove: freeAbove,
            amountToFreeDelivery: freeAbove != null && subtotal < freeAbove ? round2(freeAbove - subtotal) : null,
        };
    }
}
