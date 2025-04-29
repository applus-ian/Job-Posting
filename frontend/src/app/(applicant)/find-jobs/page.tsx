import HeaderNav from "@/components/homepage/HeaderNav";
import Footer from "@/components/homepage/Footer";
import JobSearchBar from "@/components/job/JobSearchBar";
import { JobBoard } from "@/components/job/JobBoard";

export default function FindJobPage() {
  return (
    <>
      <HeaderNav />
      <div className="bg-muted flex min-h-screen flex-col items-center justify-center gap-6 p-4 md:p-8">
        <div className="flex w-full flex-col gap-6">
          <JobSearchBar />
          <JobBoard />
        </div>
      </div>
      <Footer />
    </>
  );
}
