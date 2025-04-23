import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PersonalInformation } from "@/components/profile/personal-information";
import { PersonalDocuments } from "@/components/profile/documents";
import { EducationalBackground } from "@/components/profile/educationalbackground";
import { WorkExperience } from "@/components/profile/workexperience";
import { User, FileText, GraduationCap, Briefcase } from "lucide-react";

export function Tablists() {
  const className = "px-3 py-2 text-sm font-normal text-gray-600 transition-colors data-[state=active]:bg-[#fce4d4] data-[state=active]:text-[#FF6900]";
  return (
    <div>
      <Tabs defaultValue="personal">
      <div className="bg-[#f8f4f4] mr-auto overflow-x-auto">
          <TabsList className="inline-flex gap-0 bg-transparent border-0 outline-none shadow-none">

            <TabsTrigger 
              value="personal" 
              className={className}
            >
              <User className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Personal Information</span>
            </TabsTrigger>
            <TabsTrigger 
              value="document" 
              className={className}
            >
              <FileText className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Documents</span>
            </TabsTrigger>
            <TabsTrigger 
              value="educational-background" 
              className={className}
            >
              <GraduationCap className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Educational Background</span>
            </TabsTrigger>
            <TabsTrigger 
              value="work-experience" 
              className={className}
            >
              <Briefcase className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Work Experience</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="personal" className="mt-6">
          <PersonalInformation />
        </TabsContent>

        <TabsContent value="document" className="mt-6">
          <PersonalDocuments/>
        </TabsContent>

        <TabsContent value="educational-background" className="mt-6">
          <EducationalBackground/>
        </TabsContent>

        <TabsContent value="work-experience" className="mt-6">
          <WorkExperience/>
        </TabsContent>
      </Tabs>
    </div>    
  );
}
