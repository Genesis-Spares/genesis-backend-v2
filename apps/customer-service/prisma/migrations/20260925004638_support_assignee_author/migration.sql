-- AlterTable
ALTER TABLE "support_message_replies" ADD COLUMN     "author_name" TEXT;

-- AlterTable
ALTER TABLE "support_messages" ADD COLUMN     "assigned_to_name" TEXT;

-- CreateIndex
CREATE INDEX "support_messages_assigned_to_idx" ON "support_messages"("assigned_to");
