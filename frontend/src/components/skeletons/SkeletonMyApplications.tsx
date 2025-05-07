import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonMyApplications() {
  return (
    <div className="flex flex-col items-start w-full">
        <div className="w-full mb-5">
            <Skeleton className="w-50 h-10 rounded-xl"/>
        </div>
        <div className="w-full mb-5">
            <Skeleton className="w-full h-45 lg:h-18 rounded-xl"/>
        </div>
        <div className="w-full mb-5">
            <Skeleton className="w-full h-80 rounded-xl"/>
        </div>
        
    </div>
  )
}
