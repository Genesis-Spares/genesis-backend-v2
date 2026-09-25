import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { PrismaService } from '../../libs/prisma/prisma.service';
import { CacheService } from './cache.service';
import { Prisma } from '../generated/prisma';

type Sort = 'recent' | 'highest' | 'lowest';

export interface UpsertReviewInput {
    productId: string;
    userId: string;
    firstName?: string;
    lastName?: string;
    rating: number;
    title?: string;
    content?: string;
    vehicle?: string;
    fitted?: boolean | null;
}

const bad = (message: string, statusCode = 400): never => {
    throw new RpcException({ statusCode, message, error: statusCode === 403 ? 'Forbidden' : statusCode === 404 ? 'Not Found' : 'Bad Request' });
};

/** "Jane", "Wanjiku" → "Jane W." — reviews never show a full surname or email. */
const displayName = (first?: string, last?: string) => {
    const f = (first ?? '').trim().slice(0, 40);
    const l = (last ?? '').trim();
    return f ? `${f}${l ? ` ${l[0].toUpperCase()}.` : ''}` : 'Verified buyer';
};

/** Public shape: no user ids, order ids or moderation notes. */
const toPublic = (r: {
    id: string; rating: number; title: string | null; content: string | null; userName: string;
    vehicle: string | null; fitted: boolean | null; isVerified: boolean; createdAt: Date; updatedAt: Date;
}) => ({
    id: r.id, rating: r.rating, title: r.title, content: r.content, userName: r.userName,
    vehicle: r.vehicle, fitted: r.fitted, isVerified: r.isVerified, createdAt: r.createdAt, updatedAt: r.updatedAt,
});

/**
 * Product reviews. Only customers with a DELIVERED order containing the
 * product may review it (verified purchase) — one review each, editable.
 * Moderators can hide reviews; only PUBLISHED ones count toward the rating.
 */
@Injectable()
export class ReviewService {
    private readonly logger = new Logger(ReviewService.name);

    constructor(
        private readonly prisma: PrismaService,
        private readonly cache: CacheService,
        @Inject('ORDER_SERVICE') private readonly orderClient: ClientProxy,
    ) { }

    // ── helpers ─────────────────────────────────────────────

    private async deliveredPurchase(userId: string, productId: string) {
        try {
            return await firstValueFrom(
                this.orderClient.send<{ id: string; orderNumber: string } | null>('order.purchase.check', { customerId: userId, productId }).pipe(timeout(8000)),
            );
        } catch (e) {
            this.logger.error('Purchase check failed', e as Error);
            return bad("We couldn't verify your purchase right now. Please try again shortly.", 503);
        }
    }

    /** Recalculate a product's rating from its PUBLISHED reviews. */
    private async refreshStats(tx: Prisma.TransactionClient, productId: string) {
        const agg = await tx.productReview.aggregate({
            where: { productId, status: 'PUBLISHED' },
            _avg: { rating: true },
            _count: { _all: true },
        });
        await tx.product.update({
            where: { id: productId },
            data: { ratingAvg: Math.round((agg._avg.rating ?? 0) * 10) / 10, ratingCount: agg._count._all },
        });
    }

    // ── public ──────────────────────────────────────────────

    /** Published reviews for a product + summary (average, star breakdown, fit rate). */
    async listForProduct(productId: string, page = 1, limit = 10, sort: Sort = 'recent') {
        const take = Math.min(50, Math.max(1, Number(limit) || 10));
        const skip = (Math.max(1, Number(page) || 1) - 1) * take;
        const where = { productId, status: 'PUBLISHED' };
        const orderBy: Prisma.ProductReviewOrderByWithRelationInput[] =
            sort === 'highest' ? [{ rating: 'desc' }, { createdAt: 'desc' }]
                : sort === 'lowest' ? [{ rating: 'asc' }, { createdAt: 'desc' }]
                    : [{ createdAt: 'desc' }];

        const [rows, total, byStar, fit] = await Promise.all([
            this.prisma.productReview.findMany({ where, orderBy, skip, take }),
            this.prisma.productReview.count({ where }),
            this.prisma.productReview.groupBy({ by: ['rating'], where, _count: { _all: true } }),
            this.prisma.productReview.groupBy({ by: ['fitted'], where: { ...where, fitted: { not: null } }, _count: { _all: true } }),
        ]);

        const distribution = [5, 4, 3, 2, 1].map((star) => ({ star, count: byStar.find((b) => b.rating === star)?._count._all ?? 0 }));
        const sum = distribution.reduce((n, d) => n + d.star * d.count, 0);
        const fitYes = fit.find((f) => f.fitted === true)?._count._all ?? 0;
        const fitAnswers = fit.reduce((n, f) => n + f._count._all, 0);

        return {
            data: rows.map(toPublic),
            meta: { total, page: Math.max(1, Number(page) || 1), limit: take, totalPages: Math.max(1, Math.ceil(total / take)) },
            summary: {
                average: total ? Math.round((sum / total) * 10) / 10 : 0,
                count: total,
                distribution,
                fitRate: fitAnswers ? Math.round((fitYes / fitAnswers) * 100) : null,
                fitAnswers,
            },
        };
    }

