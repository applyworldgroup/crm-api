/*
  Warnings:

  - You are about to drop the column `addressId` on the `Customer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_addressId_fkey";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "addressId";

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_id_fkey" FOREIGN KEY ("id") REFERENCES "Address"("id") ON DELETE CASCADE ON UPDATE CASCADE;
