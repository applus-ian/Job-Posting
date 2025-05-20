import { ApplyJobSchema } from "@/schemas/application";
import { z } from "zod";
import { Document } from "./profile";
import { JobPosting } from "./job";

export type Application = {
  id?: number;
  status: string;
  expected_salary: string;
  applicant_id: number;
  job_posting_id?: number;
  created_at?: string;
  updated_at?: string;
  job_posting: JobPosting;
};

export type ApplicationStatus = {
  id: number;
  status: string;
  application_id: string;
  applicant_id: number;
  created_at: string;
  updated_at: string;
};

export type ApplyFormProp = {
  id: number | undefined;
  resume: Document | null;
  coverletter: Document | null;
};

export type ApplyJob = {
  id?: number;
  expected_salary: number;
  resume: File[];
  coverletter: File[];
};

export type ApplyJobFields = z.infer<typeof ApplyJobSchema>;
