import { Router } from "express";
import HealthController from "../controller/HealthController";
import HealthService from "../services/HealthService";

const router = Router();

const healthService = new HealthService();
const healthController = new HealthController(healthService);

router.get("/health", healthController.health);

export default router;
