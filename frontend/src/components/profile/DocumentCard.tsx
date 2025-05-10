"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { DocumentForm } from "./DocumentForm";
import { DocumentItem } from "./DocumentItem";
import { Document } from "@/types/profile";

export function DocumentCard({ documents = [] }: { documents?: Document[] }) {
  const getDocumentByType = (type: string) => {
    return documents.find((doc) => doc.type === type);
  };

  const resumeDoc = getDocumentByType("resume");
  const coverLetterDoc = getDocumentByType("coverletter");

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <p className="text-md lg:text-xl">Documents</p>
      </div>
      <div className="w-full mt-4">
        <div className="flex flex-col md:flex-row items-start justify-between gap-4">
          <Card className="w-full md:w-1/2">
            {resumeDoc ? (
              <DocumentItem type="resume" label="Resume" document={resumeDoc} />
            ) : (
              <CardContent>
                <DocumentForm type="resume" label="Resume" />
              </CardContent>
            )}
          </Card>
          <Card className="w-full md:w-1/2">
            {coverLetterDoc ? (
              <DocumentItem type="coverletter" label="Cover Letter" document={coverLetterDoc} />
            ) : (
              <CardContent>
                <DocumentForm type="coverletter" label="Cover Letter" />
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
