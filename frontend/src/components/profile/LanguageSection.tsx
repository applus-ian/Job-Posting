"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Language } from "@/types/profile";
import { LanguageItem } from "./LanguageItem";
import { AddLanguageModal } from "./AddLanguageModal";

export function LanguageSection({ language }: { language?: Language[] | null }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="flex w-full justify-between items-center my-4">
        <p className="text-xs lg:text-sm font-medium">Language</p>
        <Button
          variant="outline"
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-1"
        >
          <PlusCircle className="h-4 w-4" />
        </Button>
      </div>
      {!language || language.length === 0 ? (
        <p className="text-sm text-muted-foreground">No Language added yet.</p>
      ) : (
        language.map((language, index) => (
          <LanguageItem key={language.id || index} language={language} />
        ))
      )}

      <AddLanguageModal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
}
