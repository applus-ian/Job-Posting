"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas/auth";
import { LoginFields } from "@/types/auth";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

export function useLoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<LoginFields>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFields> = async (data) => {
    setError(null);
    setIsLoading(true);
    
    try {
      // First try unified authentication
      const unifiedResponse = await axios.post('/api/auth', {
        email: data.email,
        password: data.password
      });
      
      // If successful, we have user data with server and type
      const userData = unifiedResponse.data;
      
      // Debug the returned data structure
      console.log("Auth API response:", userData);
      if (userData.employee) {
        console.log("Employee data before storage:", userData.employee);
      }
      
      // Store in localStorage for API calls
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(userData));
        
        if (userData.token) {
          localStorage.setItem('token', userData.token);
        }
      }
      
      // Now login with NextAuth for session
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        userType: userData.userType,
        server: userData.server
      });
      
      if (result?.error) {
        setError(result.error);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        console.log("Login successful!", userData);
        
        const job_position = userData.employee.job_position;

        // Redirect based on user type
        if (job_position === 'HR' || job_position === 'HR Specialist') {
          router.push("/hr/dashboard");
        } else {
          router.push("/hr/dashboard");
        }
      }
    } catch (err: any) {
      setIsLoading(false);
      // If unified auth fails, try the default NextAuth login
      console.error("Unified auth failed:", err);
      
      // Show specific error message from the API if available
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.code === 'ERR_NETWORK') {
        setError("Authentication servers are unreachable. Please try again later.");
      } else {
        setError("Login failed. Please check your credentials and try again.");
      }
      
      try {
        // Try direct NextAuth login as a fallback
        const result = await signIn("credentials", {
          redirect: false,
          email: data.email,
          password: data.password,
        });

        if (result?.error) {
          setError(result.error);
        } else {
          setError(null);
          router.push("/hr/dashboard");
        }
      } catch (nextAuthErr) {
        console.error("NextAuth login failed:", nextAuthErr);
        setError("Login failed. Please check your credentials and try again.");
      }
    }
  };

  return { form, onSubmit, error, isLoading };
}
