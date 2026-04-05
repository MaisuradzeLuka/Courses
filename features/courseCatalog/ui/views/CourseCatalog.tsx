"use client";

import { getCourseCatalog } from "../../api";
import CourseCard from "../components/CourseCard";

const CourseCatalog = () => {
  const { data: courses, isLoading, isError } = getCourseCatalog();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  if (!courses) return <div>No courses to show</div>;

  const { data, meta } = courses;

  return (
    <section className="col-span-9">
      <div className="flex justify-between mb-8">
        <p className="body-s text-gray-600">
          Showing {meta.perPage} out of {meta.total}
        </p>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {data.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>
    </section>
  );
};

export default CourseCatalog;
