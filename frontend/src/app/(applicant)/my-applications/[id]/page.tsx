"use client";
import { SidebarLayout } from "@/components/sidebar-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApplicationDetailCard } from "@/components/application/ApplicationDetailCard";
import { InterviewCard } from "@/components/application/InterviewCard";
import { FileIcon, Calendar } from "lucide-react";
import { useViewApplicationQuery } from "@/hooks/query/useViewApplicationQuery";

export default function Application() {
  const { data, isLoading, isError } = useViewApplicationQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong.</div>;

  const applicationStatus = data.application.status;
  const isBasicStatus = applicationStatus === "received" || applicationStatus === "reviewed";

  return (
    <SidebarLayout>
      <div className="flex">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Application for {data.jobposting.title}
          </h1>
        </div>
      </div>

      {isBasicStatus ? (
        // Show only the application card if status is 'received' or 'reviewed'
        <ApplicationDetailCard
          application={data.application}
          applicationstatus={data.application_status}
          jobposting={data.jobposting}
          documents={data.documents}
        />
      ) : (
        <Tabs defaultValue="application" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="application" className="flex items-center gap-2 text-gray-500">
              <FileIcon size={16} />
              <span className="hidden lg:flex">Application Details</span>
            </TabsTrigger>

            <TabsTrigger value="interview" className="flex items-center gap-2 text-gray-500">
              <Calendar size={16} />
              <span className="hidden lg:flex">Interview Details</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="application">
            <ApplicationDetailCard
              application={data.application}
              applicationstatus={data.application_status}
              jobposting={data.jobposting}
              documents={data.documents}
            />
          </TabsContent>
          <TabsContent value="interview">
            <InterviewCard interview={data.interview} />
          </TabsContent>
        </Tabs>
      )}
    </SidebarLayout>
  );
}
