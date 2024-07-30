-- CreateTable
CREATE TABLE "Address" (
    "addressid" SERIAL NOT NULL,
    "unit" VARCHAR(10),
    "streetline1" VARCHAR(100) NOT NULL,
    "streetline2" VARCHAR(100),
    "suburb" VARCHAR(50),
    "postcode" VARCHAR(10) NOT NULL,
    "city" VARCHAR(50) NOT NULL,
    "country" VARCHAR(50) NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("addressid")
);

-- CreateTable
CREATE TABLE "Customer" (
    "customerid" SERIAL NOT NULL,
    "firstname" VARCHAR(50) NOT NULL,
    "lastname" VARCHAR(50) NOT NULL,
    "dateofbirth" DATE NOT NULL,
    "phone" VARCHAR(15) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "passportnumber" VARCHAR(20) NOT NULL,
    "nationality" VARCHAR(50) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("customerid")
);

-- CreateTable
CREATE TABLE "_AddressToCustomer" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AddressToCustomer_AB_unique" ON "_AddressToCustomer"("A", "B");

-- CreateIndex
CREATE INDEX "_AddressToCustomer_B_index" ON "_AddressToCustomer"("B");

-- AddForeignKey
ALTER TABLE "_AddressToCustomer" ADD CONSTRAINT "_AddressToCustomer_A_fkey" FOREIGN KEY ("A") REFERENCES "Address"("addressid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AddressToCustomer" ADD CONSTRAINT "_AddressToCustomer_B_fkey" FOREIGN KEY ("B") REFERENCES "Customer"("customerid") ON DELETE CASCADE ON UPDATE CASCADE;
