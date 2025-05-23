import axios from "@/lib/axios";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { JobPosting, JobPostingInput } from "@/types/job";

export function useJobPostingApi() {
  const axiosAuth = useAxiosAuth();

  const openJobPostings = async () => {
    const response = await axios.get("/api/jobposting/open");
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

  const createJobPosting = async (fields: JobPostingInput) => {
    const response = await axiosAuth.post("/api/hr/jobposting", fields);
    return response.data;
  };

  const updateJobPosting = async (fields: JobPosting) => {
    const response = await axiosAuth.put(`/api/hr/jobposting/${fields.id}`, fields);
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
    createJobPosting,
    updateJobPosting,
    deleteJobPosting,
  };
}
