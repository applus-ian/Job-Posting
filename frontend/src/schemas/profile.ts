import { nameSchema } from "./name";
import { z } from "zod";

export const ApplicantProfileSchema = z.object({
  email: z.string().email("Invalid email address"),
  professional_title: z.string().min(1, "Professional title is required"),
  biography: z.string().optional(),
  first_name: nameSchema("First name"),
  middle_name: nameSchema("Middle name", 1).optional().or(z.literal("")),
  last_name: nameSchema("Last name"),
  suffix: nameSchema("Suffix", 1).optional().or(z.literal("")),
  sex: z.enum(["male", "female"]).or(z.string()),
  date_of_birth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  nationality: z.string().min(1, "Nationality is required"),
  phone_number: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^(09\d{9}|\+639\d{9})$/,
      "Phone number must start with 09 or +639 followed by 9 digits"
    ),
});

export const WorkExperienceSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  professional_title: z.string().min(1, "Professional title is required"),
  description: z.string().min(1, "Description is required"),
  start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid start date format (YYYY-MM-DD)"),
  end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid end date format (YYYY-MM-DD)"),
});

export const EducationHistorySchema = z.object({
  school: z.string().min(1, "School name is required"),
  degree: z.string().min(1, "Degree is required"),
  course: z.string().min(1, "Course is required"),
  start_year: z.string().regex(/^\d{4}$/, "Start year must be in YYYY format"),
  end_year: z.string().regex(/^\d{4}$/, "End year must be in YYYY format"),
});
