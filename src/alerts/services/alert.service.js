import { Alert } from "../model/alert.entity";

const BASE_URL = "http://localhost:3000";

export class AlertService {
  async getAllAlerts() {
    try {
      const response = await fetch(`${BASE_URL}/replenishment`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.map((alert) => new Alert(alert));
    } catch (error) {
      console.error("Could not fetch alerts:", error);
      return [];
    }
  }

  async getUrgentAlerts() {
    const alerts = await this.getAllAlerts();
    return alerts.filter((alert) => alert.stockActual < alert.stockMinimo);
  }

  async getExpiringAlerts() {
    const alerts = await this.getAllAlerts();
    const today = new Date();
    const nextMonth = new Date();
    nextMonth.setMonth(today.getMonth() + 1);

    return alerts.filter((alert) => {
      const expiryDate = new Date(alert.date);
      return expiryDate > today && expiryDate <= nextMonth;
    });
  }
}
