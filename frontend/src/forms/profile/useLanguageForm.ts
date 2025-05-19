"use client";
import { useProfile } from "@/hooks/useProfile";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Language, LanguageFields } from "@/types/profile";
import { LanguageSchema } from "@/schemas/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorResponse } from "@/types/error-response";

export function useLanguageForm(language: Language | null) {
  const { addLanguageMutation, updateLanguageMutation } = useProfile();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LanguageFields>({
    resolver: zodResolver(LanguageSchema),
    defaultValues: {
      language: language?.language || "",
      proficiency_level: language?.proficiency_level || "",
    },
  });

  const onSubmit: SubmitHandler<LanguageFields> = async (data) => {
    try {
      if (language) {
        await updateLanguageMutation.mutateAsync({ id: language.id, ...data });
      } else {
        await addLanguageMutation.mutateAsync(data);
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
    isSuccess: addLanguageMutation.isSuccess || updateLanguageMutation.isSuccess,
    error,
  };
}
