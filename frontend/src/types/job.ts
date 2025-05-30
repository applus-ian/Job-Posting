import { z } from "zod";
import { Application } from "./application";
import { Document } from "./profile";
import { JobPostingSchema } from "@/schemas/jobposting";

export type JobPosting = {
  id?: number;
  title: string;
  category: string;
  description: string;
  vacancies: number;
  salary_type: "weekly" | "monthly" | "hourly" | "annually";
  salary_min?: number;
  salary_max?: number;
  employment_type: "full-time" | "part-time" | "contract" | "temporary";
  employment_level: string;
  work_setup: string;
  status: "open" | "closed" | "draft";
  address_id?: number;
  address: Address;
  created_at?: string;
  updated_at?: string;
  tags: JobTag[];
  applications?: Application[];
};

export type Address = {
  id?: number;
  address: string;
  country: string;
  province: string;
  city: string;
  street: string;
  zipcode: string;
  created_at?: string;
  updated_at?: string;
};

export type JobTag = {
  id?: number;
  tag: string;
  job_posting_id: number;
  created_at?: string;
  updated_at?: string;
};

export type JobListProps = {
  jobpostings: JobPosting[];
  onSelectJob: (jobposting: JobPosting) => void;
  selectedJobId?: number;
};

export type JobCardProps = {
  jobposting: JobPosting;
  onClick: () => void;
  isSelected: boolean;
};

export type TagInputProps = {
  items: string[];
  setItems: React.Dispatch<React.SetStateAction<string[]>>;
  label: string;
  placeholder: string;
};

export type ApplyJobModalProps = {
  jobposting: JobPosting;
  documents: Document[];
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export type JobDetailModalProps = {
  jobposting: JobPosting;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  status?: "open" | "closed" | "draft";
};

export type JobPostingInput = {
  id?: number;
  title: string;
  category: string;
  description: string;
  vacancies: number;
  salary_type: "weekly" | "monthly" | "hourly" | "annually";
  salary_min?: number;
  salary_max?: number;
  employment_type: "full-time" | "part-time" | "contract" | "temporary";
  employment_level: string;
  work_setup: string;
  status: "open" | "closed" | "draft";
  tags: string[];
};

export type JobPostingFields = z.infer<typeof JobPostingSchema>;
