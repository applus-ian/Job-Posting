"use client";
import { useAuth } from "@/hooks/useAuth";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas/auth";
import { RegisterFields } from "@/types/auth";
import { useState } from "react";
import { ErrorResponse } from "@/types/error-response";

export function useRegisterForm() {
  const { registerMutation } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<RegisterFields>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      middle_name: "",
      suffix: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit: SubmitHandler<RegisterFields> = async (data) => {
    try {
      await registerMutation.mutateAsync(data);
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
