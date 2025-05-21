import { SidebarLayout } from "@/components/sidebar-layout";
import { JobPosting, columns } from "@/components/tables/job/JobColumns";
import { JobTable } from "@/components/tables/job/JobTable";

async function getData(): Promise<JobPosting[]> {
  return [
    {
      id: "1",
      title: "Software Engineer",
      category: "IT & Software",
      department: "Engineering",
      vacancies: 3,
      salary_min: 35000,
      salary_max: 50000,
      status: "open",
      applicants: 15,
      employment_type: "Full-time",
      employment_level: "Mid-Level",
      work_setup: "Hybrid",
    },
    {
      id: "2",
      title: "Marketing Specialist",
      category: "Marketing",
      department: "Marketing",
      vacancies: 2,
      salary_min: 28000,
      salary_max: 40000,
      status: "open",
      applicants: 8,
      employment_type: "Part-time",
      employment_level: "Entry-Level",
      work_setup: "Remote",
    },
    {
      id: "3",
      title: "HR Generalist",
      category: "Human Resources",
      department: "HR",
      vacancies: 1,
      salary_min: 30000,
      salary_max: 37000,
      status: "draft",
      applicants: 0,
      employment_type: "Full-time",
      employment_level: "Mid-Level",
      work_setup: "On-site",
    },
    {
      id: "4",
      title: "Customer Support Representative",
      category: "Customer Service",
      department: "Support",
      vacancies: 5,
      salary_min: 20000,
      salary_max: 26000,
      status: "open",
      applicants: 22,
      employment_type: "Contract",
      employment_level: "Entry-Level",
      work_setup: "Remote",
    },
    {
      id: "5",
      title: "Project Manager",
      category: "Management",
      department: "Operations",
      vacancies: 1,
      salary_min: 50000,
      salary_max: 65000,
      status: "closed",
      applicants: 12,
      employment_type: "Full-time",
      employment_level: "Senior-Level",
      work_setup: "On-site",
    },
  ];
}

export default async function JobPostingPage() {
  const data = await getData();

  return (
    <SidebarLayout breadcrumbs={[{ label: "Job Postings", isCurrentPage: true }]}>
      <div className="mb-2">
        <p className="text-2xl font-medium">All Job Postings</p>
      </div>
      <JobTable columns={columns} data={data} />
    </SidebarLayout>
  );
}
