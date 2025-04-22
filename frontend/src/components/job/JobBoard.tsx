"use client";

import { useState } from "react";
import JobList from "./JobList";
import JobDetail from "./JobDetail";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// Sample job data
const jobsData = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120,000 - $150,000",
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
    company: "Creative Solutions",
    location: "New York, NY",
    type: "Full-time",
    salary: "$90,000 - $120,000",
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
    company: "DataSystems",
    location: "Remote",
    type: "Contract",
    salary: "$80 - $100 per hour",
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
    company: "InnovateTech",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$110,000 - $140,000",
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
    company: "CloudTech Solutions",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$130,000 - $160,000",
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
  const isMobile = useIsMobile();

  const handleSelectJob = (job) => {
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
