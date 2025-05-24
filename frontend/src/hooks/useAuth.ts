import { loginUser, registerUser, forgotPassword, passwordReset } from "@/api/auth";
import { useAuthApi } from "@/api/auth-private";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

export function useAuth() {
  const router = useRouter();
  const { logoutUser, changePassword } = useAuthApi();

  // login
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      Cookie.set("auth_token", data.token);
      router.push("/dashboard");
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  // register
  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      router.push("/login");
      toast.success("Account Registered Successfully!");
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  // forgot password
  const forgotPasswordMutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      toast.success("Reset Password Link Sent!");
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  // password reset
  const passwordResetMutation = useMutation({
    mutationFn: passwordReset,
    onSuccess: (data) => {
      router.push("/login");
      toast.success(data.message);
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  // logout
  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      signOut();
      Cookie.remove("auth_token");
      router.push("/login");
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  // change password
  const changePasswordMutation = useMutation({
    mutationFn: changePassword,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  return {
    loginMutation,
    registerMutation,
    forgotPasswordMutation,
    passwordResetMutation,
    logoutMutation,
    changePasswordMutation,
  };
}
