import useAxiosAuth from "@/hooks/useAxiosAuth";

export function useSavedJobApi() {
  const axiosAuth = useAxiosAuth();

  const getSavedJob = async () => {
    const response = await axiosAuth.get("/api/saved-job");
    return response.data;
  };

  const saveJobPosting = async (id: number) => {
    const response = await axiosAuth.post(`/api/saved-job/${id}`);
    return response.data;
  };

  const unsaveJobPosting = async (id: number) => {
    const response = await axiosAuth.delete(`/api/saved-job/${id}`);
    return response.data;
  };

  return { getSavedJob, saveJobPosting, unsaveJobPosting };
}
