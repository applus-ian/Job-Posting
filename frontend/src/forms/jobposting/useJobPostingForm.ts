"use client";

import { useJobPosting } from "@/hooks/useJobPosting";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { JobPosting, JobPostingFields } from "@/types/job";
import { JobPostingSchema } from "@/schemas/jobposting";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorResponse } from "@/types/error-response";

export function useJobPostingForm(jobposting: JobPosting | null) {
  const { createJobPostingMutation, updateJobPostingMutation } = useJobPosting();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<JobPostingFields>({
    resolver: zodResolver(JobPostingSchema),
    defaultValues: {
      title: jobposting?.title || "",
      category: jobposting?.category || "",
      tags: jobposting?.tags.map((tag) => tag.tag) || [],
      salary_type: jobposting?.salary_type ?? "monthly",
      salary_min: Number(jobposting?.salary_min) ?? 0,
      salary_max: Number(jobposting?.salary_max) ?? 0,
      employment_type: jobposting?.employment_type ?? "full-time",
      employment_level: jobposting?.employment_level || "",
      work_setup: jobposting?.work_setup || "",
      vacancies: jobposting?.vacancies ?? 0,
      description: jobposting?.description || "",
      status: jobposting?.status ?? "draft",
    },
  });

  const onSubmit: SubmitHandler<JobPostingFields> = async (data) => {
    try {
      if (jobposting) {
        await updateJobPostingMutation.mutateAsync({ id: jobposting.id, ...data });
      } else {
        await createJobPostingMutation.mutateAsync(data);
      }
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
    error,
  };
}
