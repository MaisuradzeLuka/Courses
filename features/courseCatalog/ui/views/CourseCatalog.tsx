"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { getCourseCatalog } from "../../api";
import CourseCard from "../components/CourseCard";
import CoursePagination from "../components/Pagination";
import SortBy from "../components/SortBy";

const CourseCatalog = () => {
  const searchParams = useSearchParams();

  const categories = searchParams.getAll("categories[]");
  const topics = searchParams.getAll("topics[]");
  const instructors = searchParams.getAll("instructors[]");
  const page = Number(searchParams.get("page")) || 1;
  const sort = searchParams.get("sort") || "newest";

  const {
    data: courses,
    isLoading,
    isError,
  } = getCourseCatalog({ categories, topics, instructors, page, sort });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  if (!courses) return <div>No courses to show</div>;

  const { data, meta } = courses;

  const coursesPerPage =
    courses.data.length <= meta.perPage ? courses.data.length : meta.perPage;

  return (
    <section className="col-span-9">
      <div className="flex justify-between items-end mb-8 mt-2">
        {coursesPerPage ? (
          <p className="body-s text-gray-600">
            Showing {coursesPerPage} out of {meta.total}
          </p>
        ) : (
          <p className="body-s text-gray-600">No courses found</p>
        )}

        <SortBy />
      </div>

      <div className="grid grid-cols-3 gap-6">
        {data.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>

      <CoursePagination {...meta} />
    </section>
  );
};

export default CourseCatalog;
