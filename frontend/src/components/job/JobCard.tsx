"use client";

import { Card, CardContent } from "@/components/ui/card";
import { UsersRound, UserPlus2, Briefcase, Wallet } from "lucide-react";
import { JobCardProps } from "@/types/job";
import { formatDateOnly } from "@/utils/dateFormatter";

export default function JobCard({ jobposting, onClick, isSelected }: JobCardProps) {
  return (
    <Card
      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
        isSelected ? "border-orange-400 border-2" : "hover:border-gray-300"
      }`}
      onClick={onClick}
    >
      <CardContent className="px-5">
        <div className="w-full">
          <h3 className="font-semibold text-lg">{jobposting.title}</h3>
        </div>
        <div className="mt-2 space-y-1 text-xs text-gray-500">
          <div className="flex flex-row gap-6">
            <div className="flex items-center">
              <UsersRound className="h-4 w-4 mr-2" />
              <span>
                {jobposting.applications.length}{" "}
                {jobposting.applications.length === 1 ? "Applicant" : "Applicants"}
              </span>
            </div>
            <div className="flex items-center">
              <UserPlus2 className="h-4 w-4 mr-2" />
              <span>
                {jobposting.vacancies} {jobposting.vacancies === 1 ? "Vacant" : "Vacants"}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2">
            {/* Department */}
            {/* <div className="flex items-center w-full sm:w-auto text-start">
              <House className="w-4 h-4 mr-2 text-primary shrink-0" />
              <span className="font-semibold break-words">{job.department}</span>
            </div> */}

            {/* Category */}
            <div className="flex items-center w-full sm:w-auto text-start">
              <Briefcase className="w-4 h-4 mr-2 text-primary shrink-0" />
              <span className="font-semibold break-words">{jobposting.category}</span>
            </div>

            {/* Salary */}
            <div className="flex items-center w-full sm:w-auto text-start">
              <Wallet className="w-4 h-4 mr-2 text-primary shrink-0" />
              <span className="font-semibold break-words">
                {jobposting.salary_min && jobposting.salary_max
                  ? `$${jobposting.salary_min.toLocaleString()} - $${jobposting.salary_max.toLocaleString()}`
                  : jobposting.salary_min
                    ? `$${jobposting.salary_min.toLocaleString()}`
                    : jobposting.salary_max
                      ? `$${jobposting.salary_max.toLocaleString()}`
                      : "Salary not available"}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-end text-xs text-gray-500 mt-4">
          {formatDateOnly(jobposting.created_at)}
        </div>
      </CardContent>
    </Card>
  );
}
