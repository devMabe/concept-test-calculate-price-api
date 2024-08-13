/*
  Warnings:

  - You are about to drop the column `purchases` on the `PurchaseUnitCost` table. All the data in the column will be lost.
  - Added the required column `purchase` to the `PurchaseUnitCost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PurchaseUnitCost" DROP COLUMN "purchases",
ADD COLUMN     "purchase" JSONB NOT NULL;
