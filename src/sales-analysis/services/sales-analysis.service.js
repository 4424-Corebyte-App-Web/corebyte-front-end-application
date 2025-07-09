import { SalesAnalysis } from '../model/sales-analysis.entity';
import { HistoryStatusService } from '../../history-status/services/history-status.service';

const BASE_URL = import.meta.env.DEV 
  ? "/api/v1" 
  : "https://corebyte-backendapplication.azurewebsites.net/api/v1";

export class SalesAnalysisService {
    constructor() {
        this.historyStatusService = new HistoryStatusService();
    }

    async getSalesAnalysis() {
        try {
            const [records, historyStatus] = await Promise.all([
                fetch(`${BASE_URL}/record`).then(res => res.json()),
                this.historyStatusService.getAllHistoryStatus()
            ]);

            const customerMap = historyStatus.reduce((acc, item) => {
                acc[item.id] = item.customer;
                return acc;
            }, {});

            // Create SalesAnalysis instances directly using the constructor
            return records.map(record => new SalesAnalysis(
                record.id || 0,
                record.customerId || 0,
                record.type || 'N/A',
                record.year ? new Date(record.year) : new Date(),
                record.product || 'N/A',
                record.batch || 0,
                record.stock || 0
            ));
            
        } catch (error) {
            console.error("Error fetching sales analysis:", error);
            return [];
        }
    }
}