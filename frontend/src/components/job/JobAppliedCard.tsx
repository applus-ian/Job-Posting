"use client";
import { JobPosting } from "@/types/job";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { UserSquare2, FileClock, CircleGauge, Wallet, Laptop2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { JobDetailsModal } from "./JobDetailsModal";

export function JobAppliedCard({ jobposting }: { jobposting: JobPosting }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Job Applied</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-6">
            <div className="flex flex-col gap-1 w-[120px]">
              <UserSquare2 size={28} className="text-primary" />
              <p className="text-xs text-gray-600">Job Title</p>
              <p className="text-xs font-medium">{jobposting.title}</p>
            </div>
            {/* Employment Type */}
            <div className="flex flex-col gap-1 w-[120px]">
              <FileClock size={28} className="text-primary" />
              <p className="text-xs text-gray-600">Employment Type</p>
              <p className="text-xs font-medium">{jobposting.employment_type}</p>
            </div>

            {/* Employment Level */}
            <div className="flex flex-col gap-1 w-[120px]">
              <CircleGauge size={28} className="text-primary" />
              <p className="text-xs text-gray-600">Employment Level</p>
              <p className="text-xs font-medium">{jobposting.employment_level}</p>
            </div>

            {/* Offered Salary */}
            <div className="flex flex-col gap-1 w-[120px]">
              <Wallet size={28} className="text-primary" />
              <p className="text-xs text-gray-600">Offered Salary</p>
              <p className="text-xs font-medium">
                ₱{jobposting.salary_min} - ₱{jobposting.salary_max}
              </p>
            </div>

            {/* Work Setup */}
            <div className="flex flex-col gap-1 w-[120px]">
              <Laptop2 size={28} className="text-primary" />
              <p className="text-xs text-gray-600">Work Setup</p>
              <p className="text-xs font-medium">{jobposting.work_setup}</p>
            </div>

            {/* Location */}
            <div className="flex flex-col gap-1 w-[120px]">
              <MapPin size={28} className="text-primary" />
              <p className="text-xs text-gray-600">Location</p>
              <p className="text-xs font-medium">Makati, PH</p>
            </div>
          </div>

          <div className="flex justify-end mt-2">
            <Button variant={"link"} size={"sm"} onClick={() => setOpenModal(true)}>
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>
      <JobDetailsModal jobposting={jobposting} openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
}
