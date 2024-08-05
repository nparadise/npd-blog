/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `MainCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MainCategory_name_key" ON "MainCategory"("name");
