"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { EditIcon, Save, Loader2, X } from "lucide-react";
import { ApplicantProfile } from "@/types/profile";
import { useApplicantProfileForm } from "@/forms/profile/useApplicantProfileForm";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ProfileFormField } from "./ProfileFormField";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function PersonalDetailsForm({ applicant }: { applicant: ApplicantProfile }) {
  const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);
  const { form, onSubmit, error } = useApplicantProfileForm(applicant);
  const isSubmitSuccessful = form.formState.isSubmitSuccessful;

  useEffect(() => {
    if (isSubmitSuccessful) {
      setIsEditingPersonalInfo(false);
    }
  }, [isSubmitSuccessful]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 my-4">
        <div className="flex w-full justify-between items-center">
          <p className="text-xs lg:text-sm">Personal Details</p>
          <Button
            type="button"
            variant={"outline"}
            onClick={() => {
              setIsEditingPersonalInfo(!isEditingPersonalInfo);
              form.reset();
            }}
            className="flex items-center gap-1"
          >
            {isEditingPersonalInfo ? <X /> : <EditIcon />}
          </Button>
        </div>
        {/* Personal Info Fields */}
        <div>
          <ProfileFormField
            control={form.control}
            name="professional_title"
            label="Title"
            placeholder="Enter your professional title"
            isEditing={isEditingPersonalInfo}
          />
        </div>
        {isEditingPersonalInfo && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-4">
            <div className="lg:col-span-3">
              <ProfileFormField
                control={form.control}
                name="first_name"
                label="First Name"
                placeholder="Enter your first name"
                isEditing={isEditingPersonalInfo}
              />
            </div>
            <div className="lg:col-span-3">
              <ProfileFormField
                control={form.control}
                name="last_name"
                label="Last Name"
                placeholder="Enter your last name"
                isEditing={isEditingPersonalInfo}
              />
            </div>
            <div>
              <ProfileFormField
                control={form.control}
                name="middle_name"
                label="MI"
                placeholder="Enter your middle name"
                isEditing={isEditingPersonalInfo}
              />
            </div>
            <div>
              <ProfileFormField
                control={form.control}
                name="suffix"
                label="Suffix"
                placeholder="e.g. Jr., Sr., III"
                isEditing={isEditingPersonalInfo}
              />
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <ProfileFormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Enter your email"
              isEditing={isEditingPersonalInfo}
            />
          </div>
          <div>
            <ProfileFormField
              control={form.control}
              name="phone_number"
              label="Phone Number"
              placeholder="Enter your phone number"
              isEditing={isEditingPersonalInfo}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div>
            <ProfileFormField
              control={form.control}
              name="date_of_birth"
              label="Date of Birth"
              placeholder="Enter your date of birth"
              isEditing={isEditingPersonalInfo}
              type="date"
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="sex"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[rgba(0,0,0,0.7)] text-xs ms-1">Sex</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!isEditingPersonalInfo}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a Sex" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <ProfileFormField
              control={form.control}
              name="nationality"
              label="Nationality"
              placeholder="Enter your nationality"
              isEditing={isEditingPersonalInfo}
            />
          </div>
        </div>
        <div>
          {isEditingPersonalInfo && (
            <ProfileFormField
              control={form.control}
              name="biography"
              label="Biography"
              placeholder="Enter your bio"
              variant="textarea"
              isEditing={isEditingPersonalInfo}
            />
          )}
        </div>

        {error && <div className="text-sm text-red-500">{error}</div>}
        {/* Personal Info Submit Button */}
        {isEditingPersonalInfo && (
          <div className="flex justify-end mt-4">
            <Button
              disabled={form.formState.isSubmitting}
              type="submit"
              className="flex items-center gap-2"
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="animate-spin w-4 h-4" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Personal Info
                </>
              )}
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}
