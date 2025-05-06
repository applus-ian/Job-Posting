import { capitalizeText } from "@/utils/capitalizeText";
import { z } from "zod";

// first, middle, and last name schema
export const nameSchema = (field: string, minLength = 2) =>
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
