import { useInterviewApi } from "@/api/interview";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useViewApplicationQuery } from "./query/useViewApplicationQuery";
import { useQueryClient } from "@tanstack/react-query";

export function useInterview() {
  const {
    scheduleInterview,
    updateScheduleInterview,
    addFeedback,
    updateFeedback,
    deleteFeedback,
  } = useInterviewApi();
  const queryClient = useQueryClient();
  const { refetch } = useViewApplicationQuery();

  const scheduleInterviewMutation = useMutation({
    mutationFn: scheduleInterview,
    onSuccess: (data) => {
      refetch();
      queryClient.invalidateQueries({ queryKey: ["application", data.application.id] });
      toast.success(data.message);
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  const updateInterviewMutation = useMutation({
    mutationFn: updateScheduleInterview,
    onSuccess: (data) => {
      refetch();
      queryClient.invalidateQueries({ queryKey: ["application", data.application.id] });
      toast.success(data.message);
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  const addFeedbackMutation = useMutation({
    mutationFn: addFeedback,
    onSuccess: (data) => {
      refetch();
      toast.success(data.message);
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  const updateFeedbackMutation = useMutation({
    mutationFn: updateFeedback,
    onSuccess: (data) => {
      refetch();
      toast.success(data.message);
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  const deleteFeedbackMutation = useMutation({
    mutationFn: deleteFeedback,
    onSuccess: (data) => {
      refetch();
      toast.success(data.message);
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  return {
    scheduleInterviewMutation,
    updateInterviewMutation,
    addFeedbackMutation,
    updateFeedbackMutation,
    deleteFeedbackMutation,
  };
}
