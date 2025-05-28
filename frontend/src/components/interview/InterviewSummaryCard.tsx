"use client";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import CustomBadge from "../badges/CustomBadge";
import { Interview } from "@/types/interview";
import { capitalizeText } from "@/utils/capitalizeText";
import { formatDateOnly, formatTimeOnly } from "@/utils/dateFormatter";
import { InterviewScheduleModal } from "./InterviewScheduleModal";
import { Application } from "@/types/application";
import { useState } from "react";
import { Edit } from "lucide-react";
import { Button } from "../ui/button";

export function InterviewSummaryCard({
  application,
  interview,
}: {
  application: Application;
  interview: Interview;
}) {
  const [openInterviewModal, setOpenInterviewModal] = useState(false);
  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Interview Summary</CardTitle>
            <Button variant={"ghost"} onClick={() => setOpenInterviewModal(true)}>
              <Edit className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col w-full">
              <p className="text-sm text-gray-500">Interview Status</p>
              <CustomBadge label={capitalizeText(interview.status)} status={interview.status} />
            </div>
            <div className="flex flex-col w-full">
              <p className="text-sm text-gray-500">Date and Time</p>
              <p className="text-xs font-medium truncate w-full">
                {formatDateOnly(interview.schedule_date)} -{" "}
                {formatTimeOnly(interview.schedule_time)}
              </p>
            </div>
            <div className="flex flex-col w-full">
              <p className="text-sm text-gray-500">Interview Type</p>
              <p className="text-xs font-medium truncate w-full">
                {interview.mode === "in_person" ? "In Person" : "Virtual"}
              </p>
            </div>
            {interview.mode === "virtual" ? (
              <div className="flex flex-col w-full">
                <p className="text-sm text-gray-500">Meeting Link</p>
                <a
                  href={interview.meeting_link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary font-medium truncate w-full"
                >
                  {interview.meeting_link || "No meeting link provided"}
                </a>
              </div>
            ) : (
              <div className="flex flex-col w-full">
                <p className="text-sm text-gray-500">Location</p>
                <p className="text-xs font-medium truncate w-full">
                  {interview.location || "No location provided"}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <InterviewScheduleModal
        application={application}
        openModal={openInterviewModal}
        setOpenModal={setOpenInterviewModal}
        interview={interview}
      />
    </>
  );
}
