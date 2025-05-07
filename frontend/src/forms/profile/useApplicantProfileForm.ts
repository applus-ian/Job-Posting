"use client";
import { useProfile } from "@/hooks/useProfile";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ApplicantProfile, ApplicantProfileFields } from "@/types/profile";
import { ApplicantProfileSchema } from "@/schemas/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorResponse } from "@/types/error-response";
import { useSession } from "next-auth/react";

export function useApplicantProfileForm(applicant: ApplicantProfile) {
  const { data: session } = useSession();
  const { applicantProfileMutation } = useProfile();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ApplicantProfileFields>({
    resolver: zodResolver(ApplicantProfileSchema),
    defaultValues: {
      email: session?.user.email,
      professional_title: applicant?.professional_title || "",
      biography: applicant?.biography || "",
      first_name: applicant.first_name,
      middle_name: applicant?.middle_name || "",
      last_name: applicant.last_name,
      suffix: applicant?.suffix || "",
      sex: applicant?.sex || "",
      date_of_birth: applicant?.date_of_birth || "",
      nationality: applicant?.nationality || "",
      phone_number: applicant?.phone_number || "",
    },
  });

  const onSubmit: SubmitHandler<ApplicantProfileFields> = async (data) => {
    try {
      await applicantProfileMutation.mutateAsync(data);
      setError(null);
    } catch (error) {
      const errorMsg = (error as ErrorResponse)?.response?.data?.message;
      if (errorMsg) {
        console.log(errorMsg);
        setError(errorMsg);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return { form, onSubmit, error };
}
