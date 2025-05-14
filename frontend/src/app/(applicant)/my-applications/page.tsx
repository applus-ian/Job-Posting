"use client";
import { SidebarLayout } from "@/components/sidebar-layout";
import JobSearchBar from "@/components/job/JobSearchBar";
import { ApplicationsTable } from "@/components/tables/applicant-applications/ApplicationsTable";
import {
  Application,
  useApplicationColumns,
} from "@/components/tables/applicant-applications/ApplicationsColumns";
import { useEffect, useState } from "react";

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

export default function MyApplicationPage() {
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
    <SidebarLayout>
      <div className="mb-3">
        <p className="text-2xl font-medium dark:text-white">My Applications</p>
      </div>
      <JobSearchBar />
      <ApplicationsTable columns={columns} data={data} />
    </SidebarLayout>
  );
}
