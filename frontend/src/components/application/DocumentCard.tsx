import { File, Download } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Document } from "@/types/profile";
import { useDocumentApi } from "@/api/document";
import { Button } from "../ui/button";

export function DocumentCard({ documents }: { documents: Document[] }) {
  const { downloadResume, downloadCoverLetter } = useDocumentApi();

  const handleDownload = (type: string, id: number, filename: string) => {
    if (type === "resume") {
      downloadResume(id, filename);
    } else if (type === "coverletter") {
      downloadCoverLetter(id, filename);
    }
  };

  const docs = documents.filter((doc) => ["resume", "coverletter"].includes(doc.type));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Documents Submitted</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-2">
          {docs.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between border p-3 rounded">
              <div className="flex items-center gap-3 overflow-hidden">
                <File size={24} className="text-gray-500 shrink-0" />
                <div className="flex flex-col overflow-hidden">
                  <p className="text-xs text-gray-500 capitalize">{doc.type}</p>
                  <p className="text-xs font-medium truncate w-full">{doc.file_name}</p>
                </div>
              </div>
              <Button
                variant={"ghost"}
                className="ml-4 text-gray-500 hover:text-primary shrink-0 cursor-pointer"
                onClick={() => handleDownload(doc.type, doc.id, doc.file_name)}
              >
                <Download size={20} className="text-primary" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
