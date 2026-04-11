"use client";

import { useAuthModal } from "@/hooks/useAuthModal";
import { useGetCourse } from "../../api";
import { CoursePageSkeleton } from "../skeletons";
import Description from "../components/Description";
import EnrollmentData from "../components/EnrollmentData";
import EnrolledData from "../components/EnrolledData";

const CoursePage = ({ id }: { id: string }) => {
  const { token } = useAuthModal();

  const { data: course, isLoading, isError } = useGetCourse(id, token);

  if (isLoading) return <CoursePageSkeleton />;
  if (!course || isError) return <div>Error</div>;

  return (
    <>
      <h1 className="heading-1 mb-6">{course.data.title}</h1>
      <div className="grid grid-cols-8 gap-33">
        <Description {...course} />
        {course.data.enrollment ? (
          <EnrolledData
            enrollment={course.data.enrollment}
            isRated={course.data.isRated}
            courseId={course.data.id}
            token={token}
          />
        ) : (
          <EnrollmentData data={course} />
        )}
      </div>
    </>
  );
};

export default CoursePage;
