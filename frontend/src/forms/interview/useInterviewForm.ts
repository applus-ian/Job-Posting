"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Interview, InterviewFields } from "@/types/interview";
import { InterviewSchema } from "@/schemas/interview";
import { useInterview } from "@/hooks/useInterview";
import { ErrorResponse } from "@/types/error-response";

export function useInterviewForm({ id, interview }: { id: number; interview: Interview | null }) {
  const [error, setError] = useState<string | null>(null);
  const { scheduleInterviewMutation, updateInterviewMutation } = useInterview();

  const form = useForm<InterviewFields>({
    resolver: zodResolver(InterviewSchema),
    defaultValues: {
      schedule_date: interview?.schedule_date ?? "",
      schedule_time: interview?.schedule_time ?? "",
      mode: interview?.mode ?? "in_person",
      meeting_link: interview?.meeting_link ?? "",
      platform: interview?.platform ?? "",
      location: interview?.location ?? "",
      status: interview?.status ?? "upcoming",
    },
  });

  const onSubmit: SubmitHandler<InterviewFields> = async (data) => {
    try {
      if (interview) {
        // change the schedule_time time format
        data.schedule_time = data.schedule_time.slice(0, 5);
        await updateInterviewMutation.mutateAsync({
          id: interview.id,
          ...data,
        });
      } else {
        await scheduleInterviewMutation.mutateAsync({
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
    isSuccess: scheduleInterviewMutation.isSuccess || updateInterviewMutation.isSuccess,
    error,
  };
}
