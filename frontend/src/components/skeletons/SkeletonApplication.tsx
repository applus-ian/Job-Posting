import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonApplication() {
  return (
    <div className="flex flex-col items-start w-full">
      <div className="w-full mb-5">
        <Skeleton className="w-full lg:w-[40%] h-10 rounded-xl" />
      </div>
      <div className="w-full mb-5">
        <Skeleton className="w-full h-10 rounded-xl" />
      </div>
      <div className="w-full mb-5">
        <Skeleton className="w-48 h-10 rounded-xl" />
      </div>
      <div className="w-full mb-5">
        <Skeleton className="w-full h-80 rounded-xl" />
      </div>
    </div>
  );
}
