import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// [Flow: Create Instance -> Setup Request Interceptor -> Setup Response Interceptor -> Export]

// 1. Create Instance
export const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1',
  timeout: 10000, // 10s timeout
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Allow cookies to be sent
});

// 2. Setup Request Interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Determine token injection logic
    // For example, if using standard LocalStorage (Browser context only):
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 3. Setup Response Interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Normal response
    return response;
  },
  (error: AxiosError) => {
    // Error response handling (e.g., token expiration -> redirection)
    if (error.response?.status === 401) {
      // e.g., Token expired or invalid
      if (typeof window !== 'undefined') {
        // Clear token & Redirect to login if needed
        localStorage.removeItem('access_token');
        // window.location.href = '/login'; 
      }
    }
    return Promise.reject(error);
  }
);
