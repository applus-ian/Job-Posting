"use client";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { refreshToken } from "@/api/auth";

export const useRefreshToken = () => {
  const { data: session } = useSession();

  const handleRefreshToken = async () => {
    try {
      const response = await refreshToken();
      if (session) session.user.token = response?.token;
      console.log(`Refresh token: ${response.token}`);
    } catch (error) {
      console.error("Token refresh failed", error);
      signOut();
    }
  };

  return handleRefreshToken;
};
