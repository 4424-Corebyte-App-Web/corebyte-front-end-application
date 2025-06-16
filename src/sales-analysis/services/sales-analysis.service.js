import { SalesAnalysis } from '../model/sales-analysis.entity';
import httpInstance from '../../shared/services/http.instance';

const BASE_URL = 'http://localhost:3000';

export class SalesAnalysisService {
    getSalesAnalysis() {
        return fetch(`${BASE_URL}/analysis`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .catch(error => {
                console.error("Could not fetch analysis:", error);
                return [];
            });
    }
}