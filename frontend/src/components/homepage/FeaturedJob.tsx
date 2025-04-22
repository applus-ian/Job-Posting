import Link from "next/link";
import { ArrowRight } from "lucide-react";
import JobCard from "./JobCard";
 
export default function FeaturedJob() {
  return (
    <section className="w-full h-auto py-14 px-8 mb-5">
      <div className="max-w-7xl mx-auto flex items-center justify-between mb-2">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-gray-800">
          Featured Jobs
        </h2>
        <Link href={"/browse-jobs"}>
          <span className="flex items-center gap-2 text-sm">
            View All <ArrowRight size={18} />
          </span>
        </Link>
      </div>
      <div className="max-w-7xl mx-auto">
        <JobCard />
        <JobCard />
        <JobCard />
      </div>
    </section>
  );
}