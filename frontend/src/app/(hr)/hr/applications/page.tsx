import { SidebarLayout } from "@/components/sidebar-layout";
import { Applications, 
         columns , 
         ApplicationStatus,
         ApplicationAction,
} from "@/components/tables/applications/ApplicationsColumns";
import { ApplicationsTable } from "@/components/tables/applications/ApplicationsTable";
 
const statusActionsMap: Record<ApplicationStatus, ApplicationAction[]> = {
    Received: [
      { label: "View Application", value: "view-application" },
      { label: "View Profile", value: "view-profile" },
      { label: "Reject", value: "reject" },
    ],
    Reviewed: [
      { label: "View Application", value: "view-application" },
      { label: "View Profile", value: "view-profile" },
      { label: "Schedule Interview", value: "schedule-interview" },
      { label: "Reject", value: "reject" },
    ],
    Interview: [
      { label: "View Application", value: "view-application" },
      { label: "View Profile", value: "view-profile" },
      { label: "Submit Feedback", value: "submit-feedback" },
      { label: "Create Offer Letter", value: "create-offer" },
      { label: "Reschedule Interview", value: "reschedule-interview" },
    ],
    Offer: [
      { label: "View Application", value: "view-application" },
      { label: "View Profile", value: "view-profile" },
    ],
    Hired: [
      { label: "View Application", value: "view-application" },
      { label: "View Profile", value: "view-profile" },
    ],
    Withdrawn: [
      { label: "View Application", value: "view-application" },
      { label: "View Profile", value: "view-profile" },
    ],
    "No Show": [
    { label: "View Application", value: "view-application" },
    { label: "View Profile", value: "view-profile" },
    { label: "Reschedule Interview", value: "reschedule-interview" },
    ],
    Rejected: [
      { label: "View Application", value: "view-application" },
      { label: "View Profile", value: "view-profile" },
      { label: "View Reject Reason", value: "view-reject-reason" },
    ],
  };

  async function getData(): Promise<Applications[]> {
    const rawData = [
      {
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        job_applied: "Software Engineer",
        status: "Received" as ApplicationStatus,
        applied_date: "November 25, 2024",
        profile_picture: "/profile pictures/Profile.png",
      },
      {
        id: "2",
        name: "Jane Smith",
        email: "jane.smith@example.com",
        job_applied: "Marketing Specialist",
        status: "Reviewed" as ApplicationStatus,
        applied_date: "November 24, 2024",
      },
      {
        id: "3",
        name: "Michael Johnson",
        email: "michael.johnson@example.com",
        job_applied: "HR Generalist",
        status: "Interview" as ApplicationStatus,
        applied_date: "November 23, 2024",
      },
      {
        id: "4",
        name: "Emily Davis",
        email: "emily.davis@example.com",
        job_applied: "Customer Support Representative",
        status: "Offer" as ApplicationStatus,
        applied_date: "November 22, 2024",
      },
      {
        id: "5",
        name: "Chris Brown",
        email: "chris.brown@example.com",
        job_applied: "Project Manager",
        status: "Hired" as ApplicationStatus,
        applied_date: "November 21, 2024",
      },
      {
        id: "6",
        name: "Samantha Green",
        email: "samantha.green@example.com",
        job_applied: "UX Designer",
        status: "Withdrawn" as ApplicationStatus,
        applied_date: "November 20, 2024",
      },
      {
        id: "7",
        name: "Daniel Anderson",
        email: "daniel.anderson@example.com",
        job_applied: "Business Analyst",
        status: "No Show" as ApplicationStatus,
        applied_date: "November 19, 2024",
      },
      {
        id: "8",
        name: "Sophia Lee",
        email: "sophia.lee@example.com",
        job_applied: "Graphic Designer",
        status: "Rejected" as ApplicationStatus,
        applied_date: "November 18, 2024",
      },
    ];
  
    // Map each applicant and attach actions based on status
    return rawData.map((item) => ({
      ...item,
      actions: statusActionsMap[item.status],
    }));
  }
  
export default async function ApplicationsPage() {
  const data = await getData();

  return (
    <SidebarLayout>
      <div className="mb-3">
        <p className="text-2xl font-medium">All Applications</p>
        <p>View, filter, and manage all applicants in your hiring pipeline.</p>
      </div>
      <ApplicationsTable columns={columns} data={data} />
    </SidebarLayout>
  );
}
