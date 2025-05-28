import { z } from "zod";
import { Application } from "./application";
import { FeedbackSchema } from "@/schemas/interview";

export type Interview = {
  id: number;
  schedule_date: string;
  schedule_time: string;
  mode: "in_person" | "virtual";
  meeting_link?: string | null;
  platform?: string | null;
  location?: string | null;
  status: "upcoming" | "completed" | "rescheduled" | "no-show" | "cancelled";
  application_id: number;
  created_at: string;
  updated_at: string;
  feedback: Feedback[];
};

export type Feedback = {
  id?: number;
  rating: number;
  comment: string;
  interview_id?: number;
  created_at?: string;
  updated_at?: string;
};

export type InterviewFields = {
  id?: number;
  schedule_date: string;
  schedule_time: string;
  mode: "in_person" | "virtual";
  meeting_link?: string | null | undefined;
  platform?: string | null | undefined;
  location?: string | null | undefined;
  status: "upcoming" | "completed" | "rescheduled" | "no-show" | "cancelled";
};

export type InterviewScheduleModalProps = {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  application: Application;
  interview: Interview | null;
};

export type GiveFeedbackModalProps = {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  interview: Interview;
  feedback: Feedback | null;
};

export type FeedbackFormData = z.infer<typeof FeedbackSchema>;
