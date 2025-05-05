"use client";
import { axiosAuth } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRefreshToken } from "./useRefreshToken";

const useAxiosAuth = () => {
  const { data: session } = useSession();
  const handleRefreshToken = useRefreshToken();

  useEffect(() => {
    // set authentication bearer
    const requestIntercept = axiosAuth.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${session?.user.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // refresh token
    const responseIntercept = axiosAuth.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error.config;
        if (error.response.status === 401 && !prevRequest.sent) {
          prevRequest.sent = true;
          await handleRefreshToken();
          prevRequest.headers["Authorization"] = `Bearer ${session?.user.token}`;
          return axiosAuth(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosAuth.interceptors.request.eject(requestIntercept);
      axiosAuth.interceptors.response.eject(responseIntercept);
    };
  }, [handleRefreshToken, session]);

  return axiosAuth;
};

export default useAxiosAuth;
