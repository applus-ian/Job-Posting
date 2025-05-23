"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AddEmergencyProfileModalProps } from "@/types/profile";
import { useEmergencyContactForm } from "@/forms/profile/useEmergencyContactForm";
import { Form } from "@/components/ui/form";
import { CustomFormInput } from "../form/CustomFormInput";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

export function AddEmergencyContactModal({
  openModal,
  setOpenModal,
}: AddEmergencyProfileModalProps) {
  const { form, onSubmit, isSuccess, error } = useEmergencyContactForm(null);

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
          <DialogTitle>Add Emergency Contact</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <CustomFormInput
              control={form.control}
              name="full_name"
              label="Name"
              placeholder="Enter Full Name"
              isEditing={true}
            />
            <CustomFormInput
              control={form.control}
              name="phone_number"
              label="Phone Number"
              placeholder="Enter Phone Number"
              isEditing={true}
            />
            <CustomFormInput
              control={form.control}
              name="relationship"
              label="Relationship"
              placeholder="Enter Relationship"
              isEditing={true}
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
                  <>Save Contact</>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
