-- AlterTable
ALTER TABLE "record_categories" ADD COLUMN     "hidden" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "record_types" ADD COLUMN     "hidden" BOOLEAN DEFAULT false;
