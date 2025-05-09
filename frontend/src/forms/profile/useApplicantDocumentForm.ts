"use client";
import { DocumentType, DocumentValue } from "@/types/profile";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DocumentSchema } from "@/schemas/profile";
import { useState } from "react";
import { ErrorResponse } from "@/types/error-response";
import { useDocumentApi } from "@/api/document";

export function useApplicantDocumentForm({ type = "resume" }: { type: DocumentType }) {
  const { uploadResume, uploadCoverLetter } = useDocumentApi();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<DocumentValue>({
    resolver: zodResolver(DocumentSchema),
    defaultValues: {
      file: [],
    },
  });

  const onSubmit: SubmitHandler<DocumentValue> = async (data: DocumentValue) => {
    try {
      if (type === "resume") {
        await uploadResume(data.file[0]);
      } else if (type === "coverletter") {
        await uploadCoverLetter(data.file[0]);
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
    error,
  };
}
