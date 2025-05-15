import {
  ApplicantProfileSchema,
  ApplicantAddressSchema,
  WorkExperienceSchema,
  EducationHistorySchema,
  LanguageSchema,
  EmergencyContactSchema,
} from "@/schemas/profile";
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

export type ApplicantAddress ={
  id?: number;
  address: string;
  country: string;
  province: string;
  city: string;
  street: string;
  zipcode: number;
  created_at?: string;
  updated_at?: string;
}

export type WorkExperience = {
  id?: number;
  company: string;
  professional_title: string;
  description: string;
  start_date: string;
  end_date: string;
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

// types/profile.ts
export type Language = {
  id?: number;
  language: string;
  proficiency_level: "beginner" | "intermediate" | "advanced" | "fluent" | "native" | "" ;
};

export type EmergencyContact = {
  id? : number;
  full_name : string;
  phone_number : string;
  relationship : string;
  applicant_id? : number;
  created_at?: string;
  updated_at?: string;
}

export type AddEmergencyProfileModalProps = {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export type AddLanguageModalProps = {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export type ApplicantProfileFields = z.infer<typeof ApplicantProfileSchema>;
export type ApplicantAddressFields = z.infer<typeof ApplicantAddressSchema>;
export type WorkExperienceFields = z.infer<typeof WorkExperienceSchema>;
export type EducationHistoryFields = z.infer<typeof EducationHistorySchema>;
export type LanguageFields = z.infer<typeof LanguageSchema>;
export type EmergencyContactFields = z.infer<typeof EmergencyContactSchema>;
