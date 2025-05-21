import useAxiosAuth from "@/hooks/useAxiosAuth";
import { ApplyJob } from "@/types/application";

export function useApplicationApi() {
  const axiosAuth = useAxiosAuth();

  const getApplicantApplications = async () => {
    const response = await axiosAuth.get("/api/application/view-applications");
    return response.data;
  };

  const getApplicationDetails = async (id: number) => {
    const response = await axiosAuth.get(`/api/application/${id}`);
    return response.data;
  };

  const applyJob = async (fields: ApplyJob) => {
    const formData = new FormData();

    formData.append("expected_salary", fields.expected_salary.toString());

    formData.append("resume", fields.resume[0]);
    formData.append("coverletter", fields.coverletter[0]);

    const response = await axiosAuth.post(`/api/application/${fields.id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  };

  return { getApplicationDetails, getApplicantApplications, applyJob };
}
