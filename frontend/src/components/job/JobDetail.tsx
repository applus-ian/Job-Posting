"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UsersRound, UserPlus2 } from "lucide-react";
import { Bookmark } from "lucide-react";
import CustomBadge from "../badges/CustomBadge";
import { JobPosting } from "@/types/job";
import { DescriptionRenderer } from "./DescriptionRenderer";
import { useState } from "react";
import { ApplyJobModal } from "./ApplyJobModal";

export default function JobDetail({ jobposting }: { jobposting: JobPosting }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Card className="h-full">
        <CardHeader className="pb-1">
          <div className="flex flex-row items-start w-full gap-8">
            <div className="w-[80%]">
              <CardTitle className="text-lg">{jobposting.title}</CardTitle>
            </div>
            <div className="w-auto flex flex-row gap-1">
              <Bookmark className="w-8 h-8 text-primary mt-1" strokeWidth={1} />
              <Button className="md:w-auto" onClick={() => setOpenModal(true)}>
                Apply <span className="hidden sm:flex">Now</span>
              </Button>
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <CustomBadge label={jobposting.work_setup} status="tag" />
            <CustomBadge label={jobposting.employment_type} status="tag" />
          </div>
          <div className="flex flex-wrap gap-4 mt-1 text-xs text-gray-500">
            <div className="flex items-center">
              <UsersRound className="h-4 w-4 mr-2" />
              <span>
                10 Applications
                {/* {jobposting.applicants} {jobposting.applicants === 1 ? "Application" : "Applications"} */}
              </span>
            </div>
            <div className="flex items-center">
              <UserPlus2 className="h-4 w-4 mr-2" />
              <span>
                {jobposting.vacancies} {jobposting.vacancies === 1 ? "Vacant" : "Vacants"}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <DescriptionRenderer description={jobposting.description} />
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-2">Tags</h3>
            {jobposting.tags && jobposting.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {jobposting.tags.map((jobtag, index) => (
                  <CustomBadge key={index} label={jobtag.tag} status="tag" />
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <ApplyJobModal jobposting={jobposting} openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
}
