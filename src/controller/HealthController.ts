import { Request, Response } from "express";
import HealthService from "../services/HealthService";

export class HealthController {
  private healthService: HealthService;

  constructor(healthService: HealthService) {
    this.healthService = healthService;
    this.health = this.health.bind(this);
  }

  async health(req: Request, res: Response) {
    const response = this.healthService.getHealth();
    res.send(response).status(200);
  }
}

export default HealthController;
