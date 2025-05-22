import { SidebarLayout } from "@/components/sidebar-layout";

export default async function ShortlistedApplicantPage() {
  return (
    <SidebarLayout breadcrumbs={[{ label: "Shortlisted Applicants", isCurrentPage: true }]}>
      <div className="mb-2">
        <p className="text-2xl font-medium">Shortlisted Applicants</p>
      </div>
    </SidebarLayout>
  );
}
