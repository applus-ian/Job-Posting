import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UsersRound, UserPlus2, Clock, DollarSign, Book } from "lucide-react";
import { Bookmark } from "lucide-react";
import CustomBadge from "../job/CustomBadge";

interface Job {
  id: number;
  title: string;
  application: number;
  vacant: number;
  department: string;
  category: string;
  type: string;
  workSetup: string;
  salary: string;
  postedAt: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  tags: string[];
}

interface JobDetailProps {
  job: Job;
}

export default function JobDetail({ job }: JobDetailProps) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-1">
        <div className="flex flex-row items-start w-full gap-8">
          <div className="w-[80%]">
            <CardTitle className="text-lg">{job.title}</CardTitle>
          </div>
          <div className="w-auto flex flex-row gap-1">
            <Bookmark  className="w-8 h-8 text-primary mt-1" strokeWidth={1} />
            <Button className="md:w-auto">Apply Now</Button>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <CustomBadge label={job.workSetup} status="tag" />
          <CustomBadge label={job.type} status="tag" />
        </div>
        <div className="flex flex-wrap gap-4 mt-1 text-xs text-gray-500">
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
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold mb-2">Job Description</h3>
          <p className="text-sm">{job.description}</p>
        </div>

        <div>
          <h3 className="font-semibold text-sm mb-2">Responsibilities</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {job.responsibilities.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-sm mb-2">Tags</h3>
          {job.tags && job.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {job.tags.map((tag, index) => (
                <CustomBadge key={index} label={tag} status="tag" />
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
