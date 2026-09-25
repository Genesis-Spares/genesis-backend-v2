-- CreateTable
CREATE TABLE "email_messages" (
    "id" TEXT NOT NULL,
    "subject" TEXT NOT NULL DEFAULT '',
    "html" TEXT NOT NULL DEFAULT '',
    "cc" TEXT[],
    "bcc" TEXT[],
    "attachments" JSONB,
    "branded" BOOLEAN NOT NULL DEFAULT true,
    "marketing" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "created_by_id" TEXT,
    "created_by_email" TEXT,
    "sent_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "email_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "email_recipients" (
    "id" TEXT NOT NULL,
    "email_message_id" TEXT NOT NULL,
    "customer_id" TEXT,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "error" TEXT,
    "sent_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "email_recipients_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "email_messages_status_idx" ON "email_messages"("status");

-- CreateIndex
CREATE INDEX "email_messages_updated_at_idx" ON "email_messages"("updated_at");

-- CreateIndex
CREATE INDEX "email_recipients_email_message_id_idx" ON "email_recipients"("email_message_id");

-- CreateIndex
CREATE INDEX "email_recipients_customer_id_idx" ON "email_recipients"("customer_id");

-- AddForeignKey
ALTER TABLE "email_recipients" ADD CONSTRAINT "email_recipients_email_message_id_fkey" FOREIGN KEY ("email_message_id") REFERENCES "email_messages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "email_recipients" ADD CONSTRAINT "email_recipients_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
