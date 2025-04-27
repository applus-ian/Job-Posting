import { z } from "zod";
import { capitalizeText } from "@/utils/capitalizeText";

// first, middle, and last name schema
const nameSchema = (field: string, minLength = 2) =>
  z
    .string()
    .min(minLength, `${field} must be at least ${minLength} character(s)`)
    .max(50, `${field} must be at most 50 characters`)
    .regex(
      /^[a-zA-ZÀ-ÖØ-öø-ÿ' .-]+(?: [a-zA-ZÀ-ÖØ-öø-ÿ' .-]+)*$/,
      `${field} can only contain letters, spaces, hyphens, apostrophes, middle initials, and periods`
    )
    .trim()
    .transform((value) =>
      value
        .split(" ")
        .map((word) => capitalizeText(word))
        .join(" ")
    );

export const RegisterSchema = z
  .object({
    first_name: nameSchema("First name"),
    middle_name: nameSchema("Middle name", 1).optional().or(z.literal("")),
    last_name: nameSchema("Last name"),
    suffix: nameSchema("Suffix", 1).optional().or(z.literal("")),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Your password must be at least 8 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, {
        message: "Password must contain at least one digit",
      })
      .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
  });

export const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, "Your password must be at least 8 characters"),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export const PasswordResetSchema = z
  .object({
    password: z
      .string()
      .min(8, {
        message: "Your new password must be at least 8 characters",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, {
        message: "Password must contain at least one digit",
      })
      .regex(/[^A-Za-z0-9]/, {
        message: "Password must contain at least one special character",
      }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
  });
