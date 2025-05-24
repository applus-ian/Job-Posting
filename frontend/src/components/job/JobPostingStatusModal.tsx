"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { JobDetailModalProps } from "@/types/job";
import { useJobPosting } from "@/hooks/useJobPosting";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { Button } from "../ui/button";

export function JobPostingStatusModal({
  jobposting,
  openModal,
  setOpenModal,
  status,
}: JobDetailModalProps) {
  const { updateJobPostingStatusMutation } = useJobPosting();
  const handleConfirm = () => {
    if (jobposting?.id && status) {
      updateJobPostingStatusMutation.mutate({ id: jobposting.id, status });
    }
  };

  const statusMessages = {
    open: "Publish job posting?",
    draft: "Set job posting as draft?",
    closed: "Close job posting?",
  };
  const actionLabels = {
    open: "Publish",
    draft: "Set as Draft",
    closed: "Close",
  };
  const confirmationDetails = {
    open: `Once published, "${jobposting?.title}" will be visible to all candidates.`,
    draft: `"${jobposting?.title}" will be saved as a draft and not visible publicly.`,
    closed: `"${jobposting?.title}" will be closed and no longer accepting applications.`,
  };

  //close modal when success
  useEffect(() => {
    if (updateJobPostingStatusMutation.isSuccess) {
      setOpenModal(false);
    }
  }, [setOpenModal, updateJobPostingStatusMutation.isSuccess]);

  return (
    <AlertDialog open={openModal} onOpenChange={setOpenModal}>
      <AlertDialogContent className="w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle>{status && statusMessages[status]}</AlertDialogTitle>
          <AlertDialogDescription>{status && confirmationDetails[status]}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={updateJobPostingStatusMutation.isPending}>
            Cancel
          </AlertDialogCancel>
          <Button onClick={handleConfirm} disabled={updateJobPostingStatusMutation.isPending}>
            {updateJobPostingStatusMutation.isPending ? (
              <span className="flex items-center gap-1">
                <Loader2 size={20} className="animate-spin" />
                Loading...
              </span>
            ) : (
              <span>{status && actionLabels[status]}</span>
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
