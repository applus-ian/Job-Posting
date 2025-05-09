import axios from "axios";

// Default axios instance for public endpoints (defaults to HR server)
export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Axios instance for authenticated requests that can dynamically change baseURL
export const axiosAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Function to configure axiosAuth based on user type
export const configureAxiosAuth = (userType: 'hr' | 'employee' | null, token?: string) => {
  // Set the base URL according to user type
  if (userType === 'employee') {
    axiosAuth.defaults.baseURL = 'http://127.0.0.1:8001';
  } else {
    axiosAuth.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  }
  
  // Set auth token if available
  if (token) {
    axiosAuth.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosAuth.defaults.headers.common['Authorization'];
  }
};

// Setup axios interceptor to handle auth errors
axiosAuth.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 errors (unauthorized) which might mean token expired
    if (error.response && error.response.status === 401) {
      // Clear local storage and redirect to login if unauthorized
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);
