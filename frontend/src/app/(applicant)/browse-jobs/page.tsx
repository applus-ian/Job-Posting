"use client";
import { SidebarLayout } from "@/components/sidebar-layout";
import { JobBoard } from "@/components/job/JobBoard";
import JobSearchBar from "@/components/job/JobSearchBar";
import { SkeletonBrowseJob } from "@/components/skeletons/SkeletonBrowseJob";

export default function BrowseJobPage() {
  return (
    <SidebarLayout>
      <SkeletonBrowseJob/>
      <JobSearchBar />
      <JobBoard />
    </SidebarLayout>
  );
}
