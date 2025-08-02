/*
  Warnings:

  - You are about to drop the column `order` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `order` to the `Package` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Booking_order_key";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "order";

-- AlterTable
ALTER TABLE "Package" ADD COLUMN     "order" INTEGER NOT NULL;
