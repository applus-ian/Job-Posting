"use client";
import { EducationHistory, EducationHistoryFields } from "@/types/profile";
import { useProfile } from "@/hooks/useProfile";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EducationHistorySchema } from "@/schemas/profile";
import { useState } from "react";
import { ErrorResponse } from "@/types/error-response";

export function useEducationHistoryForm(educationhistory: EducationHistory | null) {
  const { addEducationHistoryMutation, updateEducationHistoryMutation } = useProfile();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<EducationHistoryFields>({
    resolver: zodResolver(EducationHistorySchema),
    defaultValues: {
      school: educationhistory?.school || "",
      degree: educationhistory?.degree || "",
      course: educationhistory?.course || "",
      start_year: educationhistory?.start_year || "",
      end_year: educationhistory?.end_year || "",
    },
  });

  const onSubmit: SubmitHandler<EducationHistoryFields> = async (data) => {
    try {
      if (educationhistory) {
        await updateEducationHistoryMutation.mutateAsync({ id: educationhistory.id, ...data });
      } else {
        await addEducationHistoryMutation.mutateAsync(data);
      }
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
    isSuccess: addEducationHistoryMutation.isSuccess || updateEducationHistoryMutation.isSuccess,
    error,
  };
}
