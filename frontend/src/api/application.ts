import useAxiosAuth from "@/hooks/useAxiosAuth";
import { ApplyJob } from "@/types/application";

export function useApplicationApi() {
  const axiosAuth = useAxiosAuth();

  const getAllApplication = async () => {
    const response = await axiosAuth.get("/api/hr/application/all");
    return response.data;
  };

  const getApplicantDetails = async (id: number) => {
    const response = await axiosAuth.get(`/api/hr/applicant/${id}`);
    return response.data;
  };

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

  const updateApplicationStatus = async ({ id, status }: { id: number; status: string }) => {
    const response = await axiosAuth.put(`/api/application/${id}`, status);
    return response.data;
  };

  return {
    getAllApplication,
    getApplicantDetails,
    getApplicationDetails,
    getApplicantApplications,
    applyJob,
    updateApplicationStatus,
  };
}
