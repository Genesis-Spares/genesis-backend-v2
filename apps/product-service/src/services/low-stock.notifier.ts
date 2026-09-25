import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

export interface LowStockHit {
    productId: string;
    sku: string;
    name: string;
    stockAfter: number;
    reorderLevel: number;
}

/** Default reorder level when a product has no minStockQty (matches the dashboard). */
export const DEFAULT_REORDER_LEVEL = 5;

/**
 * Tells staff when a product *crosses* its reorder level (was above, now at/below),
 * so one sale doesn't trigger an alert every time stock is already low.
 */
@Injectable()
export class LowStockNotifier {
    private readonly logger = new Logger(LowStockNotifier.name);

    constructor(@Inject('NOTIFICATION_SERVICE') private readonly notifications: ClientProxy) { }

    static crossed(before: number, after: number, min: number | null | undefined) {
        const level = min ?? DEFAULT_REORDER_LEVEL;
        return before > level && after <= level;
    }

    notify(hits: LowStockHit[], cause: string) {
        if (!hits.length) return;
        this.logger.warn(`Low stock (${cause}): ${hits.map((h) => `${h.sku}=${h.stockAfter}`).join(', ')}`);
        try {
            this.notifications.emit('inventory.low_stock', { products: hits, cause })
                .subscribe({ error: (e) => this.logger.warn(`Low-stock alert not queued: ${(e as Error)?.message}`) });
        } catch (e) {
            this.logger.warn(`Low-stock alert not queued: ${(e as Error)?.message}`);
        }
    }
}
