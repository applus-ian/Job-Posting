"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AddLanguageModalProps } from "@/types/profile";
import { useLanguageForm } from "@/forms/profile/useLanguageForm";
import { Form } from "@/components/ui/form";
import { CustomFormInput } from "../form/CustomFormInput";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

export function AddLanguageModal({ openModal, setOpenModal }: AddLanguageModalProps) {
  const { form, onSubmit, isSuccess, error } = useLanguageForm(null);

  // Close modal on successful submit
  useEffect(() => {
    if (isSuccess) {
      form.reset();
      setOpenModal(false);
    }
  }, [isSuccess, form, setOpenModal]);

  // Reset form when modal is closed
  useEffect(() => {
    if (!openModal) {
      form.reset();
    }
  }, [openModal, form]);

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Language</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <CustomFormInput
              control={form.control}
              name="language"
              label="Language"
              placeholder="Enter Language"
              isEditing={true}
            />
            <CustomFormInput
              control={form.control}
              name="proficiency_level"
              label="Proficiency Level"
              placeholder="Select level"
              isEditing={true}
              variant="select"
              options={[
                { value: "beginner", label: "Beginner" },
                { value: "intermediate", label: "Intermediate" },
                { value: "advanced", label: "Advanced" },
                { value: "fluent", label: "Fluent" },
                { value: "native", label: "Native" },
              ]}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}

            <DialogFooter className="mt-4">
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="flex items-center gap-2"
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>Save Language</>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
