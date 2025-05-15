import httpInstance from '../../shared/services/http.instance';
import { HistoryStatus } from '../model/history-status.entity';

const BASE_URL = 'http://localhost:3000';

export class HistoryStatusService {
    getAllHistoryStatus() {
        return fetch(`${BASE_URL}/products`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .catch(error => {
                console.error("Could not fetch products:", error);
                return []; 
            });
    }

    updateHistoryStatus(productId, newStatus) {
        return fetch(`${BASE_URL}/products/${productId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: newStatus }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error(`Could not update product ${productId}:`, error);
            throw error;
        });
    }
}
