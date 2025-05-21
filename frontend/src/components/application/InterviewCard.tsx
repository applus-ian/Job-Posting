import { InterviewSummaryCard } from "../interview/InterviewSummaryCard";
import { InterviewerCard } from "../interview/InterviewerCard";
import { FeedbackCard } from "../interview/FeedbackCard";
import { Interview } from "@/types/interview";

export function InterviewCard({ interview }: { interview: Interview }) {
  const hasFeedback = interview.feedback.length > 0;
  return (
    <div className="mt-4">
      <p className="text-xl">Interview Details</p>
      <div className="flex flex-col-reverse lg:flex-row w-full gap-3 mt-4">
        {hasFeedback && (
          <div className="lg:w-2/3 w-full">
            <FeedbackCard feedback={interview.feedback} />
          </div>
        )}
        <div className={`flex gap-3 w-full ${hasFeedback && "flex-col lg:w-1/3"}`}>
          <div>
            <InterviewSummaryCard interview={interview} />
          </div>
          <div>
            <InterviewerCard />
          </div>
        </div>
      </div>
    </div>
  );
}
