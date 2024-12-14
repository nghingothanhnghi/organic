// api/axios.ts
import axios from 'axios';

// Base URL can be dynamic based on the environment
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:1337/api'; 

// Default Axios instance for general use
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json', // Default header for JSON requests
    },
});

// Private Axios instance for requests requiring authentication (with credentials)
export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Sends cookies along with requests (useful for authentication)
});

// Example of a public Axios instance (without auth headers)
export const apiPublic = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Exporting the default api instance for general usage
export default api;