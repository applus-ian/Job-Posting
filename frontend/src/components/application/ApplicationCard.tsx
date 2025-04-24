"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import CustomBadge from "../badges/CustomBadge";
import { MapPin, DollarSign } from "lucide-react";

interface Application {
  id: number;
  title: string;
  location: string;
  salary: string;
  dateApplied: string;
  status: "Submitted" | "Reviewed";
  jobType: string;
  employmentType: string;
}

const sampleApplications: Application[] = [
  {
    id: 1,
    title: "HR Officer – Recruitment & Compliance",
    location: "Cebu City",
    salary: "$50k-80k/month",
    dateApplied: "April 7, 2025 19:28",
    status: "Submitted",
    jobType: "Full-Time",
    employmentType: "On-site",
  },
  {
    id: 2,
    title: "IT Support Specialist – Onsite & Remote Assistance",
    location: "Cebu City",
    salary: "$50k-80k/month",
    dateApplied: "April 5, 2025 19:28",
    status: "Reviewed",
    jobType: "Part-Time",
    employmentType: "Remote",
  },
  {
    id: 3,
    title: "Frontend Developer",
    location: "Mandaue City",
    salary: "$70k-100k/month",
    dateApplied: "April 3, 2025 10:10",
    status: "Reviewed",
    jobType: "Full-Time",
    employmentType: "Remote",
  },
];

export function ApplicationCard() {
  return (
    <div className="mt-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Recently Applied</h2>
        <a
          href="my-applications/"
          className="flex items-center text-sm text-blue-600 hover:underline font-medium"
        >
          View All <ArrowRight className="ml-1 h-4 w-4" />
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sampleApplications.map((app) => (
          <Card key={app.id} className="shadow-sm border border-gray-200">
            <CardContent className="p-4 relative h-full flex flex-col justify-between">
              {/* Top Right Status */}
              <div className="absolute -top-2 right-4 text-xs font-medium">
                <CustomBadge label={app.status} status="tag" />
              </div>

              {/* Title + Type + Remote */}
              <div className="flex flex-wrap items-center justify-between gap-0">
                <a
                  href="#"
                  className="hover:text-orange-600 transition-colors text-base font-semibold"
                >
                  {app.title}
                </a>
                <div className="flex items-center gap-1 text-sm">
                  <CustomBadge label={app.jobType} status="tag" />
                  <span className="text-muted-foreground">{app.employmentType}</span>
                </div>
              </div>

              {/* Location & Salary */}
              <div className="text-sm text-muted-foreground mt-2 space-y-1">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{app.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  <span>{app.salary}</span>
                </div>
              </div>

              {/* Date Applied */}
              <div className="mt-4 flex justify-between items-center text-xs text-muted-foreground">
                <p className="italic">Applied: {app.dateApplied}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
