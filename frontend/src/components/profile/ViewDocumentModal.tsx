// components/ViewDocumentModal.tsx
import { Dialog, DialogTitle, DialogContent, DialogClose } from "@/components/ui/dialog"; // Import custom dialog components
import { X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDocumentApi } from "@/api/document";


// Props for the PDF viewer modal
interface ViewDocumentModalProps {
  isOpen: boolean; // Whether the modal is open
  onClose: () => void; // Function to close the modal
  fileName: string | null; // File name of the PDF document
}



// Modal component to view PDF documents
export default function ViewDocumentModal({ isOpen, onClose, fileName }: ViewDocumentModalProps) {
  const { data: session } = useSession();
  const username ={
    name:  session?.user?.name || "User",
  }

  const { viewPDFresume } = useDocumentApi();
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && fileName) {
      console.log('Attempting to view file:', fileName); // Add logging
      viewPDFresume(fileName)
        .then(url => {
          console.log('Successfully created blob URL:', url); // Add logging
          setBlobUrl(url);
        })
        .catch(error => {
          console.error('Error loading PDF:', error);
        });
    } else {
      setBlobUrl(null);
    }
  }, [isOpen, fileName, viewPDFresume]);

  console.log(session?.user?.token)
  
  // If not open, render nothing
  if (!isOpen) return null;

  return (
    // Use custom Dialog component
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }} >
      {/* DialogContent is the modal window */}
      <DialogContent className="relative w-[90vw] h-[90vh] bg-white rounded-lg overflow-hidden -mt-100">
        {/* Dialog title inside the modal for proper centering */}
        <DialogTitle>Document</DialogTitle>
        {/* Close button using DialogClose for accessibility */}
        <DialogClose asChild className="absolute top-4 right-4 z-10 text-gray-600 hover:text-black">
            {/* <X size={24} /> */}
        </DialogClose>
        {/* PDF viewer using iframe */}
        {blobUrl ? (
          <iframe src={blobUrl} className="w-full h-full" frameBorder="0" />
        ) : (
          <div>Loading PDF...</div>
          
        )}
        <div>{fileName}</div>
      </DialogContent>
    </Dialog>
  );
}
