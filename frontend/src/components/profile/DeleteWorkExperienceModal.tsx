"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { DeleteWorkExperienceModalProps } from "@/types/profile";
import { useProfile } from "@/hooks/useProfile";
import { Loader2, Trash2Icon } from "lucide-react";
import { useEffect } from "react";

export function DeleteWorkExperienceModal({
  openDialog,
  setOpenDialog,
  workexperience,
}: DeleteWorkExperienceModalProps) {
  const { deleteWorkExperienceMutation } = useProfile();

  useEffect(() => {
    if (deleteWorkExperienceMutation.isSuccess) setOpenDialog(false);
  }, [deleteWorkExperienceMutation, setOpenDialog]);

  return (
    <AlertDialog open={openDialog}>
      <AlertDialogContent className="w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete work experience?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. The selected work experience will be permanently removed
            from your profile.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={deleteWorkExperienceMutation.isPending}
            onClick={() => setOpenDialog(false)}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={deleteWorkExperienceMutation.isPending}
            onClick={() => deleteWorkExperienceMutation.mutateAsync(workexperience.id!)}
          >
            {deleteWorkExperienceMutation.isPending ? (
              <>
                <Loader2 className="animate-spin w-4 h-4" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2Icon />
                Delete
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
