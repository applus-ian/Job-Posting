// components/ViewDocumentModal.tsx
import { Dialog, DialogTitle, DialogContent, DialogClose } from "@/components/ui/dialog"; // Import custom dialog components
import { X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDocumentApi } from "@/api/document";
import {DocumentViewer} from "react-documents";


// Props for the PDF viewer modal
interface ViewDocumentModalProps {
  isOpen: boolean; // Whether the modal is open
  onClose: () => void; // Function to close the modal
  fileName: string | null; // File name of the PDF document
}



// Modal component to view PDF documents
export default function ViewDocumentModal({ isOpen, onClose, fileName }: ViewDocumentModalProps) {
  const { viewPDFresume } = useDocumentApi();
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && fileName) {
        setError(null);
        console.log('Attempting to view file:', fileName);
        viewPDFresume(fileName)
            .then(url => {
                console.log('Successfully created blob URL:', url);
                setBlobUrl(url);
            })
            .catch(error => {
                console.error('Error loading PDF:', error);
                setError(error.response?.data?.message || 'Failed to load PDF');
            });
    } else {
        setBlobUrl(null);
        setError(null);
    }

    return () => {
        if (blobUrl) {
            URL.revokeObjectURL(blobUrl);
        }
    };
}, [isOpen, fileName]);

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="relative w-[90vw] h-[90vh] bg-white rounded-lg overflow-hidden -mt-100">
        <DialogTitle>Document Viewer</DialogTitle>
        <DialogClose className="absolute top-4 right-4 z-10 text-gray-600 hover:text-black">
            {/* <X size={24} /> */}
        </DialogClose>
        
        {error ? (
          <DocumentViewer
            queryParams="hl=Nl"
            url={blobUrl || ''}
          ></DocumentViewer>
        ) : (
          <div className="flex items-center justify-center h-full">
            Loading PDF...
          </div>

        )}
      </DialogContent>
    </Dialog>
  );
}
