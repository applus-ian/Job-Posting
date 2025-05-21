"use client";
import { CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Download, Trash2 } from "lucide-react";
import { DocumentItemProps } from "@/types/profile";
import { useDocumentApi } from "@/api/document";
import { useState } from "react";
import { DeleteDocumentModal } from "./DeleteDocumentModal";
import ViewDocumentModal from "./ViewDocumentModal";


export function DocumentItem({ type = "resume", label, document }: DocumentItemProps) {
  const { downloadResume, downloadCoverLetter } = useDocumentApi();
  const [openDialog, setOpenDialog] = useState(false);
  const [openPdfModal, setOpenPdfModal] = useState(false);

  const handleDownload = (id: number, filename: string) => {
    if (type === "resume") {
      if (document) {
        setOpenPdfModal(true); 
      } else {
        downloadResume(id, filename);
      }
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
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleDownload(document.id, document.file_name)}
          >
            <Download className="w-4 h-4 mr-2" />
            <p className="text-sm">{document.file_name}</p>
          </Button>
        </div>
      </CardContent>

      <DeleteDocumentModal
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        document={document}
      />
      <ViewDocumentModal
        isOpen={openPdfModal}
        onClose={() => setOpenPdfModal(false)}
        fileName={document.file_name}
      />

    </>
  );
}
