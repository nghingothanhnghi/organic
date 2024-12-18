// app/api/axios.ts
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
const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Sends cookies along with requests (useful for authentication)
});

// Example of a public Axios instance (without auth headers)
const apiPublic = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptors to include both the Strapi API token and user JWT token
axiosPrivate.interceptors.request.use(
  (config) => {
    // Add Strapi API token from environment variables
    const strapiApiToken = import.meta.env.VITE_STRAPI_API_TOKEN;
    if (strapiApiToken) {
      config.headers['Authorization'] = `Bearer ${strapiApiToken}`;
    }

    // Add user JWT token if available
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      config.headers['Authorization'] = `Bearer ${userToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error); // Handle request error
  }
);

// Global error handling for all axios instances
const handleResponseError = (error: any) => {
  console.error('API Error:', error.response?.data || error.message);
  if (error.response?.status === 401) {
    console.warn('Unauthorized! Redirecting to login...');
    // Redirect user to login page or handle token refresh logic
    window.location.href = '/login';
  }
  return Promise.reject(error);
};

// Attach response interceptors
api.interceptors.response.use(
  (response) => response,
  handleResponseError
);

axiosPrivate.interceptors.response.use(
  (response) => response,
  handleResponseError
);

// Exporting each Axios instance separately
export { api, axiosPrivate, apiPublic };
