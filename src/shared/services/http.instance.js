import axios from 'axios';

// Create axios instance with default config
const httpInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: true
});

// Add request interceptor
httpInstance.interceptors.request.use(
    config => {
        // You can add auth token here if needed
        // const token = localStorage.getItem('token');
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Add response interceptor
httpInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            // Handle specific status codes
            if (error.response.status === 401) {
                // Handle unauthorized
                console.error('Unauthorized access - please login');
            } else if (error.response.status === 403) {
                // Handle forbidden
                console.error('Access forbidden');
            } else if (error.response.status === 404) {
                // Handle not found
                console.error('Resource not found');
            }
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received from server');
        } else {
            // Something happened in setting up the request
            console.error('Error setting up request:', error.message);
        }
        return Promise.reject(error);
    }
);

export default httpInstance;

