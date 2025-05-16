"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { MoreVertical } from "lucide-react";

// Sample job data
const recentJobs = [
  {
    id: 1,
    title: "UI/UX Designer",
    type: "Full Time",
    vacancies: 27,
    applications: 798,
  },
  {
    id: 2,
    title: "UI/UX Designer",
    type: "Full Time",
    vacancies: 27,
    applications: 798,
  },
];

export function RecentJobs() {
  return (
    <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xs font-medium">Recently Published Jobs</h3>
        <a href="#" className="text-[10px] text-gray-500 hover:text-gray-600 flex items-center">
          View all <span className="ml-1">→</span>
        </a>
      </div>

      {/* Table header */}
      <div className="grid grid-cols-12 gap-2 py-1.5 text-[10px] text-gray-500 border-b">
        <div className="col-span-1">
          <Checkbox className="h-3 w-3" />
        </div>
        <div className="col-span-5 font-medium">JOB</div>
        <div className="col-span-4 font-medium">APPLICATIONS</div>
        <div className="col-span-2 font-medium text-right">ACTIONS</div>
      </div>

      {/* Table rows */}
      {recentJobs.map((job) => (
        <div
          key={job.id}
          className="grid grid-cols-12 gap-2 py-2 border-b items-center hover:bg-gray-50"
        >
          <div className="col-span-1">
            <Checkbox className="h-3 w-3" />
          </div>
          <div className="col-span-5">
            <p className="text-[11px] font-medium">{job.title}</p>
            <div className="flex gap-1 items-center text-[10px] text-gray-500">
              <span>{job.type}</span>
              <span>•</span>
              <span>{job.vacancies} Vacant</span>
            </div>
          </div>
          <div className="col-span-4">
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <span className="text-[10px]">{job.applications} Applications</span>
            </div>
          </div>
          <div className="col-span-2 flex justify-end">
            <button className="text-gray-400 hover:text-gray-600">
              <MoreVertical className="h-3 w-3" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
