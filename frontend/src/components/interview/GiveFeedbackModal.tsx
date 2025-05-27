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
import { Button } from "../ui/button";
import { GiveFeedbackModalProps } from "@/types/interview";
import { Loader2, Star } from "lucide-react";
import { useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFeedbackForm } from "@/forms/interview/useFeedbackForm";
import { CustomFormInput } from "../form/CustomFormInput";

export function GiveFeedbackModal({
  openModal,
  setOpenModal,
  interview,
  feedback,
}: GiveFeedbackModalProps) {
  const { form, onSubmit, isSuccess, error } = useFeedbackForm({
    id: interview.id,
    feedback: feedback,
  });

  // reset and close modal when form is success
  useEffect(() => {
    if (isSuccess) {
      form.reset();
      setOpenModal(false);
    }
  }, [isSuccess, form, setOpenModal]);

  const isEditing = Boolean(feedback);

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>
                {isEditing ? "Edit Interview Feedback" : "Submit Interview Feedback"}
              </DialogTitle>
              <DialogDescription>
                {isEditing
                  ? "Update your rating and comments about the candidate’s interview."
                  : "Share your rating and comments about the candidate’s interview."}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4 space-y-4">
              <div>
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem className="w-full flex-1">
                      <FormLabel className="text-[rgba(0,0,0,0.7)] text-xs ms-1">Rating</FormLabel>
                      <FormControl>
                        <div className="flex gap-1 mt-1">
                          {Array.from({ length: 5 }).map((_, i) => {
                            const index = i + 1;
                            return (
                              <Star
                                key={i}
                                size={20}
                                className={`cursor-pointer transition-colors ${
                                  index <= field.value
                                    ? "text-yellow-500 fill-yellow-500"
                                    : "text-gray-300"
                                }`}
                                onClick={() => field.onChange(index)}
                              />
                            );
                          })}
                        </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <CustomFormInput
                  control={form.control}
                  name="comment"
                  label="Comment"
                  variant="textarea"
                  placeholder="Enter Interview Feedback"
                  isEditing={true}
                />
              </div>
            </div>

            {error && <div className="text-sm text-red-500">{error}</div>}
            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button disabled={form.formState.isSubmitting} type="button" variant="outline">
                  Cancel
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
                  "Update Feedback"
                ) : (
                  "Submit Feedback"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
