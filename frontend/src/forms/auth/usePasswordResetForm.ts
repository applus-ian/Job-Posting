"use client";
import { useAuth } from "@/hooks/useAuth";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordResetSchema } from "@/schemas/auth";
import { PasswordResetForm } from "@/types/auth";
import { useState } from "react";
import { ErrorResponse } from "@/types/error-response";
import { useParams, useSearchParams } from "next/navigation";

export function usePasswordResetForm() {
  const { passwordResetMutation } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const searchParams = useSearchParams();
  // get password reset token and email from URL
  const token = params.token as string;
  const email = searchParams.get("email") || "";

  const form = useForm<PasswordResetForm>({
    resolver: zodResolver(PasswordResetSchema),
    defaultValues: {
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit: SubmitHandler<PasswordResetForm> = async (data) => {
    try {
      await passwordResetMutation.mutateAsync({ token, email, ...data });
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
