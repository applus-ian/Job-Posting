"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import { EmergencyContact } from "@/types/profile";
import { AddEmergencyContactModal } from "./AddEmergencyContactModal";
import { EmergencyContactItem } from "./EmergencyContactItem";

export function EmergencyContactSection({ emergencycontact }: { emergencycontact?: EmergencyContact[] | null }) {
  const [openModal, setOpenModal] = useState(false);

  // If null, undefined, or empty, show the empty message
  if (!emergencycontact || emergencycontact.length === 0) {
    return (
      <>
        <div className="flex w-full justify-between mt-6 mb-4">
          <p className="text-xs lg:text-sm font-medium">Emergency Contacts</p>
          <Button
            variant="outline"
            onClick={() => setOpenModal(true)}
            className="flex items-center gap-1"
          >
            <PlusCircle className="h-4 w-4" />
            Add Emergency Contact
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">No emergency contacts added yet.</p>
        <Separator className="my-6" />
        <AddEmergencyContactModal openModal={openModal} setOpenModal={setOpenModal} />
      </>
    );
  }

  // Otherwise render the list
  return (
    <>
      <div className="flex w-full justify-between mt-6 mb-4">
        <p className="text-xs lg:text-sm font-medium">Emergency Contacts</p>
        <Button
          variant="outline"
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-1"
        >
          <PlusCircle className="h-4 w-4" />
          Add Emergency Contact
        </Button>
      </div>

      {emergencycontact.map((emergencycontact, index) => (
        <EmergencyContactItem key={emergencycontact.id || index} emergencyContact={emergencycontact} />
      ))}

      <Separator className="my-6" />
      <AddEmergencyContactModal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
}
