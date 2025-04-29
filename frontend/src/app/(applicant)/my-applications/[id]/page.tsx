import { SidebarLayout } from "@/components/sidebar-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApplicationDetailCard } from "@/components/application/ApplicationDetailCard";
import { InterviewCard } from "@/components/application/InterviewCard";
import { OfferCard } from "@/components/application/OfferCard";
import { FileIcon, Calendar, LucideMail } from "lucide-react";
import CustomBadge from "@/components/badges/CustomBadge";

export default function Application() {
  return (
    <SidebarLayout>
      <div className="flex">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Application for Front-End Developer</h1>
          <CustomBadge label="Hired" status="success" />
        </div>
      </div>
      <Tabs defaultValue="application" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="application" className="flex items-center gap-2 text-gray-500">
            <FileIcon size={16} />
            <span className="hidden lg:flex">Application Details</span>
          </TabsTrigger>

          <TabsTrigger value="interview" className="flex items-center gap-2 text-gray-500">
            <Calendar size={16} />
            <span className="hidden lg:flex">Interview Details</span>
          </TabsTrigger>

          <TabsTrigger value="offer" className="flex items-center gap-2 text-gray-500">
            <LucideMail size={16} />
            <span className="hidden lg:flex">Offer Letter</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="application">
          <ApplicationDetailCard />
        </TabsContent>
        <TabsContent value="interview">
          <InterviewCard />
        </TabsContent>
        <TabsContent value="offer">
          <OfferCard />
        </TabsContent>
      </Tabs>
    </SidebarLayout>
  );
}
