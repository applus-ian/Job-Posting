import { File, Download } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
export function DocumentCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Documents Submitted</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4">
          {/* Resume */}
          <div className="flex items-center justify-between w-full ">
            <div className="flex items-center gap-3 overflow-hidden">
              <File size={24} className="text-gray-500 shrink-0" />
              <div className="flex flex-col overflow-hidden">
                <p className="text-xs text-gray-500">Resume</p>
                <p className="text-xs font-medium truncate w-full">jane_doe_resume_2025.pdf</p>
              </div>
            </div>
            <button className="ml-4 text-gray-500 hover:text-primary shrink-0">
              <Download size={20} className="text-primary" />
            </button>
          </div>
          {/* Cover Letter */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3 overflow-hidden">
              <File size={24} className="text-gray-500 shrink-0" />
              <div className="flex flex-col overflow-hidden">
                <p className="text-xs text-gray-500">Cover Letter</p>
                <p className="text-xs font-medium truncate w-full">
                  jane_doe_cover_letter_2025.pdf
                </p>
              </div>
            </div>
            <button className="ml-4 text-gray-500 hover:text-primary shrink-0">
              <Download size={20} className="text-primary" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
