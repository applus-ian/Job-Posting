"use client";
import { SidebarLayout } from "@/components/sidebar-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CreateJobPostingForm from "@/components/create-job-posting/create-job-posting-form";
export default function CreateJobPosting() {
  return (
    <SidebarLayout>
        <div>
        <span className="font-bold">Create New Job Posting </span> <br />
        <span className="text-sm text-gray-500">Provide details for the job position you'd like to post.</span>
        </div>

        <Card>
            <CreateJobPostingForm />
        </Card>
    </SidebarLayout>
  );
}
