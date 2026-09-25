-- AlterTable
ALTER TABLE "order_status_history" ADD COLUMN     "actor" TEXT,
ADD COLUMN     "is_public" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'STATUS';

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "estimated_delivery_at" TIMESTAMP(3);

-- Backfill: classify existing history rows written by the old code paths
UPDATE "order_status_history" SET "type" = 'PAYMENT', "is_public" = false
    WHERE "note" LIKE 'Payment status changed to %';
UPDATE "order_status_history" SET "type" = 'TRACKING'
    WHERE "note" LIKE 'Tracking added: %';
