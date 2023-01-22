/*
  Warnings:

  - Added the required column `createdBy` to the `records` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "records" ADD COLUMN     "createdBy" TEXT NOT NULL,
ALTER COLUMN "amount" SET DATA TYPE DOUBLE PRECISION;

-- AddForeignKey
ALTER TABLE "records" ADD CONSTRAINT "records_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
