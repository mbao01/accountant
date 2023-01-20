-- CreateEnum
CREATE TYPE "CurrencyCode" AS ENUM ('USD', 'NGN', 'EUR', 'RUB', 'GBP', 'CNY');

-- CreateEnum
CREATE TYPE "CurrencySign" AS ENUM ('$', '£', '¥', '₽', '₦', '€');

-- CreateEnum
CREATE TYPE "TagColor" AS ENUM ('Red', 'Blue', 'Gray', 'Pink', 'Puce', 'Brown', 'Green', 'Smalt', 'Bisque', 'Damask', 'Jasper', 'Orange', 'Purple', 'Titian', 'Violet', 'Yellow', 'Cattleya', 'Bittersweet');

-- CreateEnum
CREATE TYPE "TagPattern" AS ENUM ('Wavy', 'Ombre', 'Plaid', 'Dotted', 'Floral', 'Zigzag', 'Chevron', 'Circles', 'Diamond', 'Lattice', 'Paisley', 'Rounded', 'Striped', 'Geometric', 'Basketweave');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "passwords" (
    "hash" TEXT NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "sortCode" TEXT,
    "currencyId" TEXT NOT NULL,
    "startingBalance" DOUBLE PRECISION NOT NULL,
    "bankName" TEXT NOT NULL,
    "bankAddress" TEXT,
    "bankCountry" TEXT NOT NULL,
    "tag" "TagPattern" DEFAULT 'Dotted',
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "currencies" (
    "id" TEXT NOT NULL,
    "code" "CurrencyCode" NOT NULL,
    "sign" "CurrencySign" NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "currencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "record_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tag" "TagColor" DEFAULT 'Blue',
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "record_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "record_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "recordTypeId" TEXT NOT NULL,

    CONSTRAINT "record_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "records" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "currencyCode" "CurrencyCode" NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "recordTypeId" TEXT NOT NULL,
    "recordCategoryId" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,

    CONSTRAINT "records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AccountToRecordType" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "passwords_userId_key" ON "passwords"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_id_key" ON "accounts"("id");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_number_key" ON "accounts"("number");

-- CreateIndex
CREATE UNIQUE INDEX "currencies_id_key" ON "currencies"("id");

-- CreateIndex
CREATE UNIQUE INDEX "currencies_code_key" ON "currencies"("code");

-- CreateIndex
CREATE UNIQUE INDEX "currencies_sign_key" ON "currencies"("sign");

-- CreateIndex
CREATE UNIQUE INDEX "record_types_id_key" ON "record_types"("id");

-- CreateIndex
CREATE UNIQUE INDEX "record_categories_id_key" ON "record_categories"("id");

-- CreateIndex
CREATE UNIQUE INDEX "records_id_key" ON "records"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_AccountToRecordType_AB_unique" ON "_AccountToRecordType"("A", "B");

-- CreateIndex
CREATE INDEX "_AccountToRecordType_B_index" ON "_AccountToRecordType"("B");

-- AddForeignKey
ALTER TABLE "passwords" ADD CONSTRAINT "passwords_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "currencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "record_categories" ADD CONSTRAINT "record_categories_recordTypeId_fkey" FOREIGN KEY ("recordTypeId") REFERENCES "record_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "records" ADD CONSTRAINT "records_recordTypeId_fkey" FOREIGN KEY ("recordTypeId") REFERENCES "record_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "records" ADD CONSTRAINT "records_recordCategoryId_fkey" FOREIGN KEY ("recordCategoryId") REFERENCES "record_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "records" ADD CONSTRAINT "records_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountToRecordType" ADD CONSTRAINT "_AccountToRecordType_A_fkey" FOREIGN KEY ("A") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountToRecordType" ADD CONSTRAINT "_AccountToRecordType_B_fkey" FOREIGN KEY ("B") REFERENCES "record_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;
