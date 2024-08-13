import { Request, Response } from "express";
import PurchaseService from "../services/PurchaseService";
import { Item } from "./types";

export class PurchaseController {
  private purchaseService: PurchaseService;

  constructor(purchaseService: PurchaseService) {
    this.purchaseService = purchaseService;
    this.getAll = this.getAll.bind(this);
    this.sellItemPeps = this.sellItemPeps.bind(this);
    this.sellItemByAverage = this.sellItemByAverage.bind(this);
    this.reStore = this.reStore.bind(this);
  }

  async getAll(req: Request, res: Response) {
    const response = await this.purchaseService.getPurchases();

    res.send(response).status(200);
  }

  async reStore(req: Request, res: Response) {
    const response = await this.purchaseService.resStore();

    res.send(response).status(200);
  }

  async sellItemPeps(req: Request, res: Response) {
    const arg: Item = {
      type: req.body.type,
      qty: req.body.qty,
    };
    const response = await this.purchaseService.sellItem(arg);
    res.send(response).status(200);
  }

  async sellItemByAverage(req: Request, res: Response) {
    const arg: Item = {
      type: "AVERAGE",
      itemId: req.body.itemId,
      qty: req.body.qty,
    };

    const response = await this.purchaseService.sellItemByAverage(arg);
    res.send(response).status(200);
  }
}

export default PurchaseController;
