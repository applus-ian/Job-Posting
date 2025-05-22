import { z } from "zod";

export const JobPostingSchema = z
  .object({
    title: z.string().min(1, { message: "Job title is required" }),
    category: z.string().min(1, { message: "Category is required" }),
    tags: z.array(z.string()),

    salary_type: z.enum(["monthly", "hourly", "weekly", "annually"], {
      errorMap: () => ({ message: "Select a valid salary type" }),
    }),
    salary_min: z
      .number({ invalid_type_error: "Minimum salary must be a number" })
      .nonnegative({ message: "Minimum salary cannot be negative" })
      .optional(),
    salary_max: z
      .number({ invalid_type_error: "Maximum salary must be a number" })
      .nonnegative({ message: "Maximum salary cannot be negative" })
      .optional(),

    employment_level: z.string().min(1, { message: "Employment level is required" }),
    employment_type: z.enum(["Full-time", "Part-time", "Contract", "Temporary"], {
      errorMap: () => ({ message: "Select a valid employment type" }),
    }),
    work_setup: z.string().min(1, { message: "Work setup is required" }),
    vacancies: z
      .number({ invalid_type_error: "Vacancies must be a number" })
      .int({ message: "Vacancies must be an integer" })
      .nonnegative({ message: "Vacancies cannot be negative" }),

    address_id: z.number().nullable().optional(),

    description: z.string().min(1, { message: "Job description is required" }),

    status: z.enum(["open", "closed"]).optional(),

    created_at: z.string().optional(),
    updated_at: z.string().optional(),
  })
  .refine(
    (data) => (data.salary_max ?? 0) >= (data.salary_min ?? 0),
    {
      message: "Maximum salary must be greater than or equal to minimum salary",
      path: ["salary_max"],
    }
  );
