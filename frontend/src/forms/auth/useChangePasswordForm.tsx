"use client";
import { useAuth } from "@/hooks/useAuth";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangePasswordSchema } from "@/schemas/auth";
import { ChangePasswordFields } from "@/types/auth";
import { useState } from "react";
import { ErrorResponse } from "@/types/error-response";

export function useChangePasswordForm() {
  const { changePasswordMutation } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ChangePasswordFields>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      current_password: "",
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit: SubmitHandler<ChangePasswordFields> = async (data) => {
    try {
      await changePasswordMutation.mutateAsync(data);
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
