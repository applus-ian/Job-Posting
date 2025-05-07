"use client";
import { useWorkExperienceForm } from "@/forms/profile/useWorkExperienceForm";
import { WorkExperience } from "@/types/profile";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Loader2, MoreVertical, Edit } from "lucide-react";
import { ProfileFormField } from "./ProfileFormField";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteWorkExperienceModal } from "./DeleteWorkExperienceModal";

export function WorkExperienceItem({
  workexperience,
  index,
}: {
  workexperience: WorkExperience;
  index: number;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const { form, onSubmit, isSuccess, error } = useWorkExperienceForm(workexperience);

  // reset and set editing "false" when form is success
  useEffect(() => {
    if (isSuccess) {
      form.reset();
      setIsEditing(false);
    }
  }, [isSuccess, form, setIsEditing]);

  return (
    <>
      <Card className="border shadow-sm">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase />
            <CardTitle className="text-sm lg:text-lg">Work Experience #{index + 1}</CardTitle>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <MoreVertical className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? <>Cancel Edit</> : <>Edit</>}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpenDialog(true)}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <ProfileFormField
                    control={form.control}
                    name="company"
                    label="Company Name"
                    placeholder="Enter company name"
                    isEditing={isEditing}
                  />
                  <ProfileFormField
                    control={form.control}
                    name="professional_title"
                    label="Role"
                    placeholder="Enter your role or professional title"
                    isEditing={isEditing}
                  />
                </div>

                <ProfileFormField
                  control={form.control}
                  name="description"
                  label="Description"
                  placeholder="Enter description"
                  variant="textarea"
                  isEditing={isEditing}
                />

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  <ProfileFormField
                    control={form.control}
                    name="start_date"
                    label="Start Date"
                    type="date"
                    isEditing={isEditing}
                  />
                  <ProfileFormField
                    control={form.control}
                    name="end_date"
                    label="End Date"
                    type="date"
                    isEditing={isEditing}
                  />
                </div>

                {error && <div className="text-sm text-red-500">{error}</div>}
                <div className="mt-4 flex justify-end gap-2">
                  {isEditing && (
                    <div className="flex gap-3">
                      <Button variant={"outline"} size={"sm"} onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                      <Button
                        disabled={form.formState.isSubmitting}
                        type="submit"
                        className="flex items-center gap-2"
                        size={"sm"}
                      >
                        {form.formState.isSubmitting ? (
                          <>
                            <Loader2 className="animate-spin w-4 h-4" />
                            Updating...
                          </>
                        ) : (
                          <>
                            <Edit />
                            Update
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <DeleteWorkExperienceModal
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        workexperience={workexperience}
      />
    </>
  );
}
