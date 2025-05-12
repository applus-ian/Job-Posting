import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonProfile() {
  return (
    <div className="flex flex-col items-start w-full">
      <div className="w-full mb-5">
        <Skeleton className="w-62 h-10 rounded-xl" />
      </div>
      <div className="w-full mb-5">
        <Skeleton className="w-full h-10 rounded-xl" />
      </div>
      <div className="w-full flex justify-between mb-5">
        <Skeleton className="w-62 h-8 rounded-xl" />
        <Skeleton className="w-38 h-8 rounded-xl" />
      </div>
      <div className="w-full mb-5">
        <Skeleton className="w-full h-80 rounded-xl" />
      </div>
    </div>
  );
}
