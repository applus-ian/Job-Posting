"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import { Language } from "@/types/profile";
import { AddLanguageModal } from "./AddLanguageModal";
import { LanguageItem } from "./LanguageItem";

export function LanguageSection({ language }: { language?: Language[] | null }) {
  const [openModal, setOpenModal] = useState(false);

  // If null, undefined, or empty, show the empty message
  if (!language || language.length === 0) {
    return (
      <>
        <div className="flex w-full justify-between mt-6 mb-4">
          <p className="text-xs lg:text-sm font-medium">Language</p>
          <Button
            variant="outline"
            onClick={() => setOpenModal(true)}
            className="flex items-center gap-1"
          >
            <PlusCircle className="h-4 w-4" />
            Add Language
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">No language added yet.</p>
        <Separator className="my-6" />
        <AddLanguageModal openModal={openModal} setOpenModal={setOpenModal} />
      </>
    );
  }

  // Otherwise render the list
  return (
    <>
      <div className="flex w-full justify-between mt-6 mb-4">
        <p className="text-xs lg:text-sm font-medium">Language</p>
        <Button
          variant="outline"
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-1"
        >
          <PlusCircle className="h-4 w-4" />
          Add Language
        </Button>
      </div>

      {language.map((language, index) => (
        <LanguageItem key={language.id || index} language={language} />
      ))}

      <Separator className="my-6" />
      <AddLanguageModal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
}
