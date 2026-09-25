-- AlterTable
ALTER TABLE "products" ADD COLUMN     "is_universal" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "product_fitments" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year_from" INTEGER,
    "year_to" INTEGER,
    "engine" TEXT,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_fitments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "product_fitments_product_id_idx" ON "product_fitments"("product_id");

-- CreateIndex
CREATE INDEX "product_fitments_make_model_idx" ON "product_fitments"("make", "model");

-- AddForeignKey
ALTER TABLE "product_fitments" ADD CONSTRAINT "product_fitments_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Backfill: turn free-text compatibility like "Toyota Camry 2018-2024, Honda Accord 2019-2025"
-- into structured rows. Entries that don't look like "Make Model YYYY[-YYYY]" are left as text only.
INSERT INTO "product_fitments" ("id", "product_id", "make", "model", "year_from", "year_to")
SELECT gen_random_uuid()::text, p."id", initcap(m[1]), m[2], m[3]::int, COALESCE(m[4], m[3])::int
FROM "products" p
CROSS JOIN LATERAL unnest(string_to_array(p."compatibility", ',')) AS part
CROSS JOIN LATERAL regexp_matches(btrim(part), '^([A-Za-z-]+)\s+(.+?)\s+(\d{4})(?:\s*[-–]\s*(\d{4}))?$') AS m
WHERE p."compatibility" IS NOT NULL;
