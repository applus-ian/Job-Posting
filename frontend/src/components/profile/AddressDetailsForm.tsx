
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {Save, Loader2 } from "lucide-react"; 
import { Separator } from "@radix-ui/react-separator";
import { ApplicantAddress } from "@/types/profile";
import { useApplicantAddressForm } from "@/forms/profile/useApplicantAddressForm";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function AddressDetailsForm({address}: {address: ApplicantAddress}){
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const { form, onSubmit, error } = useApplicantAddressForm(address);
  const isSubmitSuccessful = form.formState.isSubmitSuccessful;

  useEffect(() => {
    if (isSubmitSuccessful) {
      setIsEditingAddress(false); // Exit editing for personal info

    }
  }, [isSubmitSuccessful]);

  // Submit function for Personal Info section
  const handleAddressSubmit = () => {
    form.handleSubmit(onSubmit)();  // This triggers the form submission for Personal Info
    setIsEditingAddress(false); // Close editing mode after submission
  };
    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pb-6 border-b border-t">
                <div className="flex w-full justify-between pt-6">
                    <p className="text-xs lg:text-sm">Address</p>
                    <Button
                    variant={isEditingAddress ? "destructive" : "default"}
                    onClick={() => {
                        setIsEditingAddress(!isEditingAddress);
                        form.reset(); // Reset the form when Cancel is clicked
                    }}
                    className="flex items-center gap-1"
                    >
                    {isEditingAddress ? <>Cancel</> : <>Edit</>}
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div>
                    <label htmlFor="" className="text-[rgba(0,0,0,0.7)] text-xs ms-1">
                        Country:{" "}
                    </label>
                    <Input
                        disabled={!isEditingAddress}
                        placeholder="Philippines"
                        type="text"
                        className="text-xs lg:text-sm"
                    />
                    </div>
                    <div className="md:col-span-2">
                    <label htmlFor="" className="text-[rgba(0,0,0,0.7)] text-xs ms-1">
                        Street:{" "}
                    </label>
                    <Input
                        disabled={!isEditingAddress}
                        placeholder="Camagung, Lahug"
                        type="text"
                        className="text-xs lg:text-sm"
                    />
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div>
                    <label htmlFor="" className="text-[rgba(0,0,0,0.7)] text-xs ms-1">
                        ZIP Code:{" "}
                    </label>
                    <Input
                        disabled={!isEditingAddress}
                        placeholder="6000"
                        type="number"
                        className="text-xs lg:text-sm"
                    />
                    </div>
                    <div>
                    <label htmlFor="" className="text-[rgba(0,0,0,0.7)] text-xs ms-1">
                        City:{" "}
                    </label>
                    <Input
                        disabled={!isEditingAddress}
                        placeholder="Cebu City"
                        type="text"
                        className="text-xs lg:text-sm"
                    />
                    </div>
                    <div>
                    <label htmlFor="" className="text-[rgba(0,0,0,0.7)] text-xs ms-1">
                        Province/State:{" "}
                    </label>
                    <Input
                        disabled={!isEditingAddress}
                        placeholder="Cebu"
                        type="text"
                        className="text-xs lg:text-sm"
                    />
                    </div>
                </div>

                {error && <div className="text-sm text-red-500">{error}</div>}
                {form.formState.errors.root && (
                    <div className="text-red-500 text-sm font-medium">
                    {form.formState.errors.root.message}
                    </div>
                )}

                {/* Submit Button */}
                {isEditingAddress && (
                    <div className="flex justify-end">
                    <Button
                        disabled={form.formState.isSubmitting} // Disable the button while submitting
                        type="submit"
                        className="flex items-center gap-2"
                        onClick={handleAddressSubmit} // Custom submit handler for address
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
                )}
            </form>
            <Separator />
        </Form>
        
    );
}