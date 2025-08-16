/*
  Warnings:

  - A unique constraint covering the columns `[requesterId,responderId,status]` on the table `SwapRequest` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SwapRequest_requesterId_responderId_status_key" ON "SwapRequest"("requesterId", "responderId", "status");
