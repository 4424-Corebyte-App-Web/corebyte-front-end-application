import httpInstance from '../../shared/services/http.instance';
import { HistoryStatus } from '../model/history-status.entity';

const BASE_URL = 'https://localhost:7164';

export class HistoryStatusService {
    getAllHistoryStatus() {
        return fetch(`${BASE_URL}/api/v1/history`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(products => {
                return products.map(product => ({
                    ...product,
                    status: this.mapStatus(product.status)
                }));
            })
            .catch(error => {
                console.error("Could not fetch products:", error);
                return [];
            });
    }

    mapStatus(statusValue) {
        const status = typeof statusValue === 'object' ? statusValue.status : statusValue;

        switch(parseInt(status)) {
            case 0: return 'PENDING';
            case 1: return 'SHIPPED';
            case 2: return 'DELIVERED';
            default: return 'UNKNOWN';
        }
    }

    async updateHistoryStatus(id, status) {
        try {
            // Convert status to number if it's a string
            let statusValue = status;
            if (typeof status === 'string') {
                switch(status.toUpperCase()) {
                    case 'PENDING': statusValue = 0; break;
                    case 'SHIPPED': statusValue = 1; break;
                    case 'DELIVERED': statusValue = 2; break;
                    default: statusValue = 0;
                }
            }

            const requestBody = { status: statusValue };
            console.log('Sending request to:', `${BASE_URL}/api/v1/history/${id}/status`);
            console.log('Request body:', requestBody);

            const response = await fetch(`${BASE_URL}/api/v1/history/${id}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            const responseText = await response.text();
            console.log('Response status:', response.status);
            console.log('Response body:', responseText);

            let responseData;
            try {
                responseData = responseText ? JSON.parse(responseText) : {};
            } catch (e) {
                console.error('Error parsing response:', e);
                responseData = {};
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`, {
                    cause: {
                        status: response.status,
                        data: responseData
                    }
                });
            }

            return responseData;
        } catch (error) {
            console.error(`Could not update history ${id}:`, error);
            throw error;
        }
    }
}
