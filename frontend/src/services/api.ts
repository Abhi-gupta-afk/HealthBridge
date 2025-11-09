import axios, { AxiosError } from 'axios';
import type { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

// Get API base URL from environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
});

// Track retry attempts for requests
interface RetryConfig extends AxiosRequestConfig {
  _retry?: boolean;
  _retryCount?: number;
}

// Maximum retry attempts for network failures
const MAX_RETRY_ATTEMPTS = 3;
const RETRY_DELAY = 1000; // 1 second

// Helper function to delay retry
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Request interceptor - Add JWT token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors and retries
api.interceptors.response.use(
  (response) => {
    // Success response
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryConfig;

    // Log error for debugging
    if (import.meta.env.VITE_DEBUG_MODE === 'true') {
      console.error('API Error:', {
        url: originalRequest?.url,
        status: error.response?.status,
        message: error.message,
        data: error.response?.data,
      });
    }

    // Handle 401 Unauthorized - JWT expired or invalid
    if (error.response?.status === 401) {
      // Prevent infinite loops
      if (!originalRequest._retry) {
        originalRequest._retry = true;

        // Clear auth data and redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // Show user-friendly message
        if (typeof window !== 'undefined') {
          alert('Your session has expired. Please login again.');
          window.location.href = '/login';
        }
      }
      return Promise.reject(error);
    }

    // Handle 403 Forbidden - Insufficient permissions
    if (error.response?.status === 403) {
      if (typeof window !== 'undefined') {
        alert('You do not have permission to access this resource.');
      }
      return Promise.reject(error);
    }

    // Handle network errors or 5xx server errors with automatic retry
    const isNetworkError = !error.response;
    const isServerError = error.response?.status && error.response.status >= 500;
    
    if ((isNetworkError || isServerError) && originalRequest) {
      const retryCount = originalRequest._retryCount || 0;
      
      if (retryCount < MAX_RETRY_ATTEMPTS) {
        originalRequest._retryCount = retryCount + 1;
        
        console.warn(`Retrying request (${retryCount + 1}/${MAX_RETRY_ATTEMPTS})...`, originalRequest.url);
        
        // Exponential backoff
        await delay(RETRY_DELAY * Math.pow(2, retryCount));
        
        return api.request(originalRequest);
      } else {
        console.error('Max retry attempts reached for:', originalRequest.url);
        if (typeof window !== 'undefined') {
          alert('Network error. Please check your connection and try again.');
        }
      }
    }

    // Handle 400 Bad Request
    if (error.response?.status === 400) {
      const errorData = error.response.data as any;
      console.error('Bad Request:', errorData?.message || 'Invalid request data');
    }

    // Handle 404 Not Found
    if (error.response?.status === 404) {
      console.error('Resource not found:', originalRequest?.url);
    }

    return Promise.reject(error);
  }
);

// Helper method to handle form data uploads
export const uploadFormData = (url: string, formData: FormData) => {
  return api.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// Helper method for downloading files
export const downloadFile = async (url: string, filename: string) => {
  try {
    const response = await api.get(url, {
      responseType: 'blob',
    });
    
    const blob = new Blob([response.data]);
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error('Download failed:', error);
    throw error;
  }
};

export default api;
