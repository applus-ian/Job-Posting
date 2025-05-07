import axios from "@/lib/axios";
import { AuthCredentials, ForgotPasswordField, PasswordResetData, SocialAuth } from "@/types/auth";

export const loginUser = async (credentials: AuthCredentials) => {
  const response = await axios.post("/api/auth/login", credentials);
  return response.data;
};

export const registerUser = async (credentials: AuthCredentials) => {
  const response = await axios.post("/api/auth/register", credentials);
  return response.data;
};

export const forgotPassword = async (email: ForgotPasswordField) => {
  const response = await axios.post("/api/auth/forgot-password", email);
  return response.data;
};

export const passwordReset = async (credentials: PasswordResetData) => {
  const response = await axios.post("/api/auth/reset-password", credentials);
  return response.data;
};

export const logoutUser = async () => {
  const response = await axios.post("/api/auth/logout");
  return response.data;
};

export const refreshToken = async () => {
  const response = await axios.post("/api/auth/refresh-token");
  return response.data;
};

export const handleSocialLogin = (provider: SocialAuth) => {
  window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/${provider}/redirect`;
};
