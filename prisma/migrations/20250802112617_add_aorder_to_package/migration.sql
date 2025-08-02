/*
  Warnings:

  - A unique constraint covering the columns `[order]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "order" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Booking_order_key" ON "Booking"("order");
