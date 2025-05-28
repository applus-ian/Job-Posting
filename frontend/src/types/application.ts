import { ApplicationStatusSchema, ApplyJobSchema } from "@/schemas/application";
import { z } from "zod";
import { ApplicantProfile, Document } from "./profile";
import { JobPosting } from "./job";

export type Application = {
  id?: number;
  status: AppStatus;
  expected_salary: string;
  applicant_id: number;
  job_posting_id?: number;
  created_at?: string;
  updated_at?: string;
  applicant?: ApplicantProfile;
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

export type AppStatus = "received" | "reviewed" | "interview" | "offer" | "hired";

export type ApplicationStatusModalProps = {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  status: AppStatus;
  onConfirm: () => void;
  isLoading: boolean;
};

export type ApplyJobFields = z.infer<typeof ApplyJobSchema>;

export type ApplicationStatusField = z.infer<typeof ApplicationStatusSchema>;
