import httpInstance from '../../shared/services/http.instance';
import { Record } from '../model/record.entity';

const BASE_URL = 'http://localhost:3000';

export class RecordService {
    getAllRecords() {
        return fetch(`${BASE_URL}/records`)
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
        return fetch(`${BASE_URL}/records/${recordId}`, {
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
