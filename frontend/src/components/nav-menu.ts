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
        isActive: pathname.startsWith("/dashboard"),
      },
      {
        title: "Browse Job",
        url: "/browse-jobs",
        icon: Search,
        isActive: pathname.startsWith("/browse-jobs"),
      },
      {
        title: "My Applications",
        url: "/my-applications",
        icon: Folder,
        isActive: pathname.startsWith("/my-applications"),
      },
      {
        title: "Saved Jobs",
        url: "/saved-jobs",
        icon: Bookmark,
        isActive: pathname.startsWith("/saved-jobs"),
      },
    ],
  };

  const hrMenu = {
    navMain: [
      {
        title: "Dashboard",
        url: "/hr/dashboard",
        icon: Home,
        isActive: pathname.startsWith("/hr/dashboard"),
      },
      {
        title: "Create Job Posting",
        url: "/hr/create-jobposting",
        icon: PlusCircle,
        isActive: pathname.startsWith("/hr/create-jobposting"),
      },
      {
        title: "Job Postings",
        url: "/hr/job-postings",
        icon: ClipboardList,
        isActive: pathname.startsWith("/hr/job-postings"),
      },
      {
        title: "Applications",
        url: "/hr/applications",
        icon: FileText,
        isActive: pathname.startsWith("/hr/applications"),
      },
      {
        title: "Interview Schedule",
        url: "/hr/interview-schedule",
        icon: CalendarClock,
        isActive: pathname.startsWith("/hr/interview-schedule"),
      },
      {
        title: "Shortlisted Applicants",
        url: "/hr/shortlisted-applicants",
        icon: LucideUserCheck,
        isActive: pathname.startsWith("/hr/shortlisted-applicants"),
      },
    ],
  };

  return { applicantMenu, hrMenu };
}
