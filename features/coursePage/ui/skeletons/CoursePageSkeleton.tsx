import { Skeleton } from "@/components/ui/skeleton";

export function CoursePageSkeleton() {
  return (
    <>
      <Skeleton className="bg-gray-300 mb-6 h-12 w-2/3 max-w-2xl" />
      <div className="grid grid-cols-8 gap-33">
        <div className="col-span-5 space-y-4">
          <Skeleton className="bg-gray-300 h-117 w-full rounded-[10px]" />
          <div className="flex justify-between">
            <Skeleton className="bg-gray-300 h-4 w-36" />
            <Skeleton className="bg-gray-300 h-4 w-28" />
          </div>
          <Skeleton className="bg-gray-300 h-12 w-56 rounded-full" />
          <div className="space-y-3 pt-2">
            <Skeleton className="bg-gray-300 h-6 w-48" />
            <Skeleton className="bg-gray-300 h-4 w-full" />
            <Skeleton className="bg-gray-300 h-4 w-full" />
            <Skeleton className="bg-gray-300 h-4 w-4/5" />
          </div>
        </div>
        <div className="col-span-3 space-y-4">
          <Skeleton className="bg-gray-300 h-10 w-full rounded-lg" />
          <Skeleton className="bg-gray-300 h-64 w-full rounded-xl" />
          <Skeleton className="bg-gray-300 h-12 w-full rounded-lg" />
        </div>
      </div>
    </>
  );
}
