"use client";

import { useJobPosting } from "@/hooks/use-JobPosting";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { JobPosting, JobPostingFields } from "@/types/job";
import { JobPostingSchema } from "@/schemas/jobposting";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorResponse } from "@/types/error-response";

export function useJobPostingForm(jobposting: JobPosting | null) {
  const { createJobPostingMutation } = useJobPosting();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<JobPostingFields>({
    resolver: zodResolver(JobPostingSchema),
    defaultValues: {
      title: jobposting?.title || "",
      category: jobposting?.category || "",
      tags: jobposting?.tags.map((tag) => tag.tag) || [],

      salary_type: jobposting?.salary_type,
      salary_min: jobposting?.salary_min,
      salary_max: jobposting?.salary_max,

      employment_level: jobposting?.employment_level || "",
      employment_type: jobposting?.employment_type,
      work_setup: jobposting?.work_setup || "",
      vacancies: jobposting?.vacancies,

      description: jobposting?.description || "",

      address_id: jobposting?.address_id || null,
      status: jobposting?.status ?? "open",
    },
  });

  const onSubmit: SubmitHandler<JobPostingFields> = async (data) => {
    try {
      await createJobPostingMutation.mutateAsync({
        title: data.title,
        category: data.category,
        description: data.description,
        vacancies: data.vacancies,
        salary_type: data.salary_type,
        salary_min: data.salary_min,
        salary_max: data.salary_max,
        employment_type: data.employment_type,
        employment_level: data.employment_level,
        work_setup: data.work_setup,
        status: data.status ?? "open",
        address_id: data.address_id ?? null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        tags: data.tags.map((tag) => ({ tag, job_posting_id: 0 })),
        applications: [],
      });
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
    isSuccess: createJobPostingMutation.isSuccess,
    error,
  };
}
