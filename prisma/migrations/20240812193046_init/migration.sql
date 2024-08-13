/*
  Warnings:

  - Added the required column `unitCost` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "unitCost" MONEY NOT NULL;
