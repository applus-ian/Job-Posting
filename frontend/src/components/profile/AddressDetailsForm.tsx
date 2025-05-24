"use client";

import { Form } from "@/components/ui/form";
import { CustomFormInput } from "../form/CustomFormInput";
import { useEffect, useState } from "react";
import { useAddressForm } from "@/forms/profile/useAddressForm";
import { ApplicantAddress } from "@/types/profile";
import { Button } from "@/components/ui/button";
import { EditIcon, Save, Loader2, X } from "lucide-react";

export function AddressDetailsForm({ address }: { address: ApplicantAddress }) {
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const { form, onSubmit, error } = useAddressForm(address);
  const isSubmitSuccessful = form.formState.isSubmitSuccessful;

  useEffect(() => {
    if (isSubmitSuccessful) {
      setIsEditingAddress(false);
    }
  }, [isSubmitSuccessful]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 my-4">
        <div className="flex w-full justify-between items-center">
          <p className="text-xs lg:text-sm">Address Details</p>
          <Button
            type="button"
            variant={"outline"}
            onClick={() => {
              setIsEditingAddress(!isEditingAddress);
              form.reset();
            }}
            className="flex items-center gap-1"
          >
            {isEditingAddress ? <X /> : <EditIcon />}
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <CustomFormInput
              control={form.control}
              name="address"
              label="Full Address"
              placeholder="Enter your full address"
              isEditing={isEditingAddress}
            />
          </div>
          <div>
            <CustomFormInput
              control={form.control}
              name="country"
              label="Country"
              placeholder="Enter country"
              isEditing={isEditingAddress}
            />
          </div>
          <div>
            <CustomFormInput
              control={form.control}
              name="province"
              label="Province"
              placeholder="Enter province"
              isEditing={isEditingAddress}
            />
          </div>
          <div>
            <CustomFormInput
              control={form.control}
              name="city"
              label="City"
              placeholder="Enter city"
              isEditing={isEditingAddress}
            />
          </div>
          <div>
            <CustomFormInput
              control={form.control}
              name="street"
              label="Street"
              placeholder="Enter street"
              isEditing={isEditingAddress}
            />
          </div>
          <div>
            <CustomFormInput
              control={form.control}
              name="zipcode"
              label="Zip Code"
              placeholder="Enter zip code"
              isEditing={isEditingAddress}
            />
          </div>
        </div>

        {error && <div className="text-sm text-red-500">{error}</div>}
        {isEditingAddress && (
          <div className="flex justify-end mt-4">
            <Button
              disabled={form.formState.isSubmitting}
              type="submit"
              className="flex items-center gap-2"
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="animate-spin w-4 h-4" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Address Info
                </>
              )}
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}
