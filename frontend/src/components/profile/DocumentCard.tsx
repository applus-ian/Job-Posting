import { CloudUpload, FileText } from "lucide-react";
import { useRef, useState } from "react";

export function DocumentCard() {
  const resumeInputRef = useRef<HTMLInputElement>(null);
  const coverLetterInputRef = useRef<HTMLInputElement>(null);

  const [resumeFileName, setResumeFileName] = useState<string | null>(null);
  const [coverLetterFileName, setCoverLetterFileName] = useState<string | null>(null);

  const handleResumeClick = () => resumeInputRef.current?.click();
  const handleCoverClick = () => coverLetterInputRef.current?.click();

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <p className="text-md lg:text-xl">Documents</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Resume Upload */}
        <div
          onClick={handleResumeClick}
          className="border border-dashed border-gray-300 rounded-md p-6 text-center hover:border-orange-500 transition-colors cursor-pointer min-h-[150px] flex items-center justify-center"
        >
          {resumeFileName ? (
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-orange-600" />
              <p className="text-orange-600 text-sm underline">{resumeFileName}</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-2">
              <CloudUpload className="w-20 h-20 text-orange-500" strokeWidth={1} />
              <p className="text-sm font-medium">Click to upload your resume</p>
              <p className="text-xs text-gray-500">PDF, DOCX (5MB max)</p>
            </div>
          )}
          <input
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            ref={resumeInputRef}
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setResumeFileName(file.name);
              }
            }}
          />
        </div>

        {/* Cover Letter Upload */}
        <div
          onClick={handleCoverClick}
          className="border border-dashed border-gray-300 rounded-md p-6 text-center hover:border-orange-500 transition-colors cursor-pointer min-h-[150px] flex items-center justify-center"
        >
          {coverLetterFileName ? (
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-orange-600" />
              <p className="text-orange-600 text-sm underline">{coverLetterFileName}</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-2">
              <CloudUpload className="w-20 h-20 text-orange-500" strokeWidth={1} />
              <p className="text-sm font-medium">Click to upload your cover letter</p>
              <p className="text-xs text-gray-500">PDF, DOCX (5MB max)</p>
            </div>
          )}
          <input
            type="file"
            name="cover_letter"
            accept=".pdf,.doc,.docx"
            ref={coverLetterInputRef}
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setCoverLetterFileName(file.name);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
