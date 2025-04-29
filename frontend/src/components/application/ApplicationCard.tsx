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
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-semibold">Recently Applied</h2>
        <a
          href="my-applications/"
          className="flex items-center text-sm text-orange-500 hover:underline font-medium"
        >
          View All <ArrowRight className="ml-1 h-4 w-4" />
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xxl:grid-cols-3 gap-4">
        {sampleApplications.map((app) => (
          <Card key={app.id} className="shadow-sm border border-gray-200 p-2">
            <CardContent className="p-4 relative h-full flex flex-col justify-between">
              {/* Title + Type + Remote */}
              <div className="flex flex-wrap items-center justify-between gap-0">
                <div className="flex flex-row justify-between w-full gap-4">
                  <div className="w-[80%]">
                    <a
                      href="#"
                      className=" hover:text-orange-600 transition-colors text-base font-semibold mb-2"
                    >
                      {app.title}
                    </a>
                  </div>
                  <div className="w-auto">
                    <CustomBadge label={app.status} status={app.status.toLowerCase()} />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm mt-2">
                  <CustomBadge label={app.jobType} status="tag" />
                  <CustomBadge label={app.employmentType} status="tag" />
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
              <div className="mt-4 flex justify-between items-center text-muted-foreground">
                <p className="italic text-xs">Applied: {app.dateApplied}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
