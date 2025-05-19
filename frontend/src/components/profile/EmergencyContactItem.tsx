"use client";

import { useState, useEffect } from "react";
import { EditIcon, X, Check, Trash, Loader2 } from "lucide-react";
import { EmergencyContact } from "@/types/profile";
import { useEmergencyContactForm } from "@/forms/profile/useEmergencyContactForm";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ProfileFormField } from "@/components/profile/ProfileFormField";
import { useProfile } from "@/hooks/useProfile";

export function EmergencyContactItem({ emergencycontact }: { emergencycontact: EmergencyContact }) {
  const [isEditing, setIsEditing] = useState(false);
  const { form, onSubmit, error, isSuccess } = useEmergencyContactForm(emergencycontact);
  const { deleteEmergencyContactMutation } = useProfile();

  useEffect(() => {
    if (isSuccess) {
      setIsEditing(false);
    }
  }, [isSuccess]);

  return (
    <div className="flex items-center mb-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
            <ProfileFormField
              control={form.control}
              name="full_name"
              label="Full Name"
              placeholder="Enter Full Name"
              isEditing={isEditing}
            />
            <ProfileFormField
              control={form.control}
              name="phone_number"
              label="Contact Number"
              placeholder="Enter Contact Number"
              isEditing={isEditing}
            />

            <div className="flex items-center gap-3">
              <ProfileFormField
                control={form.control}
                name="relationship"
                label="Relationship"
                placeholder="Enter Relationship"
                isEditing={isEditing}
              />

              <Button
                type="button"
                variant={"outline"}
                onClick={() => {
                  setIsEditing(!isEditing);
                }}
                className="flex items-center mt-6"
                disabled={form.formState.isSubmitting || deleteEmergencyContactMutation.isPending}
              >
                {isEditing ? <X /> : <EditIcon />}
              </Button>

              {isEditing && (
                <>
                  <Button
                    type="submit"
                    variant={"outline"}
                    className="flex items-center mt-6"
                    disabled={
                      form.formState.isSubmitting || deleteEmergencyContactMutation.isPending
                    }
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
        disabled={form.formState.isSubmitting || deleteEmergencyContactMutation.isPending}
        onClick={() =>
          emergencycontact.id && deleteEmergencyContactMutation.mutate(emergencycontact.id)
        }
      >
        {deleteEmergencyContactMutation.isPending ? (
          <Loader2 className="animate-spin" />
        ) : (
          <Trash />
        )}
      </Button>
    </div>
  );
}
