"use client";
import { DocumentCard } from "@/components/application/DocumentCard";
import { ApplicationsTable } from "@/components/tables/applicant-applications/ApplicationsTable";
import { SidebarLayout } from "@/components/sidebar-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, FileText, Briefcase, Bookmark } from "lucide-react";
import {
  Application,
  useApplicationColumns,
} from "@/components/tables/applicant-applications/ApplicationsColumns";
import { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { ViewApplicantCard } from "@/components/applicant/ViewApplicantCard";

async function getData(): Promise<Application[]> {
  return [
    {
      id: "1",
      title: "Software Engineer",
      category: "IT & Software",
      department: "Engineering",
      vacancies: 3,
      salary_min: 35000,
      salary_max: 50000,
      status: "submitted",
      applicants: 15,
      employment_type: "Full-time",
      employment_level: "Mid-Level",
      work_setup: "Hybrid",
      applied_date: "April 29, 2025",
    },
    {
      id: "2",
      title: "Marketing Specialist",
      category: "Marketing",
      department: "Marketing",
      vacancies: 2,
      salary_min: 28000,
      salary_max: 40000,
      status: "interview",
      applicants: 8,
      employment_type: "Part-time",
      employment_level: "Entry-Level",
      work_setup: "Remote",
      applied_date: "April 28, 2025",
    },
    {
      id: "3",
      title: "HR Generalist",
      category: "Human Resources",
      department: "HR",
      vacancies: 1,
      salary_min: 30000,
      salary_max: 37000,
      status: "withdrawn",
      applicants: 0,
      employment_type: "Full-time",
      employment_level: "Mid-Level",
      work_setup: "On-site",
      applied_date: "April 27, 2025",
    },
    {
      id: "4",
      title: "Customer Support Representative",
      category: "Customer Service",
      department: "Support",
      vacancies: 5,
      salary_min: 20000,
      salary_max: 26000,
      status: "offered",
      applicants: 22,
      employment_type: "Contract",
      employment_level: "Entry-Level",
      work_setup: "Remote",
      applied_date: "April 26, 2025",
    },
    {
      id: "5",
      title: "Project Manager",
      category: "Management",
      department: "Operations",
      vacancies: 1,
      salary_min: 50000,
      salary_max: 65000,
      status: "hired",
      applicants: 12,
      employment_type: "Full-time",
      employment_level: "Senior-Level",
      work_setup: "On-site",
      applied_date: "April 25, 2025",
    },
  ];
}

export default function ViewApplicantPage() {
  const columns = useApplicationColumns();
  const [data, setData] = useState<Application[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setData(data);
    };

    fetchData();
  }, []);
  return (
    <SidebarLayout
      breadcrumbs={[
        { label: "Applications", href: "/hr/applications" },
        { label: "Mike Arthur Minoza", isCurrentPage: true },
      ]}
    >
      <div className="flex">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Applicant Profile</h1>
        </div>
      </div>
      <Card>
        <CardContent>
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="w-16 h-16 rounded-full">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                  className="rounded-full object-cover"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <h6 className="text-lg font-semibold">John Doe</h6>
                <p className="text-sm ">Software Engineer</p>
              </div>
            </div>
            <Bookmark className="w-8 h-8 text-primary mt-1" strokeWidth={1} />
          </div>

          <Tabs defaultValue="applicantdetails" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger
                value="applicantdetails"
                className="flex items-center gap-2 text-gray-500"
              >
                <User size={16} />
                <span className="hidden lg:flex">Applicant Details</span>
              </TabsTrigger>

              <TabsTrigger value="application" className="flex items-center gap-2 text-gray-500">
                <Briefcase size={16} />
                <span className="hidden lg:flex">Applications</span>
              </TabsTrigger>

              <TabsTrigger value="documents" className="flex items-center gap-2 text-gray-500">
                <FileText size={16} />
                <span className="hidden lg:flex">Documents</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="applicantdetails">
              <ViewApplicantCard />
            </TabsContent>
            <TabsContent value="application">
              <div className="mt-4">
                <ApplicationsTable columns={columns} data={data} />
              </div>
            </TabsContent>
            <TabsContent value="documents">
              <div className="mt-4">
                <DocumentCard />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </SidebarLayout>
  );
}
