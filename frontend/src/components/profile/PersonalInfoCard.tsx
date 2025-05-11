"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Save, Loader2 } from "lucide-react";
import { Separator } from "../ui/separator";
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
import { PersonalInfoHeader } from "./PersonalInfoHeader";

export function PersonalInfoCard({ applicant }: { applicant: ApplicantProfile }) {
  const [isEditing, setIsEditing] = useState(false);
  const { form, onSubmit, error } = useApplicantProfileForm(applicant);
  const isSubmitSuccessful = form.formState.isSubmitSuccessful;

  useEffect(() => {
    if (isSubmitSuccessful) setIsEditing(false);
  }, [isSubmitSuccessful]);

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <p className="text-md md:text-xl">Personal Information</p>
        <Button
          variant={isEditing ? "destructive" : "default"}
          onClick={() => {
            setIsEditing(!isEditing);
            form.reset();
          }}
          className="flex items-center gap-1"
        >
          {isEditing ? <>Cancel</> : <>Edit</>}
        </Button>
      </div>
      <div className="w-full mt-4">
        <Card>
          <CardContent>
            <PersonalInfoHeader />
            <Separator />
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
                <p className="text-xs lg:text-sm">Personal Details</p>
                {/* Personal Info Fields */}
                <div>
                  <ProfileFormField
                    control={form.control}
                    name="professional_title"
                    label="Title"
                    placeholder="Enter your professional title"
                    isEditing={isEditing}
                  />
                </div>
                {isEditing && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-4">
                    <div className="lg:col-span-3">
                      <ProfileFormField
                        control={form.control}
                        name="first_name"
                        label="First Name"
                        placeholder="Enter your first name"
                        isEditing={isEditing}
                      />
                    </div>
                    <div className="lg:col-span-3">
                      <ProfileFormField
                        control={form.control}
                        name="last_name"
                        label="Last Name"
                        placeholder="Enter your last name"
                        isEditing={isEditing}
                      />
                    </div>
                    <div>
                      <ProfileFormField
                        control={form.control}
                        name="middle_name"
                        label="MI"
                        placeholder="Enter your middle name"
                        isEditing={isEditing}
                      />
                    </div>
                    <div>
                      <ProfileFormField
                        control={form.control}
                        name="suffix"
                        label="Suffix"
                        placeholder="e.g. Jr., Sr., III"
                        isEditing={isEditing}
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
                      isEditing={isEditing}
                    />
                  </div>
                  <div>
                    <ProfileFormField
                      control={form.control}
                      name="phone_number"
                      label="Phone Number"
                      placeholder="Enter your phone number"
                      isEditing={isEditing}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <ProfileFormField
                      control={form.control}
                      name="date_of_birth"
                      label="Date of Birth"
                      placeholder="Enter your date of birth"
                      isEditing={isEditing}
                      type="date"
                    />
                  </div>
                  <div>
                    <ProfileFormField
                      control={form.control}
                      name="nationality"
                      label="Nationality"
                      placeholder="Enter your nationality"
                      isEditing={isEditing}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="w-full">
                    <FormField
                      control={form.control}
                      name="sex"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[rgba(0,0,0,0.7)] text-xs ms-1">Sex</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            disabled={!isEditing}
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
                </div>

                <Separator />

                <p className="text-xs lg:text-sm">Address</p>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="" className="text-[rgba(0,0,0,0.7)] text-xs ms-1">
                      Country:{" "}
                    </label>
                    <Input
                      disabled={!isEditing}
                      placeholder="Philippines"
                      type="text"
                      className="text-xs lg:text-sm"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="" className="text-[rgba(0,0,0,0.7)] text-xs ms-1">
                      Street:{" "}
                    </label>
                    <Input
                      disabled={!isEditing}
                      placeholder="Camagung, Lahug"
                      type="text"
                      className="text-xs lg:text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="" className="text-[rgba(0,0,0,0.7)] text-xs ms-1">
                      ZIP Code:{" "}
                    </label>
                    <Input
                      disabled={!isEditing}
                      placeholder="6000"
                      type="number"
                      className="text-xs lg:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="" className="text-[rgba(0,0,0,0.7)] text-xs ms-1">
                      City:{" "}
                    </label>
                    <Input
                      disabled={!isEditing}
                      placeholder="Cebu City"
                      type="text"
                      className="text-xs lg:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="" className="text-[rgba(0,0,0,0.7)] text-xs ms-1">
                      Province/State:{" "}
                    </label>
                    <Input
                      disabled={!isEditing}
                      placeholder="Cebu"
                      type="text"
                      className="text-xs lg:text-sm"
                    />
                  </div>
                </div>

                {error && <div className="text-sm text-red-500">{error}</div>}
                {form.formState.errors.root && (
                  <div className="text-red-500 text-sm font-medium">
                    {form.formState.errors.root.message}
                  </div>
                )}

                {isEditing && (
                  <div className="flex justify-end">
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
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
