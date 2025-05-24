"use client";
import { SidebarLayout } from "@/components/sidebar-layout";
import { shortlistedColumn } from "@/components/tables/shortlisted-applicants/ShortlistedColumns";
import { ApplicantProfile } from "@/types/profile";
import { ShortlistedTable } from "@/components/tables/shortlisted-applicants/ShortlistedTable";
import { useState } from "react";

const sampleData: ApplicantProfile[] = [
  {
    id: 1,
    professional_title: "Software Engineer",
    first_name: "Juan",
    middle_name: "Santos",
    last_name: "Dela Cruz",
    suffix: "",
    sex: "male",
    date_of_birth: "1995-06-15",
    nationality: "Filipino",
    phone_number: "09171234567",
    created_at: "2024-08-01T10:00:00Z",
    updated_at: "2024-08-10T12:00:00Z",
    biography: "Experienced full-stack developer with a background in fintech.",
    user: {
      id: 1,
      email: "juan.delacruz@example.com",
      email_verified_at: "2024-08-01T12:00:00Z",
      profile: "/images/juan.jpg",
      google_id: null,
      facebook_id: null,
      created_at: "2024-07-01T08:00:00Z",
      updated_at: "2024-08-01T12:00:00Z",
    },
  },
  {
    id: 2,
    professional_title: "Graphic Designer",
    first_name: "Maria",
    last_name: "Reyes",
    sex: "female",
    date_of_birth: "1992-03-20",
    nationality: "Filipino",
    phone_number: "09981234567",
    created_at: "2024-07-25T15:00:00Z",
    updated_at: "2024-08-10T09:30:00Z",
    biography: "Creative designer specializing in branding and digital media.",
    user: {
      id: 2,
      email: "maria.reyes@example.com",
      email_verified_at: "2024-08-01T12:00:00Z",
      profile: "/images/juan.jpg",
      google_id: null,
      facebook_id: null,
      created_at: "2024-07-01T08:00:00Z",
      updated_at: "2024-08-01T12:00:00Z",
    },
  },
];

export default function ShortlistedApplicantPage() {
  const [openModal, setOpenModal] = useState(false);
  // modal actions
  const handleAction = (actionKey: string, applicant: ApplicantProfile) => {
    if (actionKey === "viewDetails") {
      setOpenModal(true);
    }
  };
  const { columns } = shortlistedColumn({ handleAction });

  return (
    <SidebarLayout breadcrumbs={[{ label: "Shortlisted Applicants", isCurrentPage: true }]}>
      <div className="mb-2">
        <p className="text-2xl font-medium">Shortlisted Applicants</p>
      </div>
      <ShortlistedTable columns={columns} data={sampleData} />
    </SidebarLayout>
  );
}
