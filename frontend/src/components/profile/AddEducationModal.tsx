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
import { Button } from "@/components/ui/button";
import { AddProfileModalProps } from "@/types/profile";
import { useEducationHistoryForm } from "@/forms/profile/useEducationHistoryForm";
import { Form } from "@/components/ui/form";
import { ProfileFormField } from "./ProfileFormField";
import { Loader2, Plus } from "lucide-react";
import { useEffect } from "react";

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

export function AddEducationModal({ openModal, setOpenModal }: AddProfileModalProps) {
  const { form, onSubmit, isSuccess, error } = useEducationHistoryForm(null);

  // reset and close modal when form is success
  useEffect(() => {
    if (isSuccess) {
      form.reset();
      setOpenModal(false);
    }
  }, [isSuccess, form, setOpenModal]);

  // reset form when modal is closed
  useEffect(() => {
    if (!openModal) {
      form.reset();
    }
  }, [openModal, form]);

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Add Education history</DialogTitle>
              <DialogDescription>
                Provide details about your educational background. This information will help create
                a more complete and accurate profile.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 mt-4">
              {/* Education History Fields */}
              <ProfileFormField
                control={form.control}
                name="school"
                label="School"
                placeholder="Enter school name"
                isEditing={true}
              />
              <ProfileFormField
                control={form.control}
                name="degree"
                label="Degree"
                placeholder="Enter degree"
                isEditing={true}
              />
              <ProfileFormField
                control={form.control}
                name="course"
                label="Course"
                placeholder="Enter course"
                isEditing={true}
              />
              <div className="flex gap-3">
                <ProfileFormField
                  control={form.control}
                  name="start_year"
                  label="Start Year"
                  placeholder="Enter start year"
                  isEditing={true}
                  years={years}
                  variant="select"
                />
                <ProfileFormField
                  control={form.control}
                  name="end_year"
                  label="End Year"
                  placeholder="Enter end year"
                  isEditing={true}
                  years={years}
                  variant="select"
                />
              </div>
              {error && <div className="text-sm text-red-500">{error}</div>}
            </div>
            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Close
                </Button>
              </DialogClose>
              <Button
                disabled={form.formState.isSubmitting}
                type="submit"
                className="flex items-center gap-2"
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin w-4 h-4" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus />
                    Add
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
