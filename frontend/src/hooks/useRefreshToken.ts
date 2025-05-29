"use client";
import axios from "@/lib/axios";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

export const useRefreshToken = () => {
  const { data: session, update } = useSession();

  const getRefreshToken = async () => {
    try {
      console.log(`Refresh Token: ${session?.user.refresh_token}`);
      const response = await axios.post("/api/auth/refresh-token", null, {
        headers: {
          Authorization: `Bearer ${session?.user.refresh_token}`,
        },
      });

      if (session && response.data.token) {
        await update({
          user: {
            ...session.user,
            token: response.data.token,
          },
        });

        console.log(`New Token: ${session?.user.token}`);
        console.log("Access token refreshed!");
      }
    } catch (error) {
      console.error("Token refresh failed", error);
      toast.info("Session expired, Login again");
      signOut();
    }
  };

  return getRefreshToken;
};
