"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { EducationHistory } from "@/types/profile";
import { Plus } from "lucide-react";
import { EducationItem } from "./EducationItem";
import { AddEducationModal } from "./AddEducationModal";

export function EducationCard({ educationhistory }: { educationhistory: EducationHistory[] }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      {educationhistory.length > 0 ? (
        <div className="mt-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-row items-center">
              <p className="text-md lg:text-xl"> Education Histories</p>
            </div>
            <Button onClick={() => setOpenModal(true)} className="flex items-center gap-1">
              <Plus /> Add Education History
            </Button>
          </div>

          <div className="flex flex-col gap-4">
            {educationhistory.map((education, index) => (
              <EducationItem key={education.id} educationhistory={education} index={index} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex mt-45">
          <div className="flex flex-col items-center justify-center text-center gap-4 text-muted-foreground w-full">
            <p className="text-sm">
              You haven&apos;t added any education history yet. Start by adding your first role to
              build your profile.
            </p>
            <Button onClick={() => setOpenModal(true)} className="flex items-center gap-1">
              <Plus /> Add Education History
            </Button>
          </div>
        </div>
      )}

      <AddEducationModal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
}
