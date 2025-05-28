import { JobPosting } from "./job";
import { ApplicantProfile } from "./profile";

export type SavedApplicant = {
  id?: number;
  applicant_id: number;
  job_posting_id: number;
  created_at?: string;
  updated_at?: string;
  job_posting: JobPosting;
  applicant: ApplicantProfile;
};

export type SavedApplicantConfirmModalProps = {
  savedapplicant: SavedApplicant;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export type SavedApplicantMultipleConfirmModalProps = {
  ids: number[];
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};
