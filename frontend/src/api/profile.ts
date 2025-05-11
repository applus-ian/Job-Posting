import useAxiosAuth from "@/hooks/useAxiosAuth";
import { ApplicantProfile, EducationHistory, WorkExperience } from "@/types/profile";
import { useSession } from "next-auth/react";

export function useProfileApi() {
  const axiosAuth = useAxiosAuth();
  const { data: session } = useSession();

  const applicantDetails = async () => {
    const response = await axiosAuth.get("/api/applicant");
    return response.data;
  };

  const applicantProfile = async (fields: ApplicantProfile) => {
    const response = await axiosAuth.put(`/api/applicant/${session?.user.applicant_id}`, fields);
    console.log(session?.user.applicant_id);
    return response.data;
  };

  const addWorkExperience = async (fields: WorkExperience) => {
    const response = await axiosAuth.post("/api/workexperience", fields);
    return response.data;
  };

  const updateWorkExperience = async (fields: WorkExperience) => {
    const response = await axiosAuth.put(`/api/workexperience/${fields.id}`, fields);
    return response.data;
  };

  const deleteWorkExperience = async (id: number) => {
    const response = await axiosAuth.delete(`/api/workexperience/${id}`);
    return response.data;
  };

  const addEducationHistory = async (fields: EducationHistory) => {
    const response = await axiosAuth.post("/api/educationhistory", fields);
    return response.data;
  };

  const updateEducationHistory = async (fields: EducationHistory) => {
    const response = await axiosAuth.put(
      `/api/educationhistory/${session?.user.applicant_id}`,
      fields
    );
    return response.data;
  };

  const deleteEducationHistory = async (id: number) => {
    const response = await axiosAuth.delete(`/api/educationhistory/${id}`);
    return response.data;
  };

  const uploadProfile = async (data: File) => {
    const formData = new FormData();
    formData.append("profile", data);
    const response = await axiosAuth.post("/api/applicant/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  };

  return {
    applicantDetails,
    applicantProfile,
    addWorkExperience,
    updateWorkExperience,
    deleteWorkExperience,
    addEducationHistory,
    updateEducationHistory,
    deleteEducationHistory,
    uploadProfile,
  };
}
