import { Skeleton } from "@/components/ui/skeleton";

function FeaturedCourseItemSkeleton() {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
      <Skeleton className="bg-gray-300 h-65 w-full rounded-[10px]" />
      <div className="flex justify-between">
        <Skeleton className="bg-gray-300 h-3 w-40" />
        <Skeleton className="bg-gray-300 h-3 w-10" />
      </div>
      <Skeleton className="bg-gray-300 h-8 w-full" />
      <Skeleton className="bg-gray-300 h-12 w-full" />
      <div className="flex justify-between pt-2">
        <Skeleton className="bg-gray-300 h-4 w-24" />
        <Skeleton className="bg-gray-300 h-8 w-20 rounded-lg" />
      </div>
    </div>
  );
}

export function FeaturedCoursesSkeleton() {
  return (
    <section>
      <div className="mb-8 space-y-3">
        <Skeleton className="bg-gray-300 h-12 w-80 max-w-full" />
        <Skeleton className="bg-gray-300 h-5 w-[28rem] max-w-full" />
      </div>
      <div className="grid grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <FeaturedCourseItemSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}
