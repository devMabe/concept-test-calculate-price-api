import { Purchase, Item } from "../controller/types";
import db from "../db";

export class PurchaseService {
  //Para crear en la tabla uniCost lo que tenia la tabla purchase
  async resStore() {
    const response = await db.prisma.purchase.findMany({
      include: {
        item: true,
      },
    });

    for (const purchase of response) {
      const data: Purchase = {
        purchaseId: purchase.id,
        date: purchase.createdAt,
        unitCost: Number(purchase.unitCost),
        qty: purchase.qty,
        total: Number(purchase.total),
      };

      await db.prisma.purchaseUnitCost.create({
        data: {
          purchase: JSON.stringify(data),
        },
      });
    }

    return response;
  }

  async getPurchases() {
    const response = await db.prisma.purchase.findMany({
      include: {
        item: true,
      },
    });

    return response;
  }
  //verificar primero la estrategia, y luego guardar
  // cuando sea peps | ueps debi ir sacando de esa tabla dicha venta

  async sellItemByAverage(item: Item) {
    let qtyToSell = item.qty;
    let data;
    let purchases: Purchase[] = [];

    data = await db.prisma.purchase.findMany({
      where: {
        itemId: item.itemId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });

    data?.forEach((purchase) => {
      purchases.push({
        purchaseId: purchase.id,
        itemId: purchase.itemId,
        total: Number(purchase.total),
        qty: purchase.qty,
        unitCost: Number(purchase.unitCost),
        date: purchase.createdAt,
      });
    });

    let totalPurchase: number = 0;
    let totalQty: number = 0;

    purchases.forEach((purchase) => {
      totalPurchase += purchase.total;
      totalQty += purchase.qty;
    });

    const average = totalPurchase / totalQty;
    const totalPrice = qtyToSell * average;

    const stock = await db.prisma.stock.findFirst({
      where: { itemId: item.itemId },
    });

    let qty = stock?.qty!;
    qty -= qtyToSell;

    await db.prisma.stock.update({
      where: {
        id: stock?.id,
      },
      data: {
        qty,
      },
    });

    return {
      totalPrice,
    };
  }

  async sellItem(item: Item) {
    let qtyToSell = item.qty;
    let data;
    let purchases: Purchase[] = [];

    data = await db.prisma.purchaseUnitCost.findMany();

    //parseo el jsonString a objeto
    for (const purchase of data) {
      const purchaseParsed = JSON.parse(purchase.purchase?.toString()!);
      purchases.push({
        unitCostId: purchase.id,
        ...purchaseParsed,
      });
    }

    // Ordenar las existencias según el tipo
    item.type === "PEPS"
      ? this.sort(purchases, "ASC")
      : this.sort(purchases, "DESC");

    const itemFound = await db.prisma.item.findFirst({
      where: { id: item.itemId },
    });

    const totalPrice = await this.calculateTotalPrice(qtyToSell, purchases);

    return {
      type: item.type,
      qty: item.qty,
      item: {
        name: itemFound?.name,
      },
      unitCost: Number(totalPrice / item.qty).toFixed(2),
      totalPrice,
    };
  }

  private async calculateTotalPrice(qtyToSell: number, purchases: Purchase[]) {
    let totalPrice = 0;
    let qty;

    for (const purchase of purchases) {
      // Si ya vendimos la cantidad requerida, salimos del bucle
      if (qtyToSell <= 0) break;

      // item
      const stock = await db.prisma.stock.findFirst({
        where: {
          itemId: purchase.itemId,
        },
      });

      qty = stock?.qty!;

      // Cantidad que vamos a tomar de este lote
      const quantityToTake = Math.min(purchase.qty, qtyToSell);

      // Calculamos el precio total para esta parte de la venta
      totalPrice += quantityToTake * purchase.unitCost;

      // Reducimos la cantidad disponible en este lote
      qty -= quantityToTake;

      await db.prisma.stock.update({
        where: { id: stock?.id },
        data: {
          qty: qty,
        },
      });

      // Reducimos el precio total en proporción a la cantidad vendida
      purchase.total -= quantityToTake * purchase.unitCost;

      // Reducimos la cantidad restante por vender
      qtyToSell -= quantityToTake;

      //generamos el comprobante
      console.log({
        summary: {
          uniCost: purchase.unitCost,
          date: purchase.date,
          stock: qty,
          totalPrice,
        },
      });

      //eliminar de la tabla purchaeUnitCost esa compra
      await db.prisma.purchaseUnitCost.delete({
        where: {
          id: purchase.unitCostId,
        },
      });
    }
    return totalPrice;
  }

  private sort(purchases: Purchase[], type: "ASC" | "DESC") {
    if (type === "ASC") {
      purchases.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    } else if (type === "DESC") {
      purchases.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }
  }
}

export default PurchaseService;