    // ── shopper ─────────────────────────────────────────────

    /** Can this shopper review the product, and have they already? */
    async eligibility(userId: string, productId: string) {
        const existing = await this.prisma.productReview.findUnique({ where: { productId_userId: { productId, userId } } });
        if (existing) {
            return { canReview: true, reason: 'EXISTING', review: { ...toPublic(existing), status: existing.status } };
        }
        const purchase = await this.deliveredPurchase(userId, productId);
        return purchase
            ? { canReview: true, reason: 'PURCHASED', review: null }
            : { canReview: false, reason: 'NOT_PURCHASED', review: null };
    }

    /** Create or edit the shopper's own review. */
    async upsert(input: UpsertReviewInput) {
        const rating = Math.round(Number(input.rating));
        if (!(rating >= 1 && rating <= 5)) bad('Choose a rating from 1 to 5 stars.');
        const product = await this.prisma.product.findUnique({ where: { id: input.productId }, select: { id: true } });
        if (!product) bad('Product not found', 404);

        const existing = await this.prisma.productReview.findUnique({ where: { productId_userId: { productId: input.productId, userId: input.userId } } });
        let orderId = existing?.orderId ?? null;
        if (!existing) {
            const purchase = await this.deliveredPurchase(input.userId, input.productId);
            if (!purchase) bad('You can review this part once an order containing it has been delivered to you.', 403);
            orderId = purchase!.id;
        }
        if (existing?.status === 'HIDDEN') bad('This review was removed by our team and can no longer be edited.', 403);

        const clean = (v?: string, max = 1000) => (v ?? '').trim().slice(0, max) || null;
        const data = {
            rating,
            title: clean(input.title, 120),
            content: clean(input.content, 2000),
            vehicle: clean(input.vehicle, 80),
            fitted: typeof input.fitted === 'boolean' ? input.fitted : null,
            userName: displayName(input.firstName, input.lastName),
        };

        const review = await this.prisma.$transaction(async (tx) => {
            const r = existing
                ? await tx.productReview.update({ where: { id: existing.id }, data })
                : await tx.productReview.create({ data: { ...data, productId: input.productId, userId: input.userId, orderId, isVerified: true, status: 'PUBLISHED', images: [] } });
            await this.refreshStats(tx, input.productId);
            return r;
        });
        await this.cache.invalidateProductCache(input.productId);
        return { ...toPublic(review), status: review.status };
    }

    async deleteOwn(userId: string, productId: string) {
        const existing = await this.prisma.productReview.findUnique({ where: { productId_userId: { productId, userId } } });
        if (!existing) bad('Review not found', 404);
        await this.prisma.$transaction(async (tx) => {
            await tx.productReview.delete({ where: { id: existing!.id } });
            await this.refreshStats(tx, productId);
        });
        await this.cache.invalidateProductCache(productId);
        return { success: true };
    }

    // ── admin ───────────────────────────────────────────────

    async listAll(query: { status?: string; rating?: number; search?: string; productId?: string; page?: number; limit?: number }) {
        const take = Math.min(100, Math.max(1, Number(query.limit) || 20));
        const page = Math.max(1, Number(query.page) || 1);
        const where: Prisma.ProductReviewWhereInput = {};
        if (query.status) where.status = query.status;
        if (query.rating) where.rating = Number(query.rating);
        if (query.productId) where.productId = query.productId;
        if (query.search?.trim()) {
            const q = query.search.trim();
            where.OR = [
                { title: { contains: q, mode: 'insensitive' } },
                { content: { contains: q, mode: 'insensitive' } },
                { userName: { contains: q, mode: 'insensitive' } },
                { vehicle: { contains: q, mode: 'insensitive' } },
                { product: { name: { contains: q, mode: 'insensitive' } } },
            ];
        }
        const [data, total] = await Promise.all([
            this.prisma.productReview.findMany({
                where, orderBy: { createdAt: 'desc' }, skip: (page - 1) * take, take,
                include: { product: { select: { id: true, name: true, sku: true, ratingAvg: true, ratingCount: true } } },
            }),
            this.prisma.productReview.count({ where }),
        ]);
        return { data, meta: { total, page, limit: take, totalPages: Math.max(1, Math.ceil(total / take)) } };
    }

    /** Hide (with a reason) or re-publish a review. */
    async moderate(id: string, status: 'PUBLISHED' | 'HIDDEN', reason?: string) {
        if (!['PUBLISHED', 'HIDDEN'].includes(status)) bad('Status must be PUBLISHED or HIDDEN');
        const existing = await this.prisma.productReview.findUnique({ where: { id } });
        if (!existing) bad('Review not found', 404);
        if (status === 'HIDDEN' && !reason?.trim()) bad('Give a reason for hiding this review.');

        const review = await this.prisma.$transaction(async (tx) => {
            const r = await tx.productReview.update({
                where: { id },
                data: { status, hiddenReason: status === 'HIDDEN' ? reason!.trim().slice(0, 300) : null },
            });
            await this.refreshStats(tx, existing!.productId);
            return r;
        });
        await this.cache.invalidateProductCache(existing!.productId);
        return review;
    }
}
