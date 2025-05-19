import useAxiosAuth from "@/hooks/useAxiosAuth";
import {
  ApplicantAddress,
  ApplicantProfile,
  EducationHistory,
  EmergencyContact,
  Language,
  WorkExperience,
} from "@/types/profile";
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
    const response = await axiosAuth.put(`/api/educationhistory/${fields.id}`, fields);
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

  const addLanguage = async (fields: Language) => {
    const response = await axiosAuth.post("/api/language", fields);
    return response.data;
  };

  const updateLanguage = async (fields: Language) => {
    const response = await axiosAuth.put(`api/language/${fields.id}`, fields);
    return response.data;
  };

  const deleteLanguage = async (id: number) => {
    const response = await axiosAuth.delete(`/api/language/${id}`);
    return response.data;
  };

  const addEmergencyContact = async (fields: EmergencyContact) => {
    const response = await axiosAuth.post("api/emergencycontact", fields);
    return response.data;
  };

  const updateEmergencyContact = async (fields: EmergencyContact) => {
    const response = await axiosAuth.put(`api/emergencycontact/${fields.id}`, fields);
    return response.data;
  };

  const deleteEmergencyContact = async (id: number) => {
    const response = await axiosAuth.delete(`/api/emergencycontact/${id}`);
    return response.data;
  };

  const addAddress = async (fields: ApplicantAddress) => {
    const response = await axiosAuth.post("api/address", fields);
    return response.data;
  };

  const updateAddress = async (fields: ApplicantAddress) => {
    const response = await axiosAuth.put(`api/address/${fields.id}`, fields);
    return response.data;
  };

  const deleteAddress = async (id: number) => {
    const response = await axiosAuth.delete(`/api/address/${id}`);
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
    addLanguage,
    updateLanguage,
    deleteLanguage,
    addEmergencyContact,
    updateEmergencyContact,
    deleteEmergencyContact,
    addAddress,
    updateAddress,
    deleteAddress,
  };
}
