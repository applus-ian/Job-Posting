"use client";
import { useEducationHistoryForm } from "@/forms/profile/useEducationHistoryForm";
import { EducationHistory } from "@/types/profile";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, GraduationCap, Loader2, MoreVertical } from "lucide-react";
import { CustomFormInput } from "../form/CustomFormInput";
import { Form } from "@/components/ui/form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DeleteEducationModal } from "./DeleteEducationModal";

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

export function EducationItem({
  educationhistory,
  index,
}: {
  educationhistory: EducationHistory;
  index: number;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const { form, onSubmit, isSuccess, error } = useEducationHistoryForm(educationhistory);

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
            <GraduationCap />
            <CardTitle className="text-lg">Education #{index + 1}</CardTitle>
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
                {/* Educ Info Fields */}
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <CustomFormInput
                      control={form.control}
                      name="school"
                      label="School"
                      placeholder="Enter school name"
                      isEditing={isEditing}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <CustomFormInput
                      control={form.control}
                      name="degree"
                      label="Degree"
                      placeholder="Enter degree"
                      isEditing={isEditing}
                    />
                  </div>
                  <div>
                    <CustomFormInput
                      control={form.control}
                      name="course"
                      label="Course"
                      placeholder="Enter course"
                      isEditing={isEditing}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  <div>
                    <CustomFormInput
                      control={form.control}
                      name="start_year"
                      label="Start Year"
                      placeholder="Enter start year"
                      isEditing={isEditing}
                      years={years}
                    />
                  </div>
                  <div>
                    <CustomFormInput
                      control={form.control}
                      name="end_year"
                      label="End Year"
                      placeholder="Enter end year"
                      isEditing={isEditing}
                      years={years}
                    />
                  </div>
                </div>
                {error && <div className="text-sm text-red-500">{error}</div>}
                <div className="mt-4 flex justify-end gap-2">
                  {isEditing && (
                    <div className="flex gap-3">
                      <Button
                        variant={"outline"}
                        size={"sm"}
                        onClick={() => {
                          setIsEditing(false);
                          form.reset();
                        }}
                      >
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

      <DeleteEducationModal
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        educationhistory={educationhistory}
      />
    </>
  );
}
