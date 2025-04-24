import { InterviewSummaryCard } from "../interview/InterviewSummaryCard";
import { InterviewerCard } from "../interview/InterviewerCard";
import { FeedbackCard } from "../interview/FeedbackCard";

export function InterviewCard() {
  return (
    <div className="mt-6">
      <p className="text-xl">Interview Details</p>
      <div className="flex flex-col-reverse lg:flex-row w-full gap-6 mt-4">
        <div className="lg:w-2/3 w-full">
          <FeedbackCard />
        </div>
        <div className="flex flex-col lg:w-1/3 w-full gap-6">
          <InterviewSummaryCard />
          <InterviewerCard />
        </div>
      </div>
    </div>
  );
}
