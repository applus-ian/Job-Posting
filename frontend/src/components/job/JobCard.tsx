"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Building, MapPin, Clock, DollarSign } from "lucide-react";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
}

interface JobCardProps {
  job: Job;
  onClick: () => void;
  isSelected: boolean;
}

export default function JobCard({ job, onClick, isSelected }: JobCardProps) {
  return (
    <Card
      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
        isSelected ? "border-primary border-2" : "hover:border-gray-300"
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg">{job.title}</h3>
        <div className="mt-2 space-y-1 text-sm text-gray-500">
          <div className="flex items-center">
            <Building className="h-4 w-4 mr-2" />
            <span>{job.company}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            <span>{job.type}</span>
          </div>
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 mr-2" />
            <span>{job.salary}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
