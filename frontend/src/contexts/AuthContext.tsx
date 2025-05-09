'use client';

import React, { createContext, useContext, useEffect } from 'react';
import { useAuth, UserData } from '@/hooks/useAuth';
import { configureAxiosAuth } from '@/lib/axios';
import { usePathname, useRouter } from 'next/navigation';

// Define the context type
interface AuthContextType {
  user: UserData | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Protected routes that require authentication
const protectedHrRoutes = ['/dashboard', '/jobs', '/applications'];
const protectedEmployeeRoutes = ['/employee-portal', '/profile'];

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const auth = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  
  // Configure axios auth instance when user changes
  useEffect(() => {
    if (auth.user) {
      configureAxiosAuth(auth.user.userType, auth.user.token);
    } else {
      configureAxiosAuth(null);
    }
  }, [auth.user]);
  
  // Route protection logic
  useEffect(() => {
    const checkAuth = async () => {
      // Skip for login and public pages
      if (pathname === '/login' || pathname === '/' || pathname.startsWith('/public')) {
        return;
      }
      
      // Check if user is authenticated
      if (!auth.user) {
        // Redirect to login for protected routes
        if (
          protectedHrRoutes.some(route => pathname.startsWith(route)) ||
          protectedEmployeeRoutes.some(route => pathname.startsWith(route))
        ) {
          router.push('/login');
        }
        return;
      }
      
      // Redirect based on user type
      if (auth.user.userType === 'hr') {
        // HR users should not access employee routes
        if (protectedEmployeeRoutes.some(route => pathname.startsWith(route))) {
          router.push('/dashboard');
        }
      } else {
        // Employee users should not access HR routes
        if (protectedHrRoutes.some(route => pathname.startsWith(route))) {
          router.push('/employee-portal');
        }
      }
    };
    
    checkAuth();
  }, [auth.user, pathname, router]);
  
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  
  return context;
};

export default AuthContext; 