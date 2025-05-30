"use client";
import { Application, AppStatus } from "@/types/application";
import { Card, CardContent } from "../ui/card";
import { useEffect, useState } from "react";
import { ApplicationStatusModal } from "./ApplicationStatusModal";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useApplicationStatusForm } from "@/forms/application/useApplicationStatusForm";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { InterviewScheduleModal } from "../interview/InterviewScheduleModal";

export function ActionCard({ application }: { application: Application }) {
  const [openModal, setOpenModal] = useState(false);
  const [openInterviewModal, setOpenInterviewModal] = useState(false);
  const [status, setStatus] = useState(application.status);
  const { form, onSubmit, isSuccess, isLoading, error } = useApplicationStatusForm(application);

  const handleFormSubmit = () => {
    form.handleSubmit(onSubmit)();
  };

  // reset form when there is error
  useEffect(() => {
    if (error) form.reset();
  }, [error, form]);

  //close modal and set new value when success
  useEffect(() => {
    if (isSuccess) {
      form.setValue("status", status);
      setOpenModal(false);
    }
  }, [setOpenModal, isSuccess, form, status]);

  // reset status value when modal is closed
  useEffect(() => {
    if (!openModal && !openInterviewModal) {
      setStatus(application.status);
      form.setValue("status", application.status);
    }
  }, [openModal, openInterviewModal, application.status, form]);

  return (
    <>
      <Card>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Action</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(value) => {
                          field.onChange(value);
                          setStatus(value as AppStatus);
                          if (value === "interview") {
                            setOpenInterviewModal(true);
                          } else {
                            setOpenModal(true);
                          }
                        }}
                      >
                        <SelectTrigger className="mt-2 w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="received">Received</SelectItem>
                          <SelectItem value="reviewed">Reviewed</SelectItem>
                          <SelectItem value="interview">Interview</SelectItem>
                          <SelectItem value="offer">Offer</SelectItem>
                          <SelectItem value="hired">Hired</SelectItem>
                          <SelectItem value="rejected"><span className="text-red-500 font-medium">Reject</span></SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {error && <div className="text-sm text-red-500">{error}</div>}
            </form>
          </Form>
        </CardContent>
      </Card>
      {status && (
        <>
          <ApplicationStatusModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            status={status as AppStatus}
            onConfirm={handleFormSubmit}
            isLoading={isLoading}
          />
          <InterviewScheduleModal
            application={application}
            openModal={openInterviewModal}
            setOpenModal={setOpenInterviewModal}
            interview={null}
          />
        </>
      )}
    </>
  );
}
