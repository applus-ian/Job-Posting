import axios from "@/lib/axios";
import { AuthCredentials, ForgotPasswordField, PasswordResetData } from "@/types/auth";

export const loginUser = async (credentials: AuthCredentials) => {
  const response = await axios.post("/auth/login", credentials);
  return response.data;
};

export const registerUser = async (credentials: AuthCredentials) => {
  const response = await axios.post("/auth/register", credentials);
  return response.data;
};

export const forgotPassword = async (email: ForgotPasswordField) => {
  const response = await axios.post("/auth/forgot-password", email);
  return response.data;
};

export const passwordReset = async (credentials: PasswordResetData) => {
  const response = await axios.post("/auth/reset-password", credentials);
  return response.data;
};

export const logoutUser = async () => {
  const response = await axios.post("/auth/logout");
  return response.data;
};
