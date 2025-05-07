"use client";
import { SidebarLayout } from "@/components/sidebar-layout";
import { JobBoard } from "@/components/job/JobBoard";
import { SkeletonBrowseJob } from "@/components/skeletons/SkeletonBrowseJob";

export default function BrowseJobPage() {
  return (
    <SidebarLayout>
      <SkeletonBrowseJob/>
      <JobBoard />
    </SidebarLayout>
  );
}
