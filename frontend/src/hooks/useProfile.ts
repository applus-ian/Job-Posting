"use client";
import { useProfileApi } from "@/api/profile";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useProfile() {
  const {
    applicantProfile,
    addWorkExperience,
    updateWorkExperience,
    deleteWorkExperience,
    addEducationHistory,
    updateEducationHistory,
    deleteEducationHistory,
    uploadProfile,
    addLanguage,
    updateLanguage,
    deleteLanguage,
    addEmergencyContact,
    updateEmergencyContact,
    deleteEmergencyContact,
    addAddress,
    updateAddress,
    deleteAddress,
  } = useProfileApi();
  const { data: session, update } = useSession();
  const queryClient = useQueryClient();
  const applicantDetailsQueryKey = ["applicant", session?.user.applicant_id];

  // update applicant profile (personal information)
  const applicantProfileMutation = useMutation({
    mutationFn: applicantProfile,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: applicantDetailsQueryKey });
      const fullName =
        `${data.applicant.first_name}${data.applicant.middle_name ? ` ${data.applicant.middle_name}` : ""} ${data.applicant.last_name}`.trim();
      // update session
      update({ user: { name: fullName } });
      toast.success(data.message);
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  // add work experience
  const addWorkExperienceMutation = useMutation({
    mutationFn: addWorkExperience,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: applicantDetailsQueryKey });
      toast.success(data.message);
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  // update work experience
  const updateWorkExperienceMutation = useMutation({
    mutationFn: updateWorkExperience,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: applicantDetailsQueryKey });
      toast.success(data.message);
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  // delete work experience
  const deleteWorkExperienceMutation = useMutation({
    mutationFn: deleteWorkExperience,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: applicantDetailsQueryKey });
      toast.success(data.message);
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  // add education history
  const addEducationHistoryMutation = useMutation({
    mutationFn: addEducationHistory,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: applicantDetailsQueryKey });
      toast.success(data.message);
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  // update education history
  const updateEducationHistoryMutation = useMutation({
    mutationFn: updateEducationHistory,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: applicantDetailsQueryKey });
      toast.success(data.message);
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  // delete education history
  const deleteEducationHistoryMutation = useMutation({
    mutationFn: deleteEducationHistory,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: applicantDetailsQueryKey });
      toast.success(data.message);
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  // update applicant profile
  const uploadProfileMutation = useMutation({
    mutationFn: uploadProfile,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: applicantDetailsQueryKey });
      // update session
      update({ user: { profile: data.profile } });
      toast.success(data.message);
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });
  
  // add language
  const addLanguageMutation = useMutation({
    mutationFn: addLanguage,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: applicantDetailsQueryKey });
      toast.success(data.message);
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  // update language
  const updateLanguageMutation = useMutation({
    mutationFn: updateLanguage,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: applicantDetailsQueryKey });
      toast.success(data.message);
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  // delete language
  const deleteLanguageMutation = useMutation({
    mutationFn: deleteLanguage,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: applicantDetailsQueryKey });
      toast.success(data.message);
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  // add emergency contact
  const addEmergencyContactMutation = useMutation({
    mutationFn: addEmergencyContact,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: applicantDetailsQueryKey });
      toast.success(data.message);
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  // update emergencty contact
  const updateEmergencyContactMutation = useMutation({
    mutationFn: updateEmergencyContact,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: applicantDetailsQueryKey });
      toast.success(data.message);
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  // delete emergency contact
  const deleteEmergencyContactMutation = useMutation({
    mutationFn: deleteEmergencyContact,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: applicantDetailsQueryKey });
      toast.success(data.message);
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  // add address
  const addAddressMutation = useMutation({
    mutationFn: addAddress,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: applicantDetailsQueryKey });
      toast.success(data.message);
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  // update address
  const updateAddressMutation = useMutation({
    mutationFn: updateAddress,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: applicantDetailsQueryKey });
      toast.success(data.message);
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  // delete address
  const deleteAddressMutation = useMutation({
    mutationFn: deleteAddress,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: applicantDetailsQueryKey });
      toast.success(data.message);
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  return {
    applicantProfileMutation,
    addWorkExperienceMutation,
    updateWorkExperienceMutation,
    deleteWorkExperienceMutation,
    addEducationHistoryMutation,
    updateEducationHistoryMutation,
    deleteEducationHistoryMutation,
    uploadProfileMutation,
    addLanguageMutation,
    updateLanguageMutation,
    deleteLanguageMutation,
    addEmergencyContactMutation,
    updateEmergencyContactMutation,
    deleteEmergencyContactMutation,
    addAddressMutation,
    updateAddressMutation,
    deleteAddressMutation,
  };
}
