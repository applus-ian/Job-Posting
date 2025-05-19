"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { EmergencyContact } from "@/types/profile";
import { EmergencyContactItem } from "./EmergencyContactItem";
import { AddEmergencyContactModal } from "./AddEmergencyContactModal";

export function EmergencyContactSection({
  emergencycontact,
}: {
  emergencycontact?: EmergencyContact[] | null;
}) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="flex w-full justify-between items-center my-6">
        <p className="text-xs lg:text-sm font-medium">Emergency Contact</p>
        <Button
          variant="outline"
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-1"
        >
          <PlusCircle className="h-4 w-4" />
        </Button>
      </div>
      {!emergencycontact || emergencycontact.length === 0 ? (
        <p className="text-sm text-muted-foreground">No Emergency Contact added yet.</p>
      ) : (
        emergencycontact.map((emergencycontact, index) => (
          <EmergencyContactItem
            key={emergencycontact.id || index}
            emergencycontact={emergencycontact}
          />
        ))
      )}

      <AddEmergencyContactModal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
}
