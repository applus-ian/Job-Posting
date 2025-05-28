"use client";

import { useState, useEffect } from "react";
import { EditIcon, X, Check, Trash, Loader2 } from "lucide-react";
import { Language } from "@/types/profile";
import { useLanguageForm } from "@/forms/profile/useLanguageForm";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { CustomFormInput } from "@/components/form/CustomFormInput";
import { useProfile } from "@/hooks/useProfile";

export function LanguageItem({ language }: { language: Language }) {
  const [isEditing, setIsEditing] = useState(false);
  const { form, onSubmit, error, isSuccess } = useLanguageForm(language);
  const { deleteLanguageMutation } = useProfile();

  useEffect(() => {
    if (isSuccess) {
      form.reset();
      setIsEditing(false);
    }
  }, [form, isSuccess]);

  return (
    <div className="flex items-center mb-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomFormInput
              control={form.control}
              name="language"
              label="Language"
              placeholder="Language"
              isEditing={isEditing}
            />

            <div className="flex items-center gap-3">
              <CustomFormInput
                control={form.control}
                name="proficiency_level"
                label="Proficiency Level"
                placeholder="Select level"
                isEditing={isEditing}
                variant="select"
                options={[
                  { value: "beginner", label: "Beginner" },
                  { value: "intermediate", label: "Intermediate" },
                  { value: "advanced", label: "Advanced" },
                  { value: "fluent", label: "Fluent" },
                  { value: "native", label: "Native" },
                ]}
              />

              <Button
                type="button"
                variant={"outline"}
                onClick={() => {
                  setIsEditing(!isEditing);
                  form.reset();
                }}
                className="flex items-center mt-6"
                disabled={form.formState.isSubmitting || deleteLanguageMutation.isPending}
              >
                {isEditing ? <X /> : <EditIcon />}
              </Button>

              {isEditing && (
                <>
                  <Button
                    type="submit"
                    variant={"outline"}
                    className="flex items-center mt-6"
                    disabled={form.formState.isSubmitting || deleteLanguageMutation.isPending}
                  >
                    {form.formState.isSubmitting ? <Loader2 className="animate-spin" /> : <Check />}
                  </Button>
                </>
              )}
            </div>
          </div>

          {error && <div className="text-sm text-red-500">{error}</div>}
        </form>
      </Form>
      <Button
        type="submit"
        variant={"outline"}
        className="flex items-center ms-3 mt-6"
        disabled={form.formState.isSubmitting || deleteLanguageMutation.isPending}
        onClick={() => language.id && deleteLanguageMutation.mutate(language.id)}
      >
        {deleteLanguageMutation.isPending ? <Loader2 className="animate-spin" /> : <Trash />}
      </Button>
    </div>
  );
}
