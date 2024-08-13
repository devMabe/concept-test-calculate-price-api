/*
  Warnings:

  - You are about to drop the `Notes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Notes";

-- CreateTable
CREATE TABLE "PurchaseUnitCost" (
    "id" SERIAL NOT NULL,
    "purchases" JSONB NOT NULL,

    CONSTRAINT "PurchaseUnitCost_pkey" PRIMARY KEY ("id")
);
