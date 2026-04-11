import { Skeleton } from "@/components/ui/skeleton";

export function FilterSectionSkeleton() {
  return (
    <div>
      <Skeleton className="bg-gray-300 mb-6 h-5 w-28" />
      <ul className="mb-14 flex flex-wrap gap-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <li key={i}>
            <Skeleton className="bg-gray-300 h-10 w-[7.5rem] rounded-full" />
          </li>
        ))}
      </ul>
    </div>
  );
}
