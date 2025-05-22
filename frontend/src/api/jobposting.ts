import useAxiosAuth from "@/hooks/useAxiosAuth";
import {
  JobPosting,
} from "@/types/job";

export function useJobPostingApi() {
  const axiosAuth = useAxiosAuth();

  const createJobPosting = async (fields: JobPosting) => {
    const response = await axiosAuth.post("/api/hr/jobposting", fields);
    return response.data;
  };

  return {
    createJobPosting,
  };
}
