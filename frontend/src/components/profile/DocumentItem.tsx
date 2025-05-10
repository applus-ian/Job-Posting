"use client";
import { CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Download, Trash2 } from "lucide-react";
import { DocumentItemProps } from "@/types/profile";
import { useDocumentApi } from "@/api/document";
import { useState } from "react";
import { DeleteDocumentModal } from "./DeleteDocumentModal";

export function DocumentItem({ type = "resume", label, document }: DocumentItemProps) {
  const { downloadResume, downloadCoverLetter } = useDocumentApi();
  const [openDialog, setOpenDialog] = useState(false);
  const handleDownload = (id: number, filename: string) => {
    if (type === "resume") {
      downloadResume(id, filename);
    } else if (type === "coverletter") {
      downloadCoverLetter(id, filename);
    }
  };

  return (
    <>
      <CardHeader className="flex justify-between items-center">
        <span>Your {label}</span>
        <Button variant={"ghost"} className="p-0" onClick={() => setOpenDialog(true)}>
          <Trash2 />
        </Button>
      </CardHeader>
      <CardContent>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => handleDownload(document.id, document.file_name)}
        >
          <Download className="w-4 h-4 mr-2" />
          <p className="text-sm">{document.file_name}</p>
        </Button>
      </CardContent>

      <DeleteDocumentModal
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        document={document}
      />
    </>
  );
}
