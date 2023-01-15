/*
  Warnings:

  - The values [Blue,HSL(80deg 50% 50%),Green,HSL(40deg 50% 50%)] on the enum `TagColor` will be removed. If these variants are still used in the database, this will fail.
  - The values [dotted,circles] on the enum `TagPattern` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `recordTypeId` on the `accounts` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TagColor_new" AS ENUM ('Red', 'Blue', 'Gray', 'Pink', 'Puce', 'Brown', 'Green', 'Smalt', 'Bisque', 'Damask', 'Jasper', 'Orange', 'Purple', 'Titian', 'Violet', 'Yellow', 'Cattleya', 'Bittersweet');
ALTER TABLE "record_types" ALTER COLUMN "tag" DROP DEFAULT;
ALTER TABLE "record_types" ALTER COLUMN "tag" TYPE "TagColor_new" USING ("tag"::text::"TagColor_new");
ALTER TYPE "TagColor" RENAME TO "TagColor_old";
ALTER TYPE "TagColor_new" RENAME TO "TagColor";
DROP TYPE "TagColor_old";
ALTER TABLE "record_types" ALTER COLUMN "tag" SET DEFAULT 'Blue';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TagPattern_new" AS ENUM ('Wavy', 'Ombre', 'Plaid', 'Dotted', 'Floral', 'Zigzag', 'Chevron', 'Circles', 'Diamond', 'Lattice', 'Paisley', 'Rounded', 'Striped', 'Geometric', 'Basketweave');
ALTER TABLE "accounts" ALTER COLUMN "tag" DROP DEFAULT;
ALTER TABLE "accounts" ALTER COLUMN "tag" TYPE "TagPattern_new" USING ("tag"::text::"TagPattern_new");
ALTER TYPE "TagPattern" RENAME TO "TagPattern_old";
ALTER TYPE "TagPattern_new" RENAME TO "TagPattern";
DROP TYPE "TagPattern_old";
ALTER TABLE "accounts" ALTER COLUMN "tag" SET DEFAULT 'Dotted';
COMMIT;

-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_recordTypeId_fkey";

-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "recordTypeId",
ALTER COLUMN "tag" SET DEFAULT 'Dotted';

-- AlterTable
ALTER TABLE "record_types" ALTER COLUMN "tag" SET DEFAULT 'Blue';

-- CreateTable
CREATE TABLE "_AccountToRecordType" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AccountToRecordType_AB_unique" ON "_AccountToRecordType"("A", "B");

-- CreateIndex
CREATE INDEX "_AccountToRecordType_B_index" ON "_AccountToRecordType"("B");

-- AddForeignKey
ALTER TABLE "_AccountToRecordType" ADD CONSTRAINT "_AccountToRecordType_A_fkey" FOREIGN KEY ("A") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountToRecordType" ADD CONSTRAINT "_AccountToRecordType_B_fkey" FOREIGN KEY ("B") REFERENCES "record_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;
