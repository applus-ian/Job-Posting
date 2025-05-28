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
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { Button } from "../ui/button";
import { SavedApplicantMultipleConfirmModalProps } from "@/types/savedapplicant";
import { useSavedApplicant } from "@/hooks/useSavedApplicant";

export function SavedApplicantMultipleConfirmModal({
  ids,
  openModal,
  setOpenModal,
}: SavedApplicantMultipleConfirmModalProps) {
  const { unsaveApplicantMultipleMutation } = useSavedApplicant();

  const handleConfirm = async () => {
    await unsaveApplicantMultipleMutation.mutateAsync(ids);
  };

  //close modal when success
  useEffect(() => {
    if (unsaveApplicantMultipleMutation.isSuccess) {
      setOpenModal(false);
    }
  }, [setOpenModal, unsaveApplicantMultipleMutation.isSuccess]);

  return (
    <AlertDialog open={openModal} onOpenChange={setOpenModal}>
      <AlertDialogContent className="w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Remove applicants from shortlist?</AlertDialogTitle>
          <AlertDialogDescription>
            These applicants will be removed from your shortlist. They will no longer be marked as
            shortlisted for this job.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={unsaveApplicantMultipleMutation.isPending}>
            Cancel
          </AlertDialogCancel>
          <Button onClick={handleConfirm} disabled={unsaveApplicantMultipleMutation.isPending}>
            {unsaveApplicantMultipleMutation.isPending ? (
              <span className="flex items-center gap-1">
                <Loader2 size={20} className="animate-spin" />
                Loading...
              </span>
            ) : (
              <span>Remove</span>
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
