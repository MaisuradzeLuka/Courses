import { Skeleton } from "@/components/ui/skeleton";

export function ContinueLearningSkeleton() {
  return (
    <section>
      <div className="flex items-end justify-between pb-8">
        <div className="space-y-2">
          <Skeleton className="bg-gray-300 h-12 w-72 max-w-full" />
          <Skeleton className="bg-gray-300 h-5 w-48" />
        </div>
        <Skeleton className="bg-gray-300 h-7 w-24" />
      </div>
      <div className="grid grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4"
          >
            <div className="flex gap-4">
              <Skeleton className="bg-gray-300 h-31 w-35 shrink-0 rounded-xl" />
              <div className="min-w-0 flex-1 space-y-2">
                <Skeleton className="bg-gray-300 h-4 w-full" />
                <Skeleton className="bg-gray-300 h-4 w-3/4" />
                <Skeleton className="bg-gray-300 h-2 w-full rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
