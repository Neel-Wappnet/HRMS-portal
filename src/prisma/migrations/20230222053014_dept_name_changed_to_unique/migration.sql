/*
  Warnings:

  - A unique constraint covering the columns `[deptName]` on the table `Department` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Department_deptName_key" ON "Department"("deptName");
