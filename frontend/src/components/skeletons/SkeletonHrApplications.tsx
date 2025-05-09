import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonHrApplications() {
  return (
    <div className="flex flex-col items-start w-full">
        <div className="w-full mb-5">
            <Skeleton className="w-full lg:w-[20%] h-10 rounded-xl"/>
        </div>
        <div className="w-full mb-5 flex justify-end gap-3">
        <Skeleton className="w-[250px] h-10 rounded-xl"/>
            <Skeleton className="w-[100px] h-10 rounded-xl"/>
        </div>
        <div className="w-full mb-5">
            <Skeleton className="w-full h-80 rounded-xl"/>
        </div>
        
    </div>
  )
}
