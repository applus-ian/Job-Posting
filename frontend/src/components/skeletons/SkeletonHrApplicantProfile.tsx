import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonHrApplicantProfile() {
  return (
    <div className="flex flex-col items-start w-full">
      <div className="w-full mb-5">
        <Skeleton className="w-full lg:w-[20%] h-10 rounded-xl" />
      </div>
      <div className="w-full mb-5">
        <Skeleton className="w-full h-100 rounded-xl" />
      </div>
    </div>
  );
}
