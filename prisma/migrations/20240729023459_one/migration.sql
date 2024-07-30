/*
  Warnings:

  - The primary key for the `Address` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `addressid` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `postcode` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `streetline1` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `streetline2` on the `Address` table. All the data in the column will be lost.
  - The primary key for the `Customer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `customerid` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `dateofbirth` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `firstname` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `passportnumber` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the `_AddressToCustomer` table. If the table is not empty, all the data it contains will be lost.
  - The required column `id` was added to the `Address` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `postalCode` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `streetLine1` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressId` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateOfBirth` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Customer` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `lastName` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passportNumber` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_AddressToCustomer" DROP CONSTRAINT "_AddressToCustomer_A_fkey";

-- DropForeignKey
ALTER TABLE "_AddressToCustomer" DROP CONSTRAINT "_AddressToCustomer_B_fkey";

-- AlterTable
ALTER TABLE "Address" DROP CONSTRAINT "Address_pkey",
DROP COLUMN "addressid",
DROP COLUMN "postcode",
DROP COLUMN "streetline1",
DROP COLUMN "streetline2",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "postalCode" TEXT NOT NULL,
ADD COLUMN     "streetLine1" TEXT NOT NULL,
ADD COLUMN     "streetLine2" TEXT,
ALTER COLUMN "unit" SET DATA TYPE TEXT,
ALTER COLUMN "suburb" SET DATA TYPE TEXT,
ALTER COLUMN "city" SET DATA TYPE TEXT,
ALTER COLUMN "country" SET DATA TYPE TEXT,
ADD CONSTRAINT "Address_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_pkey",
DROP COLUMN "customerid",
DROP COLUMN "dateofbirth",
DROP COLUMN "firstname",
DROP COLUMN "lastname",
DROP COLUMN "passportnumber",
DROP COLUMN "phone",
ADD COLUMN     "addressId" TEXT NOT NULL,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "passportNumber" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ALTER COLUMN "email" SET DATA TYPE TEXT,
ALTER COLUMN "nationality" SET DATA TYPE TEXT,
ADD CONSTRAINT "Customer_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "_AddressToCustomer";

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "customerId" TEXT NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VisaApplication" (
    "id" TEXT NOT NULL,
    "visaType" TEXT NOT NULL,
    "applicationDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,

    CONSTRAINT "VisaApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkillsAssessment" (
    "id" TEXT NOT NULL,
    "assessmentType" TEXT NOT NULL,
    "assessmentDate" TIMESTAMP(3) NOT NULL,
    "result" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,

    CONSTRAINT "SkillsAssessment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobReadyProgram" (
    "id" TEXT NOT NULL,
    "programType" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "completionDate" TIMESTAMP(3) NOT NULL,
    "serviceId" TEXT NOT NULL,

    CONSTRAINT "JobReadyProgram_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VisaApplication" ADD CONSTRAINT "VisaApplication_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillsAssessment" ADD CONSTRAINT "SkillsAssessment_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobReadyProgram" ADD CONSTRAINT "JobReadyProgram_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
