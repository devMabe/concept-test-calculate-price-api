import { Router } from "express";
import PurchaseController from "../controller/PurchaseController";
import PurchaseService from "../services/PurchaseService";

const router = Router();

const purchaseService = new PurchaseService();
const purchaseController = new PurchaseController(purchaseService);

router.get("/purchases", purchaseController.getAll);
router.get("/purchases/restore", purchaseController.reStore);
router.post("/income", purchaseController.sellItemPeps);
router.post("/income/average", purchaseController.sellItemByAverage);

export default router;
