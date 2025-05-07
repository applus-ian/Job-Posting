import useAxiosAuth from "@/hooks/useAxiosAuth";

export const useAuthApi = () => {
  const axiosAuth = useAxiosAuth();

  const logoutUser = async () => {
    const response = await axiosAuth.post("/api/auth/logout");
    return response.data;
  };

  const refreshToken = async () => {
    const response = await axiosAuth.post("/api/auth/refresh-token");
    return response.data;
  };

  return {
    logoutUser,
    refreshToken,
  };
};
