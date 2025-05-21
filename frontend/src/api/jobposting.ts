import axios from "@/lib/axios";
import useAxiosAuth from "@/hooks/useAxiosAuth";

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
  return { openJobPostings, jobPostingWithSaved };
}
