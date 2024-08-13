-- CreateTable
CREATE TABLE "Purchase" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "total" MONEY NOT NULL,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
