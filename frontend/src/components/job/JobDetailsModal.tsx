import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { JobDetailModalProps } from "@/types/job";
import { Button } from "@/components/ui/button";
import CustomBadge from "../badges/CustomBadge";
import { DescriptionRenderer } from "./DescriptionRenderer";
import { UsersRound, UserPlus2 } from "lucide-react";

export function JobDetailModal({ jobposting, openModal, setOpenModal }: JobDetailModalProps) {
  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent className="max-w-2xl w-full max-h-[98vh] flex flex-col">
        <DialogHeader className="flex-none">
          <DialogTitle>{jobposting.title}</DialogTitle>
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
        </DialogHeader>
        <div className="flex-grow overflow-y-auto space-y-6 px-1 mt-4">
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
        </div>

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
