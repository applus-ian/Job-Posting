"use client";

import { SidebarLayout } from "@/components/sidebar-layout";
import { StatCard } from "@/components/dashboard/StatCard";
import { ApplicationChart } from "@/components/dashboard/ApplicationChart";
import { InterviewCalendar } from "@/components/dashboard/InterviewCalendar";
import { RecentJobs } from "@/components/dashboard/RecentJob";
import { Briefcase, UserRound, CalendarDays } from "lucide-react";

export default function HRDashboardPage() {
  return (
    <SidebarLayout breadcrumbs={[{ label: "Dashboard", isCurrentPage: true }]}>
      <div className="space-y-4">
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard icon={Briefcase} title="Active Job Postings" value="560" percentChange={12} />
          <StatCard icon={UserRound} title="Applicants in Review" value="100" percentChange={12} />
          <StatCard
            icon={CalendarDays}
            title="Scheduled Interviews"
            value="10"
            percentChange={12}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-4">
            <ApplicationChart />
            <RecentJobs />
          </div>
          <div className="md:col-span-1">
            <InterviewCalendar />
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
