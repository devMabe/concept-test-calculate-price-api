export type Item = {
  itemId?: number;
  type: "PEPS" | "UEPS" | "AVERAGE";
  qty: number;
};

export type Purchase = {
  unitCostId?: number;
  purchaseId?: number;
  item?: any;
  itemId?: number;
  total: number;
  unitCost: number;
  qty: number;
  date: Date;
};
