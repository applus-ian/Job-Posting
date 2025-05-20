"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { ErrorResponse } from "@/types/error-response";
import { ApplyFormProp, ApplyJobFields } from "@/types/application";
import { ApplyJobSchema } from "@/schemas/application";
import { useApplication } from "@/hooks/useApplication";
import { useDocumentApi } from "@/api/document";

export function useApplyJobForm(applyJobData: ApplyFormProp) {
  const { applyJobMutation } = useApplication();
  const { getFile } = useDocumentApi();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ApplyJobFields>({
    resolver: zodResolver(ApplyJobSchema),
    defaultValues: {
      expected_salary: 0,
      resume: [] as File[],
      coverletter: [] as File[],
    },
  });

  useEffect(() => {
    const loadFiles = async () => {
      if (!applyJobData) return;

      if (applyJobData?.resume) {
        const file = await getFile(applyJobData.resume.id, applyJobData.resume.file_name);
        if (file) form.setValue("resume", [file]);
      }

      if (applyJobData?.coverletter) {
        const file = await getFile(applyJobData.coverletter.id, applyJobData.coverletter.file_name);
        if (file) form.setValue("coverletter", [file]);
      }
    };

    loadFiles();
  }, [applyJobData, form, getFile]);

  const onSubmit: SubmitHandler<ApplyJobFields> = async (data) => {
    try {
      await applyJobMutation.mutateAsync({ id: applyJobData.id, ...data });
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
    isSuccess: applyJobMutation.isSuccess,
    error,
  };
}
