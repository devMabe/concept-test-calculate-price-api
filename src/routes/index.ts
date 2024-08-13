import { Router } from "express";
import healthRouter from "./Health";
import stockRoutes from "./Purchase";

const router = Router();

router.use(healthRouter);
router.use(stockRoutes);

export default router;
