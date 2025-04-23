"use client";
import { Button } from "@/components/ui/button";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useState } from "react";

export function PersonalDocuments() {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null);

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleCoverLetterUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverLetterFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleResumeDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setResumeFile(e.dataTransfer.files[0]);
    }
  };

  const handleCoverLetterDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setCoverLetterFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = () => {
    // Add logic to upload files to server
    console.log("Resume:", resumeFile);
    console.log("Cover Letter:", coverLetterFile);
  };

  return (
    <div className="w-full">
      <div className="w-full bg-white p-4 sm:p-6 rounded-md border shadow-sm">
        <h2 className="text-lg font-medium mb-4">Documents</h2>
        
        {/* Grid container for side-by-side layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Resume Upload Section */}
          <div>
            <p className="text-sm font-medium text-gray-800 mb-2">Upload Resume</p>
            <label 
              htmlFor="resume-upload"
              className="border-2 border-gray-300 rounded-md p-6 cursor-pointer block h-full"
              onDragOver={handleDragOver}
              onDrop={handleResumeDrop}
            >
              <div className="flex flex-col items-center justify-center text-center h-full">
                <FaCloudUploadAlt className="text-[#EC7422] w-12 h-12 mb-3" />
                <p className="text-sm text-gray-800 mb-1">
                  {resumeFile ? resumeFile.name : "Drag your resume here or click to upload"}
                </p>
                <p className="text-xs text-gray-500">
                  Acceptable file types: PDF, DOCX (5MB max)
                </p>
                <input 
                  id="resume-upload" 
                  type="file" 
                  className="hidden" 
                  accept=".pdf,.docx" 
                  onChange={handleResumeUpload}
                />
              </div>
            </label>
          </div>

          {/* Cover Letter Upload Section */}
          <div>
            <p className="text-sm font-medium text-gray-800 mb-2">Upload Cover Letter</p>
            <label 
              htmlFor="cover-letter-upload"
              className="border-2 border-gray-300 rounded-md p-6 cursor-pointer block h-full"
              onDragOver={handleDragOver}
              onDrop={handleCoverLetterDrop}
            >
              <div className="flex flex-col items-center justify-center text-center h-full">
                <FaCloudUploadAlt className="text-[#EC7422] w-12 h-12 mb-3" />
                <p className="text-sm text-gray-800 mb-1">
                  {coverLetterFile ? coverLetterFile.name : "Drag your cover letter here or click to upload"}
                </p>
                <p className="text-xs text-gray-500">
                  Acceptable file types: PDF, DOCX (5MB max)
                </p>
                <input 
                  id="cover-letter-upload" 
                  type="file" 
                  className="hidden" 
                  accept=".pdf,.docx" 
                  onChange={handleCoverLetterUpload}
                />
              </div>
            </label>
          </div>
        </div>

        {/* Upload Button with proper spacing */}
        <div className="flex justify-end mt-12">
          <Button 
            className="bg-[#EC7422] hover:bg-[#EC7422]/90 text-white px-6 py-2 rounded-md"
            onClick={handleSubmit}
            disabled={!resumeFile && !coverLetterFile}
          >
            Upload
          </Button>
        </div>
      </div>
    </div>
  );
}
