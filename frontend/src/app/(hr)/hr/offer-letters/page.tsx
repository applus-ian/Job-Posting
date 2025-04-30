import { SidebarLayout } from "@/components/sidebar-layout";
import { OfferLetter, 
         columns , 
         OfferLetterStatus,
         OfferLetterAction,
} from "@/components/tables/offer-letter/OfferColumns";
import { OfferLetterTable } from "@/components/tables/offer-letter/OfferTable";
 
const statusActionsMap: Record<OfferLetterStatus, OfferLetterAction[]> = {
    Sent: [
      { label: "View Application", value: "view-application" },
      { label: "View Applicant Profile", value: "view-profile" },
      { label: "Edit Offer Letter", value: "edit-offer-letter" },
    ],
    Draft: [
        { label: "View Application", value: "view-application" },
        { label: "View Applicant Profile", value: "view-profile" },
        { label: "Edit Offer Letter", value: "edit-offer-letter" },
        { label: "Send Offer Letter", value: "send-offer-letter" },
    ],
  };

  async function getData(): Promise<OfferLetter[]> {
    const rawData = [
      {
        id: "1",
        name: "John Doe",
        job_applied: "Software Engineer",
        status: "Draft" as OfferLetterStatus,
        sent_at: "November 25, 2024",
        profile_picture: "/profile pictures/Profile.png",
      },
      {
        id: "2",
        name: "Jane Smith",
        job_applied: "Marketing Specialist",
        status: "Sent" as OfferLetterStatus,
        sent_at: "November 24, 2024",
      },
      {
        id: "3",
        name: "Michael Johnson",
        job_applied: "HR Generalist",
        status: "Draft" as OfferLetterStatus,
        sent_at: "November 23, 2024",
      },
      {
        id: "4",
        name: "Emily Davis",
        job_applied: "Customer Support Representative",
        status: "Draft" as OfferLetterStatus,
        sent_at: "November 22, 2024",
      },
      {
        id: "5",
        name: "Chris Brown",
        job_applied: "Project Manager",
        status: "Draft" as OfferLetterStatus,
        sent_at: "November 21, 2024",
      },
      {
        id: "6",
        name: "Samantha Green",
        job_applied: "UX Designer",
        status: "Sent" as OfferLetterStatus,
        sent_at: "November 20, 2024",
      },
      {
        id: "7",
        name: "Daniel Anderson",
        job_applied: "Business Analyst",
        status: "Sent" as OfferLetterStatus,
        sent_at: "November 19, 2024",
      },
      {
        id: "8",
        name: "Sophia Lee",
        job_applied: "Graphic Designer",
        status: "Draft" as OfferLetterStatus,
        sent_at: "November 18, 2024",
      },
    ];
  
    // Map each applicant and attach actions based on status
    return rawData.map((item) => ({
      ...item,
      actions: statusActionsMap[item.status],
    }));
  }
  
export default async function OfferLetterPage() {
  const data = await getData();

  return (
    <SidebarLayout>
      <div className="mb-3">
        <p className="text-2xl font-medium">Offer Letter</p>
        <p>Manage, schedule, and track interviews with applicants.</p>
      </div>
      <OfferLetterTable columns={columns} data={data} />
    </SidebarLayout>
  );
}
