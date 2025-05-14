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

export const WorkExperienceSchema = z
  .object({
    company: z.string().min(1, "Company name is required"),
    professional_title: z.string().min(1, "Professional title is required"),
    description: z.string().min(1, "Description is required"),
    start_date: z.string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid start date format (YYYY-MM-DD)")
      .refine((start_date) => new Date(start_date) <= new Date(), {
        message: "Start date cannot be later than today's date",
      }),
    end_date: z.string()
      .optional() 
      .refine((data) => {
        if (data) {
          return /^\d{4}-\d{2}-\d{2}$/.test(data);
        }
        return true;
      }, "Invalid end date format (YYYY-MM-DD)"),
  })
  .refine(
    (data) => {
      if (data.end_date) {
        return new Date(data.end_date) >= new Date(data.start_date);
      }
      return true;
    },
    {
      path: ["end_date"],
      message: "End date must not be earlier than start date",
    }
  );

export const EducationHistorySchema = z
  .object({
    school: z.string().min(1, "School name is required"),
    degree: z.string().min(1, "Degree is required"),
    course: z.string().min(1, "Course is required"),
    start_year: z.string().regex(/^\d{4}$/, "Start year must be in YYYY format"),
    end_year: z.string().regex(/^\d{4}$/, "End year must be in YYYY format"),
  })
  .refine((data) => {
    const currentYear = new Date().getFullYear();
    return Number(data.start_year) <= currentYear;
  }, {
    message: "Start year must not be later than the current year",
    path: ["start_year"],
  })
  .refine((data) => {
    const currentYear = new Date().getFullYear();
    return Number(data.end_year) <= currentYear;
  }, {
    message: "End year must not be later than the current year",
    path: ["end_year"],
  })
  .refine((data) => {
    return Number(data.start_year) <= Number(data.end_year);
  }, {
    message: "End year must not be earlier than start year",
    path: ["end_year"],
  });


export const DocumentSchema = z.object({
  file: z
    .array(z.custom<File>())
    .length(1, "Please upload exactly one file")
    .refine(
      (files) => {
        const file = files[0];
        return file ? file.type === "application/pdf" : false;
      },
      {
        message: "Only PDF files are allowed",
        path: ["file"],
      }
    )
    .refine(
      (files) => {
        const file = files[0];
        return file ? file.size <= 5 * 1024 * 1024 : false;
      },
      {
        message: "File size must be less than or equal to 5MB",
        path: ["file"],
      }
    ),
});
