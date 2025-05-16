"use client";
import { useProfileApi } from "@/api/profile";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";

export function useProfile() {
  const {
    applicantDetails,
    applicantProfile,
    addWorkExperience,
    updateWorkExperience,
    deleteWorkExperience,
    addEducationHistory,
    updateEducationHistory,
    deleteEducationHistory,
    uploadProfile,
  } = useProfileApi();
  const { data: session, update } = useSession();
  const queryClient = useQueryClient();
  const applicantDetailsQueryKey = ["applicant", session?.user.applicant_id];

  // get applicant information, work experience, education history
  const getAppliantDetailsQuery = useQuery({
    queryKey: applicantDetailsQueryKey,
    queryFn: applicantDetails,
  });

  // update applicant profile (personal information)
  const applicantProfileMutation = useMutation({
    mutationFn: applicantProfile,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: applicantDetailsQueryKey });
      const fullName =
        `${data.applicant.first_name}${data.applicant.middle_name ? ` ${data.applicant.middle_name}` : ""} ${data.applicant.last_name}`.trim();
      // update session
      update({ user: { name: fullName } });
    },
    onError: () => {
      console.log("Something went wrong!");
    },
  });

  // add work experience
  const addWorkExperienceMutation = useMutation({
    mutationFn: addWorkExperience,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: applicantDetailsQueryKey });
    },
    onError: () => {
      console.log("Something went wrong!");
    },
  });

  // update work experience
  const updateWorkExperienceMutation = useMutation({
    mutationFn: updateWorkExperience,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: applicantDetailsQueryKey });
    },
    onError: () => {
      console.log("Something went wrong!");
    },
  });

  // delete work experience
  const deleteWorkExperienceMutation = useMutation({
    mutationFn: deleteWorkExperience,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: applicantDetailsQueryKey });
    },
    onError: () => {
      console.log("Something went wrong!");
    },
  });

  // add education history
  const addEducationHistoryMutation = useMutation({
    mutationFn: addEducationHistory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: applicantDetailsQueryKey });
    },
    onError: () => {
      console.log("Something went wrong!");
    },
  });

  // update education history
  const updateEducationHistoryMutation = useMutation({
    mutationFn: updateEducationHistory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: applicantDetailsQueryKey });
    },
    onError: () => {
      console.log("Something went wrong!");
    },
  });

  // delete education history
  const deleteEducationHistoryMutation = useMutation({
    mutationFn: deleteEducationHistory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: applicantDetailsQueryKey });
    },
    onError: () => {
      console.log("Something went wrong!");
    },
  });

  // update applicant profile
  const uploadProfileMutation = useMutation({
    mutationFn: uploadProfile,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: applicantDetailsQueryKey });
      // update session
      update({ user: { profile: data.profile } });
    },
    onError: () => {
      console.log("Something went wrong!");
    },
  });

  return {
    getAppliantDetailsQuery,
    applicantProfileMutation,
    addWorkExperienceMutation,
    updateWorkExperienceMutation,
    deleteWorkExperienceMutation,
    addEducationHistoryMutation,
    updateEducationHistoryMutation,
    deleteEducationHistoryMutation,
    uploadProfileMutation,
  };
}
