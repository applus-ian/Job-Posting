import { z } from "zod";
import {
  LoginSchema,
  RegisterSchema,
  ForgotPasswordSchema,
  PasswordResetSchema,
  ChangePasswordSchema,
} from "@/schemas/auth";
import React from "react";

type PasswordFields = {
  password: string;
  password_confirmation: string;
};

export type User = {
  id: number;
  email: string;
  email_verified_at: string | null;
  profile: string | null;
  google_id: string | null;
  facebook_id: string | null;
  created_at: string;
  updated_at: string;
};

export type AuthCredentials = {
  first_name?: string;
  last_name?: string;
  middle_name?: string;
  suffix?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
};

export type ChangePasswordData = {
  current_password: string;
} & PasswordFields;

export type PasswordResetData = {
  token: string;
  email: string;
} & PasswordFields;

export type SocialAuth = "google" | "facebook";

export type PasswordResetForm = Omit<PasswordResetData, "token" | "email">;

export type LoginFields = z.infer<typeof LoginSchema>;

export type RegisterFields = z.infer<typeof RegisterSchema>;

export type ForgotPasswordField = z.infer<typeof ForgotPasswordSchema>;

export type PasswordResetFields = z.infer<typeof PasswordResetSchema>;

export type ChangePasswordFields = z.infer<typeof ChangePasswordSchema>;

export type LogoutDialogProps = {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
};
