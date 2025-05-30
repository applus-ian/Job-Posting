import { z } from "zod";

export const InterviewSchema = z
  .object({
    schedule_date: z.string().min(1, "Date is required"),
    schedule_time: z.string().min(1, "Time is required"),
    mode: z.enum(["in_person", "virtual"]),
    meeting_link: z
      .string()
      .optional()
      .nullable()
      .transform((val) => (val === "" ? null : val)),
    platform: z
      .string()
      .optional()
      .nullable()
      .transform((val) => (val === "" ? null : val)),
    location: z
      .string()
      .optional()
      .nullable()
      .transform((val) => (val === "" ? null : val)),
    status: z.enum(["upcoming", "completed", "rescheduled", "no-show", "cancelled", "rejected"]),
  })
  .superRefine((data, ctx) => {
    if (data.mode === "in_person") {
      if (!data.location || data.location.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["location"],
          message: "Location is required for in-person interviews",
        });
      }
    }

    if (data.mode === "virtual") {
      if (!data.platform || data.platform.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["platform"],
          message: "Platform is required for virtual interviews",
        });
      }
      if (!data.meeting_link || data.meeting_link.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["meeting_link"],
          message: "Meeting link is required for virtual interviews",
        });
      } else {
        // Only validate meeting link URL format when it's not null
        try {
          new URL(data.meeting_link);
        } catch {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["meeting_link"],
            message: "Invalid meeting link",
          });
        }
      }
    }
  });

export const FeedbackSchema = z.object({
  rating: z
    .number()
    .min(1, { message: "Rating must be at least 1" })
    .max(5, { message: "Rating cannot exceed 5" }),
  comment: z.string().min(5, { message: "Comment must be at least 5 characters long" }),
});
