import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ReviewService, type UpsertReviewInput } from '../services/review.service';

@Controller()
export class ReviewController {
    constructor(private readonly reviews: ReviewService) { }

    @MessagePattern('review.list.product')
    list(@Payload() d: { productId: string; page?: number; limit?: number; sort?: 'recent' | 'highest' | 'lowest' }) {
        return this.reviews.listForProduct(d.productId, d.page, d.limit, d.sort);
    }

    @MessagePattern('review.eligibility')
    eligibility(@Payload() d: { userId: string; productId: string }) {
        return this.reviews.eligibility(d.userId, d.productId);
    }

    @MessagePattern('review.upsert')
    upsert(@Payload() d: UpsertReviewInput) {
        return this.reviews.upsert(d);
    }

    @MessagePattern('review.delete.own')
    deleteOwn(@Payload() d: { userId: string; productId: string }) {
        return this.reviews.deleteOwn(d.userId, d.productId);
    }

    @MessagePattern('review.list.all')
    listAll(@Payload() q: { status?: string; rating?: number; search?: string; productId?: string; page?: number; limit?: number }) {
        return this.reviews.listAll(q ?? {});
    }

    @MessagePattern('review.moderate')
    moderate(@Payload() d: { id: string; status: 'PUBLISHED' | 'HIDDEN'; reason?: string }) {
        return this.reviews.moderate(d.id, d.status, d.reason);
    }
}
