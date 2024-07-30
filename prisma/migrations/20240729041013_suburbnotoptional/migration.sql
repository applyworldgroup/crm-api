/*
  Warnings:

  - Made the column `suburb` on table `Address` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "suburb" SET NOT NULL;
