import axios from "@/lib/axios";

export const openJobPostings = async () => {
  const response = await axios.get("/api/jobposting/open");
  return response.data;
};
