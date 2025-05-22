import { Application } from "./application";
import { Document } from "./profile";

export type JobPosting = {
  id?: number;
  title: string;
  category: string;
  description: string;
  vacancies: number;
  salary_type: "monthly" | "hourly" | "yearly";
  salary_min?: string;
  salary_max?: string;
  employment_type: "Full-time" | "Part-time" | "Contract" | "Temporary" | string;
  employment_level: string;
  work_setup: string;
  status: "open" | "closed" | string;
  address_id: number | null;
  created_at: string;
  updated_at: string;
  tags: JobTag[];
  applications?: Application[];
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
};
