import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonDashboard() {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full mb-12">
        <Skeleton className="w-full h-40 md:h-30 rounded-xl"/>
      </div>
      <div className="flex justify-between items-end w-full mb-5">
        <Skeleton className="h-6 w-40"/>
        <Skeleton className="h-6 w-20" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-4">
        <Skeleton className="h-35 w-full rounded-xl"/>
        <Skeleton className="h-35 w-full rounded-xl" />
        <Skeleton className="h-35 w-full rounded-xl"/>
      </div>

    </div>
  )
}
