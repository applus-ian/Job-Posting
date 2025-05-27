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
        console.log('Requesting PDF:', file_name);
        const response = await axiosAuth.get(`/api/applicant/resume/view/${encodeURIComponent(file_name)}`, {
            responseType: "blob",
            headers: {
                'Accept': 'application/pdf',
                'Content-Type': 'application/pdf',
            }
        });
        
        if (!response.data || response.data.size === 0) {
            throw new Error('Empty PDF response received');
        }
        
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        return url;
    } catch (error) {
        console.error('Error viewing PDF:', error);
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
