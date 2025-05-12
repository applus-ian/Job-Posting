import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonBrowseJob() {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full mb-5">
        <Skeleton className="w-full h-45 lg:h-18 rounded-xl" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-4">
        <div className="flex flex-col gap-4">
          <Skeleton className="h-35 w-full rounded-xl" />
          <Skeleton className="h-35 w-full rounded-xl" />
          <Skeleton className="h-35 w-full rounded-xl" />
        </div>
        <Skeleton className="h-full w-full rounded-xl" />
      </div>
    </div>
  );
}
