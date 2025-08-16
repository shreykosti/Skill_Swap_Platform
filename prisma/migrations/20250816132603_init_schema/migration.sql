/*
  Warnings:

  - A unique constraint covering the columns `[requesterId,responderId]` on the table `SwapRequest` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."SwapRequest_requesterId_responderId_status_key";

-- CreateIndex
CREATE UNIQUE INDEX "SwapRequest_requesterId_responderId_key" ON "public"."SwapRequest"("requesterId", "responderId");
