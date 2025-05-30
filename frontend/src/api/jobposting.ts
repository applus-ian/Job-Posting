import axios from "@/lib/axios";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { JobPostingInput } from "@/types/job";

export function useJobPostingApi() {
  const axiosAuth = useAxiosAuth();

  const openJobPostings = async () => {
    const response = await axios.get("/api/jobposting/open");
    return response.data;
  };

  const getFeaturedJobs = async () => {
    const response = await axios.get("/api/jobposting/featured");
    return response.data;
  };

  const jobPostingWithSaved = async () => {
    const response = await axiosAuth.get("/api/jobposting/open/saved");
    return response.data;
  };

  const allJobPostings = async () => {
    const response = await axiosAuth.get("/api/hr/jobposting");
    return response.data;
  };

  const getJobPosting = async (id: number) => {
    const response = await axiosAuth.get(`/api/hr/jobposting/${id}`);
    return response.data;
  };

  const createJobPosting = async (fields: JobPostingInput) => {
    const response = await axiosAuth.post("/api/hr/jobposting", fields);
    return response.data;
  };

  const updateJobPosting = async (fields: JobPostingInput) => {
    const response = await axiosAuth.put(`/api/hr/jobposting/${fields.id}`, fields);
    return response.data;
  };

  const updateJobPostingStatus = async ({ id, status }: { id: number; status: string }) => {
    const response = await axiosAuth.patch(`/api/hr/jobposting/${id}`, { status });
    return response.data;
  };

  const deleteJobPosting = async (id: number) => {
    const response = await axiosAuth.delete(`/api/hr/jobposting/${id}`);
    return response.data;
  };

  return {
    allJobPostings,
    openJobPostings,
    jobPostingWithSaved,
    getJobPosting,
    createJobPosting,
    updateJobPosting,
    updateJobPostingStatus,
    deleteJobPosting,
    getFeaturedJobs,
  };
}
