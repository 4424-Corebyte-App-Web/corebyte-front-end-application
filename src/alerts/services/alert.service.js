import { Alert } from "../model/alert.entity";

const API_BASE_URL = "https://localhost:7164/api/v1/replenishment";

export class AlertService {
  async getAllAlerts() {    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); 
      
      const response = await fetch(API_BASE_URL, {
        method: 'GET',
        signal: controller.signal,
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'omit'
      }).finally(() => clearTimeout(timeoutId));
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', {
          status: response.status,
          statusText: response.statusText,
          url: API_BASE_URL,
          response: errorText
        });
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (!Array.isArray(data)) {
        console.error('Expected array from API but received:', data);
        return [];
      }
      
      return data.map(item => new Alert({
        id: item.id ?? 0,
        name: item.name ?? "",
        type: item.type ?? "",
        date: item.date ?? new Date().toISOString(),
        stockActual: Number(item.stockActual) || 0,
        stockMinimo: Number(item.stockMinimo) || 0,
        price: Number(item.price) || 0
      }));
      
    } catch (error) {
      console.error('Failed to fetch alerts:', {
        error: error.message,
        url: API_BASE_URL,
        timestamp: new Date().toISOString()
      });
      return [];
    }
  }

  async getUrgentAlerts() {
    const alerts = await this.getAllAlerts();
    const urgentAlerts = alerts.filter(alert => {
      const stockActual = Number(alert.stockActual);
      const stockMinimo = Number(alert.stockMinimo);
      const difference = stockActual - stockMinimo;
      const isUrgent = difference >= 0 && difference <= 4;

      return isUrgent;
    });
    

    return urgentAlerts;
  }

  async getExpiringAlerts() {
    const alerts = await this.getAllAlerts();
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    
    const nextMonth = new Date();
    nextMonth.setMonth(today.getMonth() + 1);
    nextMonth.setHours(23, 59, 59, 999); 
    
    return alerts.filter((alert) => {
      if (!alert.date) return false;
      
      const expiryDate = new Date(alert.date);
      expiryDate.setHours(12, 0, 0, 0); 
      
      return expiryDate > today && expiryDate <= nextMonth;
    });
  }
}
