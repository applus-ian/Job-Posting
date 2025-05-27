"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { ErrorResponse } from "@/types/error-response";
import { Application, ApplicationStatusField } from "@/types/application";
import { ApplicationStatusSchema } from "@/schemas/application";
import { useApplication } from "@/hooks/useApplication";

export function useApplicationStatusForm(application: Application) {
  const { updateApplicationStatusMutation } = useApplication();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ApplicationStatusField>({
    resolver: zodResolver(ApplicationStatusSchema),
    defaultValues: {
      status: application.status ?? "",
    },
  });

  const onSubmit: SubmitHandler<ApplicationStatusField> = async (data) => {
    try {
      await updateApplicationStatusMutation.mutateAsync({
        id: application.id!,
        status: data.status,
      });
      setError(null);
    } catch (error) {
      const errorMsg = (error as ErrorResponse)?.response?.data?.message;
      if (errorMsg) {
        console.log(errorMsg);
        setError(errorMsg);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return {
    form,
    onSubmit,
    isSuccess: updateApplicationStatusMutation.isSuccess,
    isLoading: updateApplicationStatusMutation.isPending,
    error,
  };
}
