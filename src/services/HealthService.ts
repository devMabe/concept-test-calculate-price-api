export class HealthService {
  getHealth() {
    return {
      status: "ok",
      date: new Date().toLocaleString("es-Co"),
    };
  }
}

export default HealthService;
