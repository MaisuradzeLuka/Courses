"use client";

import CourseCard from "@/components/shared/CourseCard";
import { useEnrolledCoursesSheet } from "@/features/sidebar/context/EnrolledCoursesSheetContext";
import { useGetCoursesInProgress } from "../../api";
import { ContinueLearningSkeleton } from "../skeletons";

const Authorized = ({ token }: { token: string }) => {
  const { openEnrolledCourses } = useEnrolledCoursesSheet();
  const { data: courses, isLoading, isError } = useGetCoursesInProgress(token);

  if (isLoading) return <ContinueLearningSkeleton />;
  if (isError) return <div>Error</div>;
  if (!courses?.length) return null;

  return (
    <section>
      <div className="flex justify-between items-end pb-8">
        <div>
          <h2 className="heading-1">Continue Learning</h2>
          <p className="text-[18px] text-gray-700">Pick up where you left</p>
        </div>

        <button
          type="button"
          onClick={openEnrolledCourses}
          className="text-xl font-medium hover:text-brand-500 underline underline-offset-3 cursor-pointer transition"
        >
          See All
        </button>
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
