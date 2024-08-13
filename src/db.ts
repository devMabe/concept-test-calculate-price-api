import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export type Item = {
  id: number;
  name: string;
};

export type StockItem = {
  date: string;
  quantity: number;
  total: number;
  item?: Item;
};

export default {
  prisma,
};
