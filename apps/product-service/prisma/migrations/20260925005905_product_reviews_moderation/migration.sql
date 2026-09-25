-- AlterTable
ALTER TABLE "product_reviews" ADD COLUMN     "fitted" BOOLEAN,
ADD COLUMN     "hidden_reason" TEXT,
ADD COLUMN     "order_id" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'PUBLISHED',
ADD COLUMN     "vehicle" TEXT;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "rating_avg" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "rating_count" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "product_reviews_status_idx" ON "product_reviews"("status");
