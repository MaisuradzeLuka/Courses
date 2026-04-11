import { Skeleton } from "@/components/ui/skeleton";

function CatalogCourseCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
      <Skeleton className="bg-gray-300 h-45 w-full rounded-xl" />
      <div className="flex justify-between">
        <Skeleton className="bg-gray-300 h-3 w-32" />
        <Skeleton className="bg-gray-300 h-3 w-12" />
      </div>
      <Skeleton className="bg-gray-300 h-7 w-full" />
      <Skeleton className="bg-gray-300 h-8 w-24 rounded-full" />
      <div className="flex justify-between pt-2">
        <Skeleton className="bg-gray-300 h-4 w-20" />
        <Skeleton className="bg-gray-300 h-6 w-16" />
      </div>
    </div>
  );
}

export function CourseCatalogSkeleton() {
  return (
    <section className="col-span-9">
      <div className="mb-8 mt-2 flex items-end justify-between">
        <Skeleton className="bg-gray-300 h-5 w-52" />
        <Skeleton className="bg-gray-300 h-9 w-36 rounded-lg" />
      </div>
      <div className="grid grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <CatalogCourseCardSkeleton key={i} />
        ))}
      </div>
      <div className="mt-10 flex justify-center gap-2">
        <Skeleton className="bg-gray-300 h-10 w-10 rounded-md" />
        <Skeleton className="bg-gray-300 h-10 w-10 rounded-md" />
        <Skeleton className="bg-gray-300 h-10 w-10 rounded-md" />
      </div>
    </section>
  );
}
