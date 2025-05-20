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
  id: number;
  rating: number;
  comment: string;
  interview_id: number;
  created_at: string;
  updated_at: string;
};
