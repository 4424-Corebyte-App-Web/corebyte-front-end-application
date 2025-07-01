import httpInstance from '../../shared/services/http.instance';
import { Record } from '../model/record.entity';

const BASE_URL = 'https://localhost:44355';

export class RecordService {
    getAllRecords() {
        return fetch(`${BASE_URL}/api/v1/record`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .catch(error => {
                console.error("Could not fetch records:", error);
                return [];
            });
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
