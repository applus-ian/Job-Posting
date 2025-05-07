"use client";
import { useProfile } from "@/hooks/useProfile";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { WorkExperience, WorkExperienceFields } from "@/types/profile";
import { WorkExperienceSchema } from "@/schemas/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorResponse } from "@/types/error-response";

export function useWorkExperienceForm(workexperience: WorkExperience | null) {
  const { addWorkExperienceMutation, updateWorkExperienceMutation } = useProfile();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<WorkExperienceFields>({
    resolver: zodResolver(WorkExperienceSchema),
    defaultValues: {
      company: workexperience?.company || "",
      professional_title: workexperience?.professional_title || "",
      description: workexperience?.description || "",
      start_date: workexperience?.start_date || "",
      end_date: workexperience?.end_date || "",
    },
  });

  const onSubmit: SubmitHandler<WorkExperienceFields> = async (data) => {
    try {
      if (workexperience) {
        await updateWorkExperienceMutation.mutateAsync({ id: workexperience.id, ...data });
      } else {
        await addWorkExperienceMutation.mutateAsync(data);
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
    isSuccess: addWorkExperienceMutation.isSuccess || updateWorkExperienceMutation.isSuccess,
    error,
  };
}
