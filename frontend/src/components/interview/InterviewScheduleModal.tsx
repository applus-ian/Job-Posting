import { useEffect, useState } from "react";
import { InterviewScheduleModalProps } from "@/types/interview";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useInterviewForm } from "@/forms/interview/useInterviewForm";
import { CustomFormInput } from "../form/CustomFormInput";
import { Loader2 } from "lucide-react";

export function InterviewScheduleModal({
  openModal,
  setOpenModal,
  application,
  interview,
}: InterviewScheduleModalProps) {
  const [interviewMode, setInterviewMode] = useState<"in_person" | "virtual">(
    interview?.mode ?? "in_person"
  );
  const { form, onSubmit, isSuccess, error } = useInterviewForm({
    id: application.id!,
    interview: interview,
  });

  // reset and close modal when form is success
  useEffect(() => {
    if (isSuccess) {
      form.reset();
      setOpenModal(false);
    }
  }, [isSuccess, form, setOpenModal]);

  const isEditing = Boolean(interview);

  return (
    <Dialog
      open={openModal}
      onOpenChange={(open) => {
        setOpenModal(open);
        if (!open) {
          form.reset();
          setInterviewMode(interview?.mode ?? "in_person");
        }
      }}
    >
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>
                {isEditing ? "Edit Interview Schedule" : "Schedule Interview"}
              </DialogTitle>
              <DialogDescription>
                {isEditing
                  ? "Update the date, time, and details of the interview."
                  : "Choose a date and time for the interview with the applicant."}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 mt-3">
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <CustomFormInput
                  control={form.control}
                  name="schedule_date"
                  label="Date"
                  type="date"
                  isEditing={true}
                />
                <CustomFormInput
                  control={form.control}
                  name="schedule_time"
                  label="Time"
                  type="time"
                  isEditing={true}
                />
              </div>
              <FormField
                control={form.control}
                name="mode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mode</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(value) => {
                          field.onChange(value);
                          setInterviewMode(value as "in_person" | "virtual");
                          if (value === "in_person") {
                            form.setValue("platform", "");
                            form.setValue("meeting_link", "");
                          } else if (value === "virtual") {
                            form.setValue("location", "");
                          }
                        }}
                      >
                        <SelectTrigger className="mt-2 w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="in_person">In Person</SelectItem>
                          <SelectItem value="virtual">Virtual</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-4">
                {interviewMode === "in_person" && (
                  <div>
                    <CustomFormInput
                      control={form.control}
                      name="location"
                      label="Location"
                      placeholder="Enter Location"
                      isEditing={true}
                    />
                  </div>
                )}

                {interviewMode === "virtual" && (
                  <>
                    <div>
                      <CustomFormInput
                        control={form.control}
                        name="platform"
                        label="Platform"
                        placeholder="Enter Meeting Platform"
                        isEditing={true}
                      />
                    </div>
                    <div>
                      <CustomFormInput
                        control={form.control}
                        name="meeting_link"
                        label="Meeting Link"
                        placeholder="Enter Meeting Link"
                        isEditing={true}
                      />
                    </div>
                  </>
                )}
              </div>

              <CustomFormInput
                control={form.control}
                name="status"
                label="Status"
                placeholder="Select Status"
                isEditing={isEditing}
                variant="select"
                options={[
                  { value: "upcoming", label: "Upcoming" },
                  { value: "completed", label: "Completed" },
                  { value: "rescheduled", label: "Rescheduled" },
                  { value: "no-show", label: "No-show" },
                  { value: "cancelled", label: "Cancelled" },
                ]}
              />
              {error && <div className="text-sm text-red-500">{error}</div>}
            </div>

            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button
                  disabled={form.formState.isSubmitting}
                  onClick={() => setOpenModal(false)}
                  type="button"
                  variant="outline"
                >
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
                    Loading...
                  </>
                ) : isEditing ? (
                  "Update Interview"
                ) : (
                  "Schedule Interview"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
