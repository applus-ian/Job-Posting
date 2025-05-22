"use client";
import { DocumentCard } from "@/components/application/DocumentCard";
import { ApplicationsTable } from "@/components/tables/applicant-applications/ApplicationsTable";
import { SidebarLayout } from "@/components/sidebar-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, FileText, Briefcase, Bookmark } from "lucide-react";
import { useApplicationColumns } from "@/components/tables/applicant-applications/ApplicationsColumns";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { ViewApplicantCard } from "@/components/applicant/ViewApplicantCard";
import { useViewApplicantQuery } from "@/hooks/query/useViewApplicantQuery";
import { SkeletonHrApplicantProfile } from "@/components/skeletons/SkeletonHrApplicantProfile";
import { formatFullName } from "@/utils/formatFullName";

export default function ViewApplicantPage() {
  const viewApplicationType = "hr";
  const columns = useApplicationColumns(viewApplicationType);
  const { data, isLoading } = useViewApplicantQuery();

  if (isLoading || !data) {
    return (
      <SidebarLayout
        breadcrumbs={[
          { label: "Applications", href: "/hr/applications" },
          { label: "Loading...", isCurrentPage: true },
        ]}
      >
        <SkeletonHrApplicantProfile />
      </SidebarLayout>
    );
  }

  const fullName = formatFullName(
    data.applicant.first_name,
    data.applicant.middle_name,
    data.applicant.last_name,
    data.applicant.suffix
  );
  const profileBaseUrl = "http://localhost:8000/storage/profile/";
  const profilePath = data.applicant.user.profile ?? "";
  const profileUrl = profilePath ? `${profileBaseUrl}${profilePath}` : "";

  return (
    <SidebarLayout
      breadcrumbs={[
        { label: "Applications", href: "/hr/applications" },
        {
          label: fullName,
          isCurrentPage: true,
        },
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
                <AvatarImage src={profileUrl} alt="@shadcn" className="rounded-full object-cover" />
                <AvatarFallback className="bg-muted">
                  <User className="rounded-lg text-muted-foreground" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h6 className="text-lg font-semibold">{fullName}</h6>
                <p className="text-sm ">{data.applicant.professional_title}</p>
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
              <ViewApplicantCard applicant={data.applicant} />
            </TabsContent>
            <TabsContent value="application">
              <div className="mt-4">
                <ApplicationsTable columns={columns} data={data.applications ?? []} />
              </div>
            </TabsContent>
            <TabsContent value="documents">
              <div className="mt-4">
                <DocumentCard documents={data.documents} />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </SidebarLayout>
  );
}
