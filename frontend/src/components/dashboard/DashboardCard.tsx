"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import {
  MapPin,
  DollarSign,
  CheckCircle,
  CircleDot,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Application {
  id: number;
  title: string;
  location: string;
  salary: string;
  dateApplied: string;
  status: "Submitted" | "Reviewed";
}

const sampleApplications: Application[] = [
  {
    id: 1,
    title: "HR Officer – Recruitment & Compliance",
    location: "Cebu City",
    salary: "$50k-80k/month",
    dateApplied: "April 7, 2025 19:28",
    status: "Submitted",
  },
  {
    id: 2,
    title: "IT Support Specialist – Onsite & Remote Assistance",
    location: "Cebu City",
    salary: "$50k-80k/month",
    dateApplied: "April 5, 2025 19:28",
    status: "Reviewed",
  },
];

export function RecentlyApplied() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {sampleApplications.map((app) => (
        <Card key={app.id} className="shadow-sm border border-gray-200">
            <CardContent className="p-4 relative h-full flex flex-col justify-between">
                {/* Top Right Status */}
                <div className="absolute top-0 right-4 text-xs font-medium">
                    {app.status === "Submitted" ? (
                    <span className="flex items-center text-green-600">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Submitted
                    </span>
                    ) : (
                    <span className="flex items-center text-yellow-600">
                        <CircleDot className="w-3 h-3 mr-1" />
                        Reviewed
                    </span>
                    )}
                </div>

                {/* Title and Job Info */}
                <div className="space-y-2">
                    <h3 className="text-base font-semibold">{app.title}</h3>
                    <div className="text-sm text-muted-foreground space-y-1">
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{app.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        <span>{app.salary}</span>
                    </div>
                    </div>
                </div>

                {/* Date */}
                <div className="mt-4 flex justify-between items-center text-xs text-muted-foreground">
                    <p className="italic">Applied: {app.dateApplied}</p>
                </div>
            </CardContent>
        </Card>
      ))}
    </div>
  );
}
