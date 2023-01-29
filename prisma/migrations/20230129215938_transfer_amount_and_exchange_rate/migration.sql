/*
  Warnings:

  - Added the required column `receivedAmount` to the `transfers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transfers" ADD COLUMN     "exchangeRate" DOUBLE PRECISION NOT NULL DEFAULT 1,
ADD COLUMN     "receivedAmount" DOUBLE PRECISION NOT NULL;
