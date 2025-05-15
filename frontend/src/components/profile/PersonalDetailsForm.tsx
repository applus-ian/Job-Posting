"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Upload, Save, Loader2 } from "lucide-react"; 
import Image from "next/image";
import { ApplicantProfile } from "@/types/profile";
import { useSession } from "next-auth/react";
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

export function PersonalDetailsForm({ applicant }: { applicant: ApplicantProfile }){
  const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);
  const { form, onSubmit, error } = useApplicantProfileForm(applicant);
  const isSubmitSuccessful = form.formState.isSubmitSuccessful;
  const { data: session } = useSession();

  useEffect(() => {
    if (isSubmitSuccessful) {
      setIsEditingPersonalInfo(false); // Exit editing for personal info

    }
  }, [isSubmitSuccessful]);

  // Submit function for Personal Info section
  const handlePersonalInfoSubmit = () => {
    form.handleSubmit(onSubmit)();  // This triggers the form submission for Personal Info
    setIsEditingPersonalInfo(false); // Close editing mode after submission
  };

  return(
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 border-b pb-8 mb-6">
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center sm:flex-row gap-6 pb-6 border-b">
          <div className="relative group">
            <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden border-4 border-background shadow-md">
              <Image
                fill
                src="https://github.com/shadcn.png"
                alt="Profile"
                className="object-cover rounded-full"
              />
            </div>
            {isEditingPersonalInfo && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white rounded-full p-2 cursor-pointer">
                  <Edit className="h-5 w-5 text-gray-700" />
                </div>
              </div>
            )}
          </div>
          <div className="space-y-2 text-center sm:text-left">
            {!isEditingPersonalInfo && (
              <div>
                {/* Name */}
                <h3 className="text-md lg:text-xl font-semibold">{session?.user.name}</h3>
                {/* Bio */}
                <p className="text-xs lg:text-sm text-muted-foreground max-w-md">
                  Aliquam vitae turpis in diam convallis finibus in at risus. Nullam in
                  scelerisque leo, eget sollicitudin velit vestibulum.
                </p>
              </div>
            )}
            {isEditingPersonalInfo && (
              <div>
                <h3 className="text-md lg:text-xl font-semibold">Upload Profile Picture</h3>
                <p className="text-xs lg:text-sm text-muted-foreground max-w-lg">
                  Click below to upload a formal profile picture (JPEG, PNG, or JPG) to
                  update your profile.
                </p>
              </div>
            )}
            {isEditingPersonalInfo && (
              <Button type="button" variant="outline" size="sm" className="mt-2">
                <Upload className="h-4 w-4 mr-2" />
                Upload Photo
              </Button>
            )}
          </div>
        </div>

        <div className="flex w-full justify-between items-end">
          <p className="text-xs lg:text-sm">Personal Details</p>
          <Button
            type="button"
            variant={isEditingPersonalInfo ? "destructive" : "default"}
            onClick={() => {
              setIsEditingPersonalInfo(!isEditingPersonalInfo);
              form.reset();
            }}
            className="flex items-center gap-1"
          >
            {isEditingPersonalInfo ? <>Cancel</> : <>Edit</>}
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
        {/* Personal Info Submit Button */}
        {isEditingPersonalInfo && (
          <div className="flex justify-end mt-4">
            <Button
              disabled={form.formState.isSubmitSuccessful}
              type="button"
              className="flex items-center gap-2"
              onClick={handlePersonalInfoSubmit}
            >
              {form.formState.isSubmitSuccessful ? (
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