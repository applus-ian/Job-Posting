"use client";

import { useState } from "react";
import JobList from "./JobList";
import JobDetail from "./JobDetail";
import { useJobBoardMobile } from "@/hooks/use-jobboard-mobile";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// Define Job interface
interface Job {
  id: number;
  title: string;
  application: number;
  vacant: number;
  department: string;
  category: string;
  type: string;
  workSetup: string;
  salary: string;
  postedAt: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  tags: string[];
}

// Sample job data
const jobsData: Job[] = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    application: 12,
    vacant: 1,
    department: "IT Department",
    category: "Programmer",
    type: "Full-time",
    workSetup: "Onsite",
    salary: "$120,000 - $150,000",
    postedAt: "1d",
    tags: ["React", "JavaScript", "CSS", "Frontend"],
    description: "We're looking for an experienced Frontend Developer to join our team.",
    responsibilities: [
      "Develop and maintain responsive web applications",
      "Collaborate with designers and backend developers",
      "Optimize applications for maximum speed and scalability",
      "Write clean, maintainable code with proper documentation",
    ],
    requirements: [
      "5+ years of experience with React.js",
      "Strong knowledge of JavaScript, HTML5, and CSS3",
      "Experience with state management libraries (Redux, MobX)",
      "Familiarity with modern frontend build pipelines and tools",
    ],
  },
  {
    id: 2,
    title: "UX/UI Designer",
    application: 3,
    vacant: 5,
    department: "Design Department",
    category: "Designer",
    type: "Full-time",
    workSetup: "Hybrid",
    salary: "$90,000 - $120,000",
    postedAt: "10m",
    tags: ["Figma", "Wireframes", "User Research", "Prototyping"],
    description: "Join our design team to create beautiful and intuitive user experiences.",
    responsibilities: [
      "Create user-centered designs by understanding business requirements",
      "Create user flows, wireframes, prototypes and mockups",
      "Conduct user research and evaluate user feedback",
      "Collaborate with cross-functional teams",
    ],
    requirements: [
      "3+ years of experience in UX/UI design",
      "Proficiency in design tools (Figma, Sketch, Adobe XD)",
      "Portfolio demonstrating strong visual design skills",
      "Understanding of user research methodologies",
    ],
  },
  {
    id: 3,
    title: "Backend Developer",
    application: 5,
    vacant: 2,
    department: "IT Department",
    category: "Backend Developer",
    type: "Contract",
    workSetup: "Remote",
    salary: "$80 - $100 per hour",
    postedAt: "10d",
    tags: ["Node.js", "Databases", "APIs", "Cloud"],
    description: "We need a skilled Backend Developer to help build our data processing systems.",
    responsibilities: [
      "Design and implement scalable backend services",
      "Optimize database queries and data structures",
      "Integrate with third-party services and APIs",
      "Ensure security and performance of backend systems",
    ],
    requirements: [
      "4+ years of experience with Node.js or Python",
      "Strong knowledge of database systems (SQL and NoSQL)",
      "Experience with cloud platforms (AWS, GCP, Azure)",
      "Understanding of microservices architecture",
    ],
  },
  {
    id: 4,
    title: "Product Manager",
    application: 21,
    vacant: 5,
    department: "Product Department",
    category: "Manager",
    type: "Full-time",
    workSetup: "Onsite",
    salary: "$110,000 - $140,000",
    postedAt: "30m",
    tags: ["Agile", "Roadmaps", "Leadership", "Strategy"],
    description: "Lead our product development efforts and drive innovation.",
    responsibilities: [
      "Define product vision, strategy, and roadmap",
      "Gather and prioritize product requirements",
      "Work closely with engineering, design, and marketing teams",
      "Analyze market trends and competitive landscape",
    ],
    requirements: [
      "3+ years of experience in product management",
      "Strong analytical and problem-solving skills",
      "Excellent communication and leadership abilities",
      "Technical background preferred",
    ],
  },
  {
    id: 5,
    title: "DevOps Engineer",
    application: 44,
    vacant: 8,
    department: "Engineering",
    category: "DevOps",
    type: "Full-time",
    workSetup: "Hybrid",
    salary: "$130,000 - $160,000",
    postedAt: "1d",
    tags: ["AWS", "Kubernetes", "CI/CD", "Monitoring"],
    description: "Help us build and maintain our cloud infrastructure and deployment pipelines.",
    responsibilities: [
      "Design and implement CI/CD pipelines",
      "Manage cloud infrastructure using IaC tools",
      "Monitor system performance and troubleshoot issues",
      "Implement security best practices",
    ],
    requirements: [
      "4+ years of experience in DevOps or SRE roles",
      "Strong knowledge of cloud platforms (AWS, GCP, Azure)",
      "Experience with containerization and orchestration (Docker, Kubernetes)",
      "Proficiency in scripting languages (Python, Bash)",
    ],
  },
];

export function JobBoard() {
  const [selectedJob, setSelectedJob] = useState(jobsData[0]);
  const [showDetail, setShowDetail] = useState(false);
  const isMobile = useJobBoardMobile();

  const handleSelectJob = (job: Job) => {
    setSelectedJob(job);
    if (isMobile) {
      setShowDetail(true);
    }
  };

  const handleBackToList = () => {
    setShowDetail(false);
  };

  if (isMobile && showDetail) {
    return (
      <div className="w-full">
        <Button variant="ghost" onClick={handleBackToList} className="mb-4 flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to jobs
        </Button>
        <JobDetail job={selectedJob} />
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="w-full lg:w-2/5">
        <JobList jobs={jobsData} onSelectJob={handleSelectJob} selectedJobId={selectedJob.id} />
      </div>
      <div className="w-full lg:w-3/5 hidden lg:block">
        <JobDetail job={selectedJob} />
      </div>
    </div>
  );
}
