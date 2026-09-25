-- CreateTable
CREATE TABLE "product_part_numbers" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "normalized" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'OE',
    "brand" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_part_numbers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "product_part_numbers_normalized_idx" ON "product_part_numbers"("normalized");

-- CreateIndex
CREATE UNIQUE INDEX "product_part_numbers_product_id_normalized_key" ON "product_part_numbers"("product_id", "normalized");

-- AddForeignKey
ALTER TABLE "product_part_numbers" ADD CONSTRAINT "product_part_numbers_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- trigram index so "contains" searches on part numbers stay fast as the catalogue grows
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX IF NOT EXISTS "product_part_numbers_normalized_trgm_idx" ON "product_part_numbers" USING gin ("normalized" gin_trgm_ops);
