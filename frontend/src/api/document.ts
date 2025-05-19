import useAxiosAuth from "@/hooks/useAxiosAuth";
import { saveAs } from "file-saver";

export function useDocumentApi() {
  const axiosAuth = useAxiosAuth();

  const getDefaultFiles = async () => {
    const response = await axiosAuth.get("/api/applicant/default/file");
    return response.data;
  };

  const getFile = async (id: number, filename: string) => {
    const response = await axiosAuth.get(`/api/applicant/file/${id}`, {
      responseType: "blob",
    });

    return new File([response.data], filename, { type: response.data.type });
  };

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

  return {
    getDefaultFiles,
    getFile,
    uploadResume,
    uploadCoverLetter,
    deleteResume,
    deleteCoverLetter,
    downloadResume,
    downloadCoverLetter,
  };
}
