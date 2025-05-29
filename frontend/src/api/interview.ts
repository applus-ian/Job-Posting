import useAxiosAuth from "@/hooks/useAxiosAuth";
import { Feedback, InterviewFields } from "@/types/interview";

export function useInterviewApi() {
  const axiosAuth = useAxiosAuth();

  const allInterviews = async () => {
    const response = await axiosAuth.get("/api/hr/interview/view");
    return response.data;
  };

  const scheduleInterview = async ({ id, fields }: { id: number; fields: InterviewFields }) => {
    const response = await axiosAuth.post(`/api/hr/interview/schedule/${id}`, fields);
    return response.data;
  };

  const updateScheduleInterview = async (fields: InterviewFields) => {
    const response = await axiosAuth.put(`/api/hr/interview/schedule/${fields.id}`, fields);
    return response.data;
  };

  const addFeedback = async ({ id, fields }: { id: number; fields: Feedback }) => {
    const response = await axiosAuth.post(`/api/hr/interview/${id}/feedback`, fields);
    return response.data;
  };

  const updateFeedback = async ({ id, fields }: { id: number; fields: Feedback }) => {
    const response = await axiosAuth.put(`/api/hr/interview/${id}/feedback/${fields.id}`, fields);
    return response.data;
  };

  const deleteFeedback = async ({
    interviewId,
    feedbackId,
  }: {
    interviewId: number;
    feedbackId: number;
  }) => {
    const response = await axiosAuth.delete(
      `/api/hr/interview/${interviewId}/feedback/${feedbackId}`
    );
    return response.data;
  };

  return {
    allInterviews,
    scheduleInterview,
    updateScheduleInterview,
    addFeedback,
    updateFeedback,
    deleteFeedback,
  };
}
