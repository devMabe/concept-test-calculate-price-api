-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stock" (
    "id" SERIAL NOT NULL,
    "qty" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
