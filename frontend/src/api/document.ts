import useAxiosAuth from "@/hooks/useAxiosAuth";
import { saveAs } from "file-saver";

export function useDocumentApi() {
  const axiosAuth = useAxiosAuth();

  const uploadResume = async (data: File) => {
    // make a new form data containing the single file
    const formData = new FormData();
    formData.append("file", data);

    const response = await axiosAuth.post("/api/applicant/resume", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  };

  const uploadCoverLetter = async (data: File) => {
    // make a new form data containing the single file
    const formData = new FormData();
    formData.append("file", data);

    const response = await axiosAuth.post("/api/applicant/cover-letter", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  };

  const deleteResume = async (id: number) => {
    const response = await axiosAuth.delete(`/api/applicant/resume/${id}`);
    return response.data;
  };

  const deleteCoverLetter = async (id: number) => {
    const response = await axiosAuth.delete(`/api/applicant/cover-letter/${id}`);
    return response.data;
  };

  const downloadResume = async (id: number, filename: string) => {
    const response = await axiosAuth.get(`/api/applicant/resume/${id}`, { responseType: "blob" });
    saveAs(response.data, filename);
  };

  const downloadCoverLetter = async (id: number, filename: string) => {
    const response = await axiosAuth.get(`/api/applicant/cover-letter/${id}`, {
      responseType: "blob", 
    });
    saveAs(response.data, filename);
  };

  const viewPDFresume = async (file_name: string) => {
    try {
      console.log('Requesting PDF:', file_name); // Add logging
      const response = await axiosAuth.get(`/api/view-resume/${file_name}`, {
        responseType: "blob",
      });
      console.log('Response received:', response.status); // Add logging
      const url = window.URL.createObjectURL(new Blob([response.data]));
      return url;
    } catch (error) {
      console.error('Error details:');
      throw error;
    }
  }

  return {
    uploadResume,
    uploadCoverLetter,
    deleteResume,
    deleteCoverLetter,
    downloadResume,
    downloadCoverLetter,
    viewPDFresume,
  };
}
