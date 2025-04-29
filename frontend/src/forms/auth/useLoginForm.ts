"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas/auth";
import { LoginFields } from "@/types/auth";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { ErrorResponse } from "@/types/error-response";

export function useLoginForm() {
  const { loginMutation } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginFields>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFields> = async (data) => {
    try {
      await loginMutation.mutateAsync(data);
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
