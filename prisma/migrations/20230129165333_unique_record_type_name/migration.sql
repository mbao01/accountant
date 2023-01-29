/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `record_types` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "record_types_name_key" ON "record_types"("name");
