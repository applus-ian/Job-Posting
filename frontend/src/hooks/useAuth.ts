import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

// Types for our user
export interface UserData {
  id: number;
  name?: string;
  email: string;
  userType: 'hr' | 'employee';
  server: '8000' | '8001';
  token?: string;
  // Add other relevant user data fields
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface UseAuthReturn {
  user: UserData | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

// Custom hook for handling authentication
export const useAuth = (): UseAuthReturn => {
  // Initialize user state from localStorage if available
  const [user, setUser] = useState<UserData | null>(() => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    }
    return null;
  });
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Login function that attempts authentication with both servers
  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Call our unified auth API endpoint
      const response = await axios.post('/api/auth', credentials);
      
      // Store user data in state and localStorage
      const userData = response.data;
      setUser(userData);
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Store token if present
        if (userData.token) {
          localStorage.setItem('token', userData.token);
        }
      }
      
      // Redirect based on user type
      if (userData.userType === 'hr') {
        router.push('/dashboard'); // HR dashboard
      } else {
        router.push('/employee-portal'); // Employee portal
      }
      
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.response?.data?.error || 'Failed to login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
    router.push('/login');
  };

  return { user, isLoading, error, login, logout };
};

// Helper function to get API base URL based on user type
export const getApiBaseUrl = (user: UserData | null) => {
  if (!user) return 'http://localhost:8000'; // Default to HR server
  
  return user.server === '8001' 
    ? 'http://127.0.0.1:8001' 
    : 'http://localhost:8000';
};

export default useAuth;
