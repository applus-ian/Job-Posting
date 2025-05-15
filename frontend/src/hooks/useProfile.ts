import { useProfileApi } from "@/api/profile";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useProfile() {
  const {
    applicantDetails,
    applicantProfile,
    addWorkExperience,
    updateWorkExperience,
    updateAddress,
    addAddress,
    deleteWorkExperience,
    addEducationHistory,
    updateEducationHistory,
    deleteEducationHistory,
    addLanguage,
    updateLanguage,
    addEmergencyContact,
    updateEmergencyContact,
    deleteEmergencyContact,
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

  // update address
  const updateAddressMutation = useMutation({
    mutationFn: updateAddress,
    onError: () => {
      console.log("Something went wrong!");
    },
  })

  // add address
  const addAddressMutation = useMutation({
    mutationFn: addAddress,
    onError: () => {
      console.log("Something went wrong!");
    },
  })

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

  const addLanguageMutation = useMutation({
    mutationFn: addLanguage,
    onError: () => {
      console.log("Something went wrong!");
    }
  });

  const updateLanguageMutation = useMutation({
    mutationFn: updateLanguage,
    onError: () => {
      console.log("Something went wrong!");
    }
  });

  const addEmergencyContactMutation = useMutation({
    mutationFn: addEmergencyContact,
    onError: () => {
      console.log("Something went wrong!");
    }
  });

  const updateEmergencyContactMutation = useMutation({
    mutationFn: updateEmergencyContact,
    onError: () => {
      console.log("Something went wrong!");
    }
  });

  const deleteEmergencyContactMutation = useMutation({
    mutationFn: deleteEmergencyContact,
    onError: () => {
      console.log("Something went wrong!");
    }
  });

  return {
    getAppliantDetailsQuery,
    applicantProfileMutation,
    addWorkExperienceMutation,
    updateWorkExperienceMutation,
    updateAddressMutation,
    addAddressMutation,
    deleteWorkExperienceMutation,
    addEducationHistoryMutation,
    updateEducationHistoryMutation,
    deleteEducationHistoryMutation,
    addLanguageMutation,
    updateLanguageMutation,
    addEmergencyContactMutation,
    updateEmergencyContactMutation,
    deleteEmergencyContactMutation,
  };
}
