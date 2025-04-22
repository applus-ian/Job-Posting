import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, MapPin, Clock, DollarSign } from "lucide-react";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
}

interface JobDetailProps {
  job: Job;
}

export default function JobDetail({ job }: JobDetailProps) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl">{job.title}</CardTitle>
        <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
          <div className="flex items-center">
            <Building className="h-4 w-4 mr-1" />
            <span>{job.company}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{job.type}</span>
          </div>
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 mr-1" />
            <span>{job.salary}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-medium text-lg mb-2">Job Description</h3>
          <p className="text-gray-700">{job.description}</p>
        </div>

        <div>
          <h3 className="font-medium text-lg mb-2">Responsibilities</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            {job.responsibilities.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-medium text-lg mb-2">Requirements</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            {job.requirements.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <Button className="w-full md:w-auto mt-4">Apply Now</Button>
      </CardContent>
    </Card>
  );
}
