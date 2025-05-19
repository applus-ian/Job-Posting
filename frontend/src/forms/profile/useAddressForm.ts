"use client";
import { useProfile } from "@/hooks/useProfile";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ApplicantAddress, ApplicantAddressFields } from "@/types/profile";
import { ApplicantAddressSchema } from "@/schemas/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorResponse } from "@/types/error-response";

export function useAddressForm(address: ApplicantAddress | null) {
  const { addAddressMutation, updateAddressMutation } = useProfile();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ApplicantAddressFields>({
    resolver: zodResolver(ApplicantAddressSchema),
    defaultValues: {
      address: address?.address || "",
      country: address?.country || "",
      province: address?.province || "",
      city: address?.city || "",
      street: address?.street || "",
      zipcode: address?.zipcode || "",
    },
  });

  const onSubmit: SubmitHandler<ApplicantAddressFields> = async (data) => {
    try {
      if (address) {
        await updateAddressMutation.mutateAsync({ id: address.id, ...data });
      } else {
        await addAddressMutation.mutateAsync(data);
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
    isSuccess: addAddressMutation.isSuccess || updateAddressMutation.isSuccess,
    error,
  };
}
