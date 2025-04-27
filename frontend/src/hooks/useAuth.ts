import { loginUser, registerUser, forgotPassword, passwordReset, logoutUser } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";

export function useAuth() {
  const router = useRouter();

  // login
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      Cookie.set("auth_token", data.token);
      router.push("/dashboard");
    },
    onError: () => {
      console.log("Something went wrong!");
    },
  });

  // register
  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      router.push("/login");
    },
    onError: () => {
      console.log("Something went wrong!");
    },
  });

  // forgot password
  const forgotPasswordMutation = useMutation({
    mutationFn: forgotPassword,
    onError: () => {
      console.log("Something went wrong!");
    },
  });

  // password reset
  const passwordResetMutation = useMutation({
    mutationFn: passwordReset,
    onSuccess: () => {
      router.push("/login");
    },
    onError: () => {
      console.log("Something went wrong!");
    },
  });

  // logout
  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      router.push("/login");
    },
    onError: () => {
      console.log("Something went wrong!");
    },
  });

  return {
    loginMutation,
    registerMutation,
    forgotPasswordMutation,
    passwordResetMutation,
    logoutMutation,
  };
}
