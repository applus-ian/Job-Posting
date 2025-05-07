"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { WorkExperience } from "@/types/profile";
import { AddWorkExperienceModal } from "./AddWorkExperienceModal";
import { Plus } from "lucide-react";
import { WorkExperienceItem } from "./WorkExperienceItem";

export function WorkExperienceCard({ workexperience }: { workexperience: WorkExperience[] }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      {workexperience.length > 0 ? (
        <div className="mt-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-row items-center">
              <p className="text-md lg:text-xl">Work Experiences</p>
            </div>
            <Button onClick={() => setOpenModal(true)} className="flex items-center gap-1">
              <Plus /> Add Work Experience
            </Button>
          </div>

          <div className="flex flex-col gap-4">
            {workexperience.map((workexp, index) => (
              <WorkExperienceItem key={workexp.id} workexperience={workexp} index={index} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex mt-45">
          <div className="flex flex-col items-center justify-center text-center gap-4 text-muted-foreground w-full">
            <p className="text-sm">
              You haven&apos;t added any work experience yet. Start by adding your first role to
              build your profile.
            </p>
            <Button onClick={() => setOpenModal(true)} className="flex items-center gap-1">
              <Plus /> Add Work Experience
            </Button>
          </div>
        </div>
      )}

      <AddWorkExperienceModal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
}
