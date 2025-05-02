"use client";

import { SidebarLayout } from "@/components/sidebar-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import { JobAppliedCard } from "@/components/job/JobAppliedCard";
import { DocumentCard } from "@/components/application/DocumentCard"; // Assuming you have a DocumentCard component for docs

export default function ViewApplicationPage() {
  return (
    <SidebarLayout>
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 w-full mb-6">
        {/* Single Column Layout */}
        <div className="flex flex-col gap-6">

          {/* Applicant Name */}
          <Card className="w-full">
            <CardContent className="p-6">
              <h1 className="text-2xl font-bold tracking-tight mb-4">Applicant Overview</h1>
              <div className="flex items-center gap-4">
                <Image
                  src="/default-profile.png" // Placeholder for profile image
                  alt="Applicant Name"
                  width={50}
                  height={50}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="text-lg font-medium">John Doe</p>
                  <p className="text-lg font-medium">Software Engineer</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Job Applied Card */}
          <div className="w-full">
            <h2 className="text-xl font-semibold mb-4">Job Applied</h2>
            <div className="flex justify-between">
              <p className="text-lg">Software Engineer at TechCorp</p>
              <button className="text-sm text-blue-500 hover:underline">
                View Job Details
              </button>
            </div>
            <JobAppliedCard />
          </div>

          {/* Contact Information */}
          <div className="w-full">
            <Card className="w-full">
              <CardContent className="p-6 space-y-2">
                <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                {/* Labels */}
                <div className="flex gap-12 text-sm font-medium text-muted-foreground">
                  <span>Mobile Number</span>
                  <span>Email Address</span>
                </div>

                {/* Values */}
                <div className="flex gap-12 text-sm text-muted-foreground">
                  <span>+123 456 7890</span>
                  <span>john.doe@example.com</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Documents Section */}
          <div className="w-full mt-6">
            <h1 className="text-xl font-semibold mb-4">Documents</h1>
            <div className="flex flex-col space-y-4">
              <DocumentCard />           
            </div>
          </div>
        </div>

        {/* The other column will be filled later */}
        <div className="w-full lg:w-2/3">
          {/* Content for the second column will go here later */}
        </div>

      </div>
    </SidebarLayout>
  );
}
