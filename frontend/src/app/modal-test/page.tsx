"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MoveToOfferModal } from "@/components/application/MoveToOfferModal";
import { HireApplicantModal } from "@/components/application/HireApplicantModal";
import { RejectApplicantModal } from "@/components/application/RejectApplicantModal";
import { ScheduleInterviewModal } from "@/components/application/ScheduleNewInterviewModal";
import { FeedbackModal } from "@/components/application/FeedbackModal";
import { MarkInterviewCompleteModal } from "@/components/application/MarkInterviewCompleteModal";
import { MarkInterviewRejectedModal } from "@/components/application/MarkInterviewRejectedModal";
import { MarkInterviewModal } from "@/components/application/MarkInterviewModal";

export default function ModalTestPage() {
  const [offerOpen, setOfferOpen] = useState(false);
  const [hireOpen, setHireOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  // ✅ Add the missing states for the new modals
  const [openComplete, setOpenComplete] = useState(false);
  const [openReject, setOpenReject] = useState(false);
  const [openDynamic, setOpenDynamic] = useState(false);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">Test Modal Page</h1>

      <div className="flex flex-wrap gap-4">
        <Button onClick={() => setOfferOpen(true)}>Move to Offer</Button>
        <Button onClick={() => setHireOpen(true)} className="bg-green-600 hover:bg-green-700">
          Hire Applicant
        </Button>
        <Button onClick={() => setRejectOpen(true)} variant="destructive">
          Reject Applicant
        </Button>
        <Button onClick={() => setScheduleOpen(true)} className="bg-orange-600 hover:bg-orange-700 text-white">
          Schedule Interview
        </Button>
        <Button onClick={() => setFeedbackOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
          Give Feedback
        </Button>
        <Button onClick={() => setOpenComplete(true)}>Test Complete Modal</Button>
        <Button onClick={() => setOpenReject(true)}>Test Reject Modal</Button>
        <Button onClick={() => setOpenDynamic(true)}>Test Dynamic Modal</Button>
      </div>

      {/* Move to Offer Modal */}
      <MoveToOfferModal
        open={offerOpen}
        onOpenChange={setOfferOpen}
        onConfirm={() => alert("Moved to Offer!")}
      />

      {/* Hire Applicant Modal */}
      <HireApplicantModal
        open={hireOpen}
        onOpenChange={setHireOpen}
        onConfirm={() => alert("Applicant Hired!")}
      />

      {/* Reject Applicant Modal */}
      <RejectApplicantModal
        open={rejectOpen}
        onOpenChange={setRejectOpen}
        onConfirm={() => alert("Applicant Rejected!")}
      />

      {/* Schedule Interview Modal */}
      <ScheduleInterviewModal
        open={scheduleOpen}
        onOpenChange={setScheduleOpen}
        onSchedule={() => alert("Interview Scheduled!")}
      />

      {/* Feedback Modal */}
      <FeedbackModal
        open={feedbackOpen}
        onOpenChange={setFeedbackOpen}
        onSubmit={(rating, comment) => {
          alert(`Feedback Submitted!\nRating: ${rating}\nComment: ${comment}`);
        }}
      />

      {/* Mark Interview Modals */}
      <MarkInterviewCompleteModal
        open={openComplete}
        onOpenChange={setOpenComplete}
        onConfirm={() => alert("Marked as complete!")}
      />

      <MarkInterviewRejectedModal
        open={openReject}
        onOpenChange={setOpenReject}
        onConfirm={() => alert("Marked as rejected!")}
      />

      <MarkInterviewModal
        open={openDynamic}
        onOpenChange={setOpenDynamic}
        onConfirm={() => alert("Marked with dynamic status!")}
        status="in progress"
      />
    </div>
  );
}
