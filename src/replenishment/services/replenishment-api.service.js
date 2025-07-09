import axios from "axios";

// Use relative path in development (will be proxied by Vite)
// Use full URL in production
const baseURL = import.meta.env.DEV 
  ? '/api/v1' 
  : 'https://corebyte-backendapplication.azurewebsites.net/api/v1';

const endpoint = 'replenishment';

const http = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false, 
  timeout: 10000, 
});

http.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.group('API Error Details');
      console.groupEnd();
      
      // Log the complete error for debugging
      console.error('Complete Error Object:', JSON.stringify({
        config: {
          url: error.config?.url,
          method: error.config?.method,
          data: error.config?.data,
          headers: error.config?.headers
        },
        response: {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data,
          headers: error.response.headers
        }
      }, null, 2));
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Request setup error:', error.message);
    }
    return Promise.reject(error);
  }
);
export class ReplenishmentApiService {
    constructor(resourceEndpoint) {
        this.resourceEndpoint = resourceEndpoint || endpoint;
    }

    getAllResources() {
        return http.get(this.resourceEndpoint);
    }

    getResourceById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }

    createResource(resource) {
        return http.post(this.resourceEndpoint, resource);
    }

    updateResource(id, resource) {
        return http.put(`${this.resourceEndpoint}/${id}`, resource)
            .then(response => {
                return response;
            })
            .catch(error => {
                throw error;
            });
    }

    deleteResource(id) {
        return http.delete(`${this.resourceEndpoint}/${id}`);
    }
}
