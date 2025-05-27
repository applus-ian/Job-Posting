"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Feedback, FeedbackFormData } from "@/types/interview";
import { FeedbackSchema } from "@/schemas/interview";
import { useInterview } from "@/hooks/useInterview";
import { ErrorResponse } from "@/types/error-response";

export function useFeedbackForm({ id, feedback }: { id: number; feedback: Feedback | null }) {
  const [error, setError] = useState<string | null>(null);
  const { addFeedbackMutation, updateFeedbackMutation } = useInterview();

  const form = useForm<FeedbackFormData>({
    resolver: zodResolver(FeedbackSchema),
    defaultValues: {
      rating: feedback?.rating ?? 0,
      comment: feedback?.comment ?? "",
    },
  });

  useEffect(() => {
    form.reset({
      rating: feedback?.rating ?? 0,
      comment: feedback?.comment ?? "",
    });
  }, [feedback, form]);

  const onSubmit: SubmitHandler<FeedbackFormData> = async (data) => {
    try {
      if (feedback) {
        await updateFeedbackMutation.mutateAsync({
          id: id,
          fields: {
            id: feedback.id,
            ...data,
          },
        });
      } else {
        await addFeedbackMutation.mutateAsync({
          id: id,
          fields: data,
        });
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
    isSuccess: addFeedbackMutation.isSuccess || updateFeedbackMutation.isSuccess,
    error,
  };
}
