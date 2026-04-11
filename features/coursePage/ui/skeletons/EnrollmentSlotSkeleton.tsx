import { Skeleton } from "@/components/ui/skeleton";

export function EnrollmentSlotSkeleton({
  variant,
}: {
  variant: "week" | "time" | "session";
}) {
  if (variant === "session") {
    return (
      <div className="grid grid-cols-3 gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <Skeleton className="bg-gray-300 h-36 w-full rounded-xl" />
            <Skeleton className="bg-gray-300 h-3 w-28" />
          </div>
        ))}
      </div>
    );
  }

  const cols = variant === "week" ? "grid-cols-4" : "grid-cols-3";
  const count = variant === "week" ? 4 : 3;
  const h = variant === "week" ? "h-23" : "h-15";

  return (
    <div className={`grid ${cols} gap-3`}>
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className={`rounded-xl ${h}`} />
      ))}
    </div>
  );
}
