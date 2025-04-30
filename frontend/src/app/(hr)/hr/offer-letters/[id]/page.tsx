"use client";

import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import { SidebarLayout } from "@/components/sidebar-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { JobAppliedCard } from "@/components/job/JobAppliedCard";
import { Mail, Phone, MapPin } from 'lucide-react'; 


const offer = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+639123456789",
    address: "123 Main Street, Manila",
    job_applied: "Software Engineer",
    salary: "₱50,000",
    employment_type: "Full-time",
    work_setup: "Hybrid",
    start_date: "2024-06-01",
    expiration: "2024-06-15",
    status: "Received",
    applied_date: "November 25, 2024",
    profile_picture: "/profile pictures/Profile.png",
  },
];

export default function ApplicationDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const app = offer.find((a) => a.id === id);

  if (!app) return notFound();

  return (
    <SidebarLayout>
      <div className="mb-3">
        <p className="text-2xl font-medium">Offer Letter Details</p>
        <p>
          Review the official offer extended to the applicant, including job
          information, terms, and current offer status.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[.7fr_1.5fr] gap-6 w-full">
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-6">
          {/* Applicant Overview */}
          <Card className="w-full">
            <CardContent className="p-3">
              <h2 className="text-xl font-semibold mb-4">Applicant Overview</h2>
              <div className="flex flex-col items-start gap-4">
                <div className="flex items-center gap-4">
                  <Image
                    src={app.profile_picture}
                    alt={app.name}
                    width={50}
                    height={50}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <p className="text-lg font-medium">{app.name}</p>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Mail className="text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">{app.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">{app.phone}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">{app.address}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* JobAppliedCard */}
          <div className="w-full">
            <JobAppliedCard />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <Card className="w-full">
          <CardContent className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">Offer Letter Preview</h3>

            <div className="border rounded-md p-4 bg-muted flex flex-col items-start gap-3">
            <p className="text-sm text-muted-foreground">
                Uploaded File:
            </p>

            <div className="flex items-center gap-2">
                <div className="w-10 h-12 bg-white border rounded-sm flex items-center justify-center">
                <span className="text-xs font-medium">PDF</span>
                </div>
                <div>
                <p className="text-sm font-medium text-foreground">Offer_JohnDoe.pdf</p>
                <p className="text-xs text-muted-foreground">120 KB</p>
                </div>
                <a
                href="/path/to/offer-letter.pdf" // replace with actual file path or file viewer route
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-orange-500 hover:underline ml-auto"
                >
                View
                </a>
            </div>
            </div>

          </CardContent>
        </Card>
      </div>
    </SidebarLayout>
  );
}