import useAxiosAuth from "@/hooks/useAxiosAuth";
import { ChangePasswordData } from "@/types/auth";

export const useAuthApi = () => {
  const axiosAuth = useAxiosAuth();

  const logoutUser = async () => {
    const response = await axiosAuth.post("/api/auth/logout");
    return response.data;
  };

  const changePassword = async (credentials: ChangePasswordData) => {
    const response = await axiosAuth.post("/api/auth/change-password", credentials);
    return response.data;
  };

  return {
    logoutUser,
    changePassword,
  };
};
