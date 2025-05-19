"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { ApplyJobModalProps } from "@/types/job";
import { Button } from "@/components/ui/button";
import { useApplyJobForm } from "@/forms/application/useApplyJobForm";
import { Form } from "@/components/ui/form";
import { ProfileFormField } from "../profile/ProfileFormField";
import { ApplicationDocumentForm } from "./ApplicationDocumentForm";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

export function ApplyJobModal({
  jobposting,
  documents,
  openModal,
  setOpenModal,
}: ApplyJobModalProps) {
  const resume = (documents || []).find((doc: { type: string }) => doc.type === "resume") || null;
  const coverletter =
    (documents || []).find((doc: { type: string }) => doc.type === "coverletter") || null;

  const applyJobData = {
    id: jobposting.id,
    resume,
    coverletter,
  };
  const { form, onSubmit, error } = useApplyJobForm(applyJobData);

  // reset form when modal is closed
  useEffect(() => {
    if (!openModal) {
      form.reset();
    }
  }, [openModal, form]);

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Apply Job</DialogTitle>
          <DialogDescription>
            Submit your application for the <strong>{jobposting.title}</strong>. Make sure your
            profile and information are complete.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4 mt-4">
              <ProfileFormField
                control={form.control}
                name="expected_salary"
                label="Expected Salary"
                placeholder="Enter Expected Salary"
                isEditing={true}
              />
              <ApplicationDocumentForm form={form} name="resume" label="Resume" />
              <ApplicationDocumentForm form={form} name="coverletter" label="Cover Letter" />
            </div>

            {error && <div className="text-sm text-red-500">{error}</div>}
            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Close
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="flex items-center gap-2"
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin w-4 h-4" />
                    Applying...
                  </>
                ) : (
                  <>Apply</>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
