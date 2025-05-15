"use client";
import { useProfile } from "@/hooks/useProfile";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { EmergencyContact, EmergencyContactFields } from "@/types/profile";
import { EmergencyContactSchema } from "@/schemas/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorResponse } from "@/types/error-response";
import { useSession } from "next-auth/react";

export function useEmergencyContactForm(emergencycontact: EmergencyContact | null) {
  const { addEmergencyContactMutation, updateEmergencyContactMutation } = useProfile();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<EmergencyContactFields>({
    resolver: zodResolver(EmergencyContactSchema),
    defaultValues: {
      full_name: emergencycontact?.full_name || "",
      phone_number: emergencycontact?.phone_number || "", 
      relationship: emergencycontact?.relationship || "",
    },
  });

  const onSubmit: SubmitHandler<EmergencyContactFields> = async (data) => {
    try {
      if (emergencycontact){
        await updateEmergencyContactMutation.mutateAsync({id: emergencycontact.id, ...data});
      }
      else{
        await addEmergencyContactMutation.mutateAsync(data);
      } 
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

  return { 
    form, 
    onSubmit, 
    isSuccess: addEmergencyContactMutation.isSuccess || updateEmergencyContactMutation.isSuccess,
    error };
}
