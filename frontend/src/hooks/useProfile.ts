import { useProfileApi } from "@/api/profile";
import { useMutation, useQuery } from "@tanstack/react-query";

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
  } = useProfileApi();

  // get applicant information, work experience, education history
  const getAppliantDetailsQuery = useQuery({
    queryKey: ["applicant"],
    queryFn: applicantDetails,
  });

  // update applicant profile (personal information)
  const applicantProfileMutation = useMutation({
    mutationFn: applicantProfile,
    onError: () => {
      console.log("Something went wrong!");
    },
  });

  // add work experience
  const addWorkExperienceMutation = useMutation({
    mutationFn: addWorkExperience,
    onError: () => {
      console.log("Something went wrong!");
    },
  });

  // update work experience
  const updateWorkExperienceMutation = useMutation({
    mutationFn: updateWorkExperience,
    onError: () => {
      console.log("Something went wrong!");
    },
  });

  // delete work experience
  const deleteWorkExperienceMutation = useMutation({
    mutationFn: deleteWorkExperience,
    onError: () => {
      console.log("Something went wrong!");
    },
  });

  // add education history
  const addEducationHistoryMutation = useMutation({
    mutationFn: addEducationHistory,
    onError: () => {
      console.log("Something went wrong!");
    },
  });

  // update education history
  const updateEducationHistoryMutation = useMutation({
    mutationFn: updateEducationHistory,
    onError: () => {
      console.log("Something went wrong!");
    },
  });

  // delete education history
  const deleteEducationHistoryMutation = useMutation({
    mutationFn: deleteEducationHistory,
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
  };
}
