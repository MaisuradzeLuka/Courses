import CourseCard from "@/components/shared/CourseCard";
import { getCoursesInProgress } from "../../api";
import Link from "next/link";

const Authorized = ({ token }: { token: string }) => {
  const { data: courses, isLoading, isError } = getCoursesInProgress(token);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  if (courses?.data) return null;

  return (
    <section>
      <div className="flex justify-between">
        <div className="mb-8">
          <h2 className="heading-1">Continue Learning</h2>
          <p className="text-[18px] text-gray-700">Pick up where you left</p>
        </div>

        <Link href="#">See All</Link>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <CourseCard
          variant="short"
          avgRating={1}
          instructor="Jhon Doe"
          title="Some kind of title"
        />
      </div>
    </section>
  );
};

export default Authorized;
