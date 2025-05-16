import { usePathname } from "next/navigation";
import {
  Bookmark,
  Folder,
  Home,
  Search,
  PlusCircle,
  ClipboardList,
  FileText,
  CalendarClock,
  LucideUserCheck,
} from "lucide-react";

export function NavMenu() {
  const pathname = usePathname();

  const applicantMenu = {
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: Home,
        isActive: pathname === "/dashboard",
      },
      {
        title: "Browse Job",
        url: "/browse-jobs",
        icon: Search,
        isActive: pathname === "/browse-jobs",
      },
      {
        title: "My Applications",
        url: "/my-applications",
        icon: Folder,
        isActive: pathname === "/my-applications",
      },
      {
        title: "Saved Jobs",
        url: "/saved-jobs",
        icon: Bookmark,
        isActive: pathname === "/saved-jobs",
      },
    ],
  };

  const hrMenu = {
    navMain: [
      {
        title: "Dashboard",
        url: "/hr/dashboard",
        icon: Home,
        isActive: pathname === "/hr/dashboard",
      },
      {
        title: "Create Job Posting",
        url: "/hr/create-jobposting",
        icon: PlusCircle,
        isActive: pathname === "/hr/create-jobposting",
      },
      {
        title: "Job Postings",
        url: "/hr/job-postings",
        icon: ClipboardList,
        isActive: pathname === "/hr/job-postings",
      },
      {
        title: "Applications",
        url: "/hr/applications",
        icon: FileText,
        isActive: pathname === "/hr/applications",
      },
      {
        title: "Interview Schedule",
        url: "/hr/interview-schedule",
        icon: CalendarClock,
        isActive: pathname === "/hr/interview-schedule",
      },
      {
        title: "Shortlisted Applicants",
        url: "/hr/shortlisted-applicants",
        icon: LucideUserCheck,
        isActive: pathname === "/hr/shortlisted-applicants",
      },
    ],
  };

  return { applicantMenu, hrMenu };
}
