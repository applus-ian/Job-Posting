"use client";
import { SidebarLayout } from "@/components/sidebar-layout";
import { AllApplication } from "@/components/tables/all-applications/AllApplicationColumns";
import { AllApplicationTable } from "@/components/tables/all-applications/AllApplicationTable";
import { useAllApplicationColumns } from "@/components/tables/all-applications/AllApplicationColumns";
import { useEffect, useState } from "react";

async function getData(): Promise<AllApplication[]> {
  return [
    {
      id: "A001",
      job: {
        id: "J001",
        title: "Software Engineer",
        category: "IT & Software",
        department: "Engineering",
        vacancies: 3,
        salary_min: 35000,
        salary_max: 50000,
        employment_type: "Full-time",
        employment_level: "Mid-Level",
        work_setup: "Hybrid",
      },
      applicant: {
        id: "U101",
        first_name: "Donna",
        middle_name: "May",
        last_name: "Alcos",
        email: "donnamay.alcos@gmail.com",
        phone: "09171234567",
        expected_salary: 45000,
      },
      status: "received",
      applied_date: "April 29, 2025",
    },
    {
      id: "A002",
      job: {
        id: "J002",
        title: "Marketing Specialist",
        category: "Marketing",
        department: "Marketing",
        vacancies: 2,
        salary_min: 28000,
        salary_max: 40000,
        employment_type: "Part-time",
        employment_level: "Entry-Level",
        work_setup: "Remote",
      },
      applicant: {
        id: "U102",
        first_name: "Sayde",
        middle_name: "Marie",
        last_name: "Elegino",
        email: "saydemarie.elegino@gmail.com",
        phone: "09181234567",
        expected_salary: 35000,
      },
      status: "reviewed",
      applied_date: "April 28, 2025",
    },
    {
      id: "A003",
      job: {
        id: "J003",
        title: "Project Manager",
        category: "Management",
        department: "Operations",
        vacancies: 1,
        salary_min: 50000,
        salary_max: 65000,
        employment_type: "Full-time",
        employment_level: "Senior-Level",
        work_setup: "On-site",
      },
      applicant: {
        id: "U103",
        first_name: "Shiela",
        middle_name: "Marie",
        last_name: "Arcillo",
        email: "shielamarie.elegino@gmail.com",
        phone: "09191234567",
        expected_salary: 60000,
      },
      status: "interview",
      applied_date: "April 25, 2025",
    },
    {
      id: "A004",
      job: {
        id: "J004",
        title: "Marketing Specialist",
        category: "Marketing",
        department: "Marketing",
        vacancies: 2,
        salary_min: 28000,
        salary_max: 40000,
        employment_type: "Part-time",
        employment_level: "Entry-Level",
        work_setup: "Remote",
      },
      applicant: {
        id: "U104",
        first_name: "Mike",
        middle_name: "Arthur",
        last_name: "Minoza",
        email: "mikearthur.minoza@gmail.com",
        phone: "09181234567",
        expected_salary: 35000,
      },
      status: "offered",
      applied_date: "April 28, 2025",
    },
    {
      id: "A006",
      job: {
        id: "J006",
        title: "Marketing Specialist",
        category: "Marketing",
        department: "Marketing",
        vacancies: 2,
        salary_min: 28000,
        salary_max: 40000,
        employment_type: "Part-time",
        employment_level: "Entry-Level",
        work_setup: "Remote",
      },
      applicant: {
        id: "U106",
        first_name: "Cherry",
        middle_name: "Ann",
        last_name: "Deloy",
        email: "cherryann.deloy@gmail.com",
        phone: "09181234566",
        expected_salary: 35000,
      },
      status: "hired",
      applied_date: "April 28, 2025",
    },
    {
      id: "A007",
      job: {
        id: "J007",
        title: "Marketing Specialist",
        category: "Marketing",
        department: "Marketing",
        vacancies: 2,
        salary_min: 28000,
        salary_max: 40000,
        employment_type: "Part-time",
        employment_level: "Entry-Level",
        work_setup: "Remote",
      },
      applicant: {
        id: "U107",
        first_name: "Valey",
        middle_name: "Austine",
        last_name: "Senoy",
        email: "valeyaustine.senoy@gmail.com",
        phone: "09181234567",
        expected_salary: 35000,
      },
      status: "rejected",
      applied_date: "April 28, 2025",
    },
  ];
}

export default function AllApplicationPage() {
  const columns = useAllApplicationColumns();
  const [data, setData] = useState<AllApplication[]>([]);

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
        <p className="text-2xl font-medium">All Applications</p>
      </div>
      <AllApplicationTable columns={columns} data={data} />
    </SidebarLayout>
  );
}
