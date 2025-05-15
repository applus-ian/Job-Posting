"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, Trash2, Pencil, PlusCircle } from "lucide-react";
import { Language } from "@/types/profile";
import { useLanguageForm } from "@/forms/profile/useLanguageForm";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ProfileFormField } from "@/components/profile/ProfileFormField"; // Assuming you saved it here

interface LanguageItemProps {
  language: Language;
}

export function LanguageItem({ language }: LanguageItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { form, onSubmit, error, isSuccess } = useLanguageForm(language);

  useEffect(() => {
    if (isSuccess) {
      setIsEditing(false);
    }
  }, [isSuccess]);

  const handleSave = () => {
    form.handleSubmit(onSubmit)();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pb-6 border-b">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Controlled input for language name */}
          <ProfileFormField
            control={form.control}
            name="language_name"
            label="Language"
            placeholder="Language"
            isEditing={isEditing}
          />

          {/* Controlled select for proficiency */}
          <ProfileFormField
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

          {/* Trash icon for delete (implement handler if needed) */}
          {isEditing && (
            <div className="flex items-end">
              <Trash2 className="w-5 h-5 text-red-500 cursor-pointer" />
            </div>
          )}
        </div>

        {/* Action buttons */}
        {isEditing ? (
          <div className="flex items-center justify-between mt-3">
            <Button type="button" variant="outline" size="sm" className="flex items-center gap-1">
              <PlusCircle className="h-4 w-4" />
              Add Another Language
            </Button>

            <Button
              disabled={form.formState.isSubmitting}
              type="submit"
              className="flex items-center gap-2"
              onClick={handleSave}
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
        ) : (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="flex items-center gap-1 text-blue-500"
            onClick={() => setIsEditing(true)}
          >
            <Pencil className="w-4 h-4" />
            Edit
          </Button>
        )}
      </form>
    </Form>
  );
}
