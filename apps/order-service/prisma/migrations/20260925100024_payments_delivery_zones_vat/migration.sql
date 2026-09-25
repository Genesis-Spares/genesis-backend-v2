-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "delivery_zone_name" TEXT,
ADD COLUMN     "payment_due_at" TIMESTAMP(3),
ADD COLUMN     "tax_rate" DECIMAL(5,2);

-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "provider" TEXT NOT NULL DEFAULT 'MPESA',
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "amount" DECIMAL(10,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'KES',
    "phone" TEXT NOT NULL,
    "merchant_request_id" TEXT,
    "checkout_request_id" TEXT,
    "receipt_number" TEXT,
    "result_code" INTEGER,
    "result_desc" TEXT,
    "paid_at" TIMESTAMP(3),
    "raw" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "delivery_zones" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "cities" TEXT[],
    "is_default" BOOLEAN NOT NULL DEFAULT false,
    "fee" DECIMAL(10,2) NOT NULL,
    "per_kg_fee" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "included_kg" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "free_above" DECIMAL(10,2),
    "min_days" INTEGER NOT NULL DEFAULT 1,
    "max_days" INTEGER NOT NULL DEFAULT 3,
    "allows_cod" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "delivery_zones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "checkout_settings" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "vat_rate" DECIMAL(5,2) NOT NULL DEFAULT 16,
    "vat_on_shipping" BOOLEAN NOT NULL DEFAULT true,
    "updated_by" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "checkout_settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "payments_checkout_request_id_key" ON "payments"("checkout_request_id");

-- CreateIndex
CREATE UNIQUE INDEX "payments_receipt_number_key" ON "payments"("receipt_number");

-- CreateIndex
CREATE INDEX "payments_order_id_idx" ON "payments"("order_id");

-- CreateIndex
CREATE INDEX "payments_status_idx" ON "payments"("status");

-- CreateIndex
CREATE INDEX "orders_payment_due_at_idx" ON "orders"("payment_due_at");

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Seed: store settings (16% VAT added on top of prices, also charged on delivery)
INSERT INTO "checkout_settings" ("id", "vat_rate", "vat_on_shipping", "updated_at") VALUES (1, 16, true, CURRENT_TIMESTAMP);

-- Seed: delivery zones matching the fees checkout charged before zones existed
-- (same-day Nairobi free with cash on delivery; countrywide courier KES 450).
-- Edit them from the dashboard; towns not listed anywhere use the default zone.
INSERT INTO "delivery_zones" ("id", "name", "description", "cities", "is_default", "fee", "min_days", "max_days", "allows_cod", "sort_order", "updated_at") VALUES
(gen_random_uuid(), 'Nairobi same-day', 'Same-day delivery within Nairobi', ARRAY['nairobi','nairobi cbd','westlands','kilimani','kileleshwa','lavington','karen','langata','upper hill','parklands','south b','south c','industrial area','embakasi','kasarani','roysambu','donholm','buruburu','eastleigh'], false, 0, 0, 1, true, 0, CURRENT_TIMESTAMP),
(gen_random_uuid(), 'Countrywide courier', 'Courier delivery to the rest of Kenya', ARRAY['mombasa','kisumu','nakuru','eldoret','thika','nyeri','meru','machakos','kitale','malindi','naivasha','kakamega','kericho','embu','nanyuki','kiambu','ruiru','kitengela','athi river','syokimau','ngong','rongai','juja','kitui','garissa','bungoma','busia','voi','narok','kisii','nyahururu','isiolo'], true, 450, 1, 3, false, 1, CURRENT_TIMESTAMP);
