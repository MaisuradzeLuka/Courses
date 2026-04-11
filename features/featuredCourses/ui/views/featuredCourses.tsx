"use client";

import { useGetFeaturedCourses } from "../../api";
import { FeaturedCoursesSkeleton } from "../skeletons";
import CourseItem from "../components/CourseItem";

const FeaturedCourses = () => {
  const { data: courses, isLoading, isError } = useGetFeaturedCourses();

  if (isLoading) return <FeaturedCoursesSkeleton />;
  if (!courses || isError) return <div>Error</div>;

  return (
    <section>
      <div className="mb-8">
        <h2 className="heading-1">Start Learning Today</h2>
        <p className="text-[18px] text-gray-700">
          Choose from our most popular courses and begin your journey
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {courses.data.map((course) => (
          <CourseItem key={course.id} {...course} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedCourses;
