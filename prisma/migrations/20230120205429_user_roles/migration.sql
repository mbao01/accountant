-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Guest', 'Owner', 'Member', 'Admin');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'Member';
