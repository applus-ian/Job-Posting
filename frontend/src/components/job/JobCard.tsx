"use client";

import { Card, CardContent } from "@/components/ui/card";
import { UsersRound, UserPlus2, House, Briefcase, Wallet } from "lucide-react";
import { useState } from "react";

interface Job {
  id: number;
  title: string;
  application: number;
  vacant: number;
  postedAt: string;
  department: string;
  category: string;
  type: string;
  salary: string;
}

interface JobCardProps {
  job: Job;
  onClick: () => void;
  isSelected: boolean;
}

export default function JobCard({ job, onClick, isSelected }: JobCardProps) {
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <Card
      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
        isSelected ? "border-orange-400 border-2" : "hover:border-gray-300"
      }`}
      onClick={onClick}
    >
      <CardContent className="px-5">
        <div className="flex flex-row items-start w-full gap-8">
          <div className="w-[90%]">
            <h3 className="font-semibold text-lg">{job.title}</h3>
          </div>
          <div className="w-auto flex flex-row">
            <div className="mt-2 space-y-1 text-xs text-gray-500">
              <i>{job.postedAt}</i>
            </div>
          </div>
        </div>
        <div className="mt-2 space-y-1 text-xs text-gray-500">
          <div className="flex flex-row gap-6">
            <div className="flex items-center">
              <UsersRound className="h-4 w-4 mr-2" />
              <span>
                {job.application} {job.application === 1 ? "Application" : "Applications"}
              </span>
            </div>
            <div className="flex items-center">
              <UserPlus2 className="h-4 w-4 mr-2" />
              <span>
                {job.vacant} {job.vacant === 1 ? "Vacant" : "Vacants"}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2">
            {/* Department */}
            <div className="flex items-center w-full sm:w-auto text-start">
              <House className="w-4 h-4 mr-2 text-primary shrink-0" />
              <span className="font-semibold break-words">{job.department}</span>
            </div>

            {/* Category */}
            <div className="flex items-center w-full sm:w-auto text-start">
              <Briefcase className="w-4 h-4 mr-2 text-primary shrink-0" />
              <span className="font-semibold break-words">{job.category}</span>
            </div>

            {/* Salary */}
            <div className="flex items-center w-full sm:w-auto text-start">
              <Wallet className="w-4 h-4 mr-2 text-primary shrink-0" />
              <span className="font-semibold break-words">{job.salary}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
