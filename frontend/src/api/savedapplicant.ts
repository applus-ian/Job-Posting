import useAxiosAuth from "@/hooks/useAxiosAuth";

export function useSavedApplicantApi() {
  const axiosAuth = useAxiosAuth();

  const getSavedApplicant = async () => {
    const response = await axiosAuth.get("/api/hr/saved-applicant");
    return response.data;
  };

  const saveApplicant = async ({
    applicantId,
    jobpostingId,
  }: {
    applicantId: number;
    jobpostingId: number;
  }) => {
    const response = await axiosAuth.post(`/api/hr/saved-applicant/${applicantId}/${jobpostingId}`);
    return response.data;
  };

  const unsaveApplicant = async (id: number) => {
    const response = await axiosAuth.delete(`/api/hr/saved-applicant/${id}`);
    return response.data;
  };

  return { getSavedApplicant, saveApplicant, unsaveApplicant };
}
