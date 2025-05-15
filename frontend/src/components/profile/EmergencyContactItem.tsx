"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, Trash2, Pencil } from "lucide-react";
import { EmergencyContact } from "@/types/profile";
import { useEmergencyContactForm } from "@/forms/profile/useEmergencyContactForm";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface EmergencyContactItemProps {
  emergencyContact: EmergencyContact;
}

export function EmergencyContactItem({ emergencyContact }: EmergencyContactItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { form, onSubmit, error, isSuccess } = useEmergencyContactForm(emergencyContact);

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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-start border rounded-lg p-4 mb-4"
      >
        <div className="col-span-1 lg:col-span-2">
          <label className="text-xs text-muted-foreground mb-1 block">Name</label>
          <Input
            {...form.register("full_name")}
            disabled={!isEditing}
            placeholder="Name"
            className="text-xs lg:text-sm"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Phone Number</label>
          <Input
            {...form.register("phone_number")}
            disabled={!isEditing}
            placeholder="Phone Number"
            className="text-xs lg:text-sm"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Relationship</label>
          <Input
            {...form.register("relationship")}
            disabled={!isEditing}
            placeholder="Relationship"
            className="text-xs lg:text-sm"
          />
        </div>

        <div className="flex items-center gap-2 pt-6">
          {isEditing ? (
            <>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => {
                  form.reset();
                  setIsEditing(false);
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
              </Button>
              <Button type="button" variant="ghost" size="icon" className="text-red-500">
                <Trash2 className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => setIsEditing(true)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
          )}
        </div>
        {error && (
          <p className="text-sm text-red-500 col-span-full">{error}</p>
        )}
      </form>
    </Form>
  );
}
