import httpInstance from '../../shared/services/http.instance';
import { Record } from '../model/record.entity';
import { HistoryStatusService } from './history-status.service';

const BASE_URL = 'https://localhost:7164';

export class RecordService {
    constructor() {
        this.historyStatusService = new HistoryStatusService();
    }

    async getAllRecords() {
        try {
            const [records, historyStatus] = await Promise.all([
                fetch(`${BASE_URL}/api/v1/record`).then(res => res.json()),
                this.historyStatusService.getAllHistoryStatus()
            ]);

            const customerMap = historyStatus.reduce((acc, item) => {
                acc[item.id] = item.customer;
                return acc;
            }, {});
            return records.map(record => ({
                id: record.id,
                customer: customerMap[record.id] || 'N/A',
                type: record.type || 'N/A',
                year: record.year || 'N/A',
                product: record.product || 'N/A',
                batch: record.batch || 'N/A',
                stock: record.stock || 'N/A'
            }));
        } catch (error) {
            console.error("Error fetching records:", error);
            return [];
        }
    }

    updateRecord(recordId, dataToUpdate) {
        return fetch(`${BASE_URL}/api/v1/record/${recordId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToUpdate),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .catch(error => {
                console.error(`Could not update record ${recordId}:`, error);
                throw error;
            });
    }
}
