import { useState } from "react";
import axios from "@/lib/axios";
import { AxiosError } from "axios";

// Define types for form data and errors
interface ChangePasswordFormData {
  current_password: string;
  password: string;
  password_confirmation: string;
}

interface FormErrors {
  [key: string]: string[];
}

// Custom hook for change password functionality
export const useChangePasswordForm = () => {
  // Form state for password fields
  const [formData, setFormData] = useState<ChangePasswordFormData>({
    current_password: "",
    password: "",
    password_confirmation: ""
  });

  // UI state management
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    let fieldName = id;
    
    // Map the frontend field IDs to the backend field names
    if (id === "current-password") fieldName = "current_password";
    if (id === "new-password") fieldName = "password";
    if (id === "confirm-password") fieldName = "password_confirmation";
    
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      current_password: "",
      password: "",
      password_confirmation: ""
    });
    setErrors({});
    setIsSuccess(false);
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    setIsSuccess(false);
    
    try {
      // Send request to the Laravel backend API
      const response = await axios.put('/api/auth/change-password', formData);
      
      // Handle success
      setIsSuccess(true);
      resetForm();
      
      return {
        success: true,
        message: response.data.message || "Password changed successfully"
      };
    } catch (error) {
      // Handle errors
      if (error instanceof AxiosError && error.response) {
        // Handle validation errors
        if (error.response.status === 422) {
          setErrors(error.response.data.errors || {});
        }
        
        return {
          success: false,
          message: error.response.data.message || "Failed to change password",
          errors: error.response.data.errors
        };
      } else {
        // Handle unexpected errors
        return {
          success: false,
          message: "An unexpected error occurred"
        };
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to get field error
  const getFieldError = (field: string) => {
    return errors[field] ? errors[field][0] : null;
  };

  return {
    formData,
    isLoading,
    isSuccess,
    errors,
    handleChange,
    handleSubmit,
    getFieldError,
    resetForm
  };
};

export default useChangePasswordForm;
