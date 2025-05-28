import { z } from "zod";

const pdfFileValidation = z
  .array(z.custom<File>())
  .length(1, "Please upload exactly one file")
  .refine(
    (files) => {
      const file = files[0];
      return file ? file.type === "application/pdf" : false;
    },
    {
      message: "Only PDF files are allowed",
    }
  )
  .refine(
    (files) => {
      const file = files[0];
      return file ? file.size <= 5 * 1024 * 1024 : false;
    },
    {
      message: "File size must be less than or equal to 5MB",
    }
  );

export const ApplyJobSchema = z.object({
  expected_salary: z.coerce.number().min(1, { message: "Expected salary must be greater than 0." }),
  resume: pdfFileValidation,
  coverletter: pdfFileValidation,
});

export const ApplicationStatusSchema = z.object({
  status: z.enum(["received", "reviewed", "interview", "offer", "hired"]),
});
