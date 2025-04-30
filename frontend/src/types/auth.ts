import { z } from "zod";
import {
  LoginSchema,
  RegisterSchema,
  ForgotPasswordSchema,
  PasswordResetSchema,
} from "@/schemas/auth";
import React from "react";

export type AuthCredentials = {
  first_name?: string;
  last_name?: string;
  middle_name?: string;
  suffix?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
};

export type PasswordResetData = {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type SocialAuth = "google" | "facebook";

export type PasswordResetForm = Omit<PasswordResetData, "token" | "email">;

export type LoginFields = z.infer<typeof LoginSchema>;

export type RegisterFields = z.infer<typeof RegisterSchema>;

export type ForgotPasswordField = z.infer<typeof ForgotPasswordSchema>;

export type PasswordResetFields = z.infer<typeof PasswordResetSchema>;

export type LogoutDialogProps = {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
};
