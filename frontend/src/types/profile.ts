import {
  ApplicantProfileSchema,
  WorkExperienceSchema,
  EducationHistorySchema,
  DocumentSchema,
} from "@/schemas/profile";
import React from "react";
import { z } from "zod";

export type ApplicantProfile = {
  id?: number;
  professional_title: string;
  biography?: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  suffix?: string;
  sex: "male" | "female" | string;
  date_of_birth: string;
  nationality: string;
  phone_number: string;
  user_id?: number;
  address_id?: number | null;
  created_at?: string;
  updated_at?: string;
};

export type WorkExperience = {
  id?: number;
  company: string;
  professional_title: string;
  description: string;
  start_date: string;
  end_date?: string;
  applicant_id?: number;
  created_at?: string;
  updated_at?: string;
};

export type EducationHistory = {
  id?: number;
  school: string;
  degree: string;
  course: string;
  start_year: string;
  end_year: string;
  applicant_id?: number;
  created_at?: string;
  updated_at?: string;
};

export type Document = {
  id: number;
  file_name: string;
  file_path: string;
  type: DocumentType;
  application_id: number | null;
  applicant_id: number | null;
  offer_id: number | null;
  created_at: string;
  updated_at: string;
};

export type AddProfileModalProps = {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export type DeleteWorkExperienceModalProps = {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  workexperience: WorkExperience;
};

export type DeleteEducationModalProps = {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  educationhistory: EducationHistory;
};

export type DocumentType = "resume" | "coverletter";

export type DocumentFormProps = {
  type: DocumentType;
  label: string;
};

export type DocumentItemProps = DocumentFormProps & {
  document: Document;
};

export type DeleteDocumentModalProps = {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  document: Document;
};

export type ApplicantProfileFields = z.infer<typeof ApplicantProfileSchema>;
export type WorkExperienceFields = z.infer<typeof WorkExperienceSchema>;
export type EducationHistoryFields = z.infer<typeof EducationHistorySchema>;
export type DocumentValue = z.infer<typeof DocumentSchema>;
