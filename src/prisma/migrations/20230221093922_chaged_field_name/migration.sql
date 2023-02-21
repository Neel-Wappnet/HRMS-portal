/*
  Warnings:

  - You are about to drop the column `upddatedAt` on the `Otp` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Otp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Otp" DROP COLUMN "upddatedAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
