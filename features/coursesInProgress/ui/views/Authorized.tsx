import CourseCard from "@/components/shared/CourseCard";
import { useGetCoursesInProgress } from "../../api";
import Link from "next/link";

const Authorized = ({ token }: { token: string }) => {
  const { data: courses, isLoading, isError } = useGetCoursesInProgress(token);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  if (!courses?.length) return null;

  return (
    <section>
      <div className="flex justify-between items-end pb-8">
        <div>
          <h2 className="heading-1">Continue Learning</h2>
          <p className="text-[18px] text-gray-700">Pick up where you left</p>
        </div>

        <Link
          href="browse"
          className="text-xl font-medium hover:text-brand-500 underline underline-offset-3 transtiion"
        >
          See All
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            variant="short"
            avgRating={course.course.avgRating}
            instructor="few"
            title={course.course.title}
            courseId={course.course.id}
            image={course.course.image}
            progress={course.progress}
            location={null}
            sessionLabel={null}
            timeSlotLabel={null}
            weeklyLabel={null}
          />
        ))}
      </div>
    </section>
  );
};

export default Authorized;
