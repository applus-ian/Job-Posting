import { SidebarLayout } from "@/components/sidebar-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PersonalInfoCard } from "@/components/profile/PersonalInfoCard";
import { DocumentCard } from "@/components/profile/DocumentCard";
import { EducationCard } from "@/components/profile/EducationCard";
import { WorkExperienceCard } from "@/components/profile/WorkExperienceCard";
import { User, FileText, GraduationCap, Briefcase } from "lucide-react";
export default function ApplicantProfilePage() {
  return (
    <SidebarLayout>
      <div className="flex">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Applicant Profile</h1>
        </div>
      </div>
      <Tabs defaultValue="personalinfo" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personalinfo" className="flex items-center gap-2 text-gray-500">
            <User size={16} />
            <span className="hidden lg:flex">Personal Info</span>
          </TabsTrigger>

          <TabsTrigger value="documents" className="flex items-center gap-2 text-gray-500">
            <FileText size={16} />
            <span className="hidden lg:flex">Documents</span>
          </TabsTrigger>

          <TabsTrigger value="workexperience" className="flex items-center gap-2 text-gray-500">
            <Briefcase size={16} />
            <span className="hidden lg:flex">Work Experience</span>
          </TabsTrigger>

          <TabsTrigger value="education" className="flex items-center gap-2 text-gray-500">
            <GraduationCap size={16} />
            <span className="hidden lg:flex">Education</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="personalinfo">
          <PersonalInfoCard />
        </TabsContent>
        <TabsContent value="documents">
          <DocumentCard />
        </TabsContent>
        <TabsContent value="workexperience">
          <WorkExperienceCard />
        </TabsContent>
        <TabsContent value="education">
          <EducationCard />
        </TabsContent>
      </Tabs>
    </SidebarLayout>
  );
}
