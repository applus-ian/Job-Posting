"use client";
import { useAuth } from "@/hooks/useAuth";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordSchema } from "@/schemas/auth";
import { ForgotPasswordField } from "@/types/auth";
import { useState } from "react";
import { ErrorResponse } from "@/types/error-response";

export function useForgotPasswordForm() {
  const { forgotPasswordMutation } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ForgotPasswordField>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<ForgotPasswordField> = async (email) => {
    try {
      await forgotPasswordMutation.mutateAsync(email);
      setError(null);
    } catch (error) {
      const errorMsg = (error as ErrorResponse)?.response?.data?.message;
      if (errorMsg) {
        setError(errorMsg);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return { form, onSubmit, error };
}
