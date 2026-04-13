"use client";

import { useAuthModal } from "@/hooks/useAuthModal";
import { useGetCourse } from "../../api";
import { CoursePageSkeleton } from "../skeletons";
import Description from "../components/Description";
import EnrollmentData from "../components/EnrollmentData";
import EnrolledData from "../components/EnrolledData";
import EnrollementConfirmation from "../components/modals/EnrollementConfirmation";
import CourseCompletionModal from "../components/modals/CourseCompletionModal";
import { useState } from "react";

const CoursePage = ({ id }: { id: string }) => {
  const { token } = useAuthModal();
  const [enrollmentConfirmationOpen, setEnrollmentConfirmationOpen] =
    useState(false);
  const [courseCompletionOpen, setCourseCompletionOpen] = useState(false);

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
            onCourseCompleted={() => setCourseCompletionOpen(true)}
          />
        ) : (
          <EnrollmentData
            data={course}
            onEnrollmentSuccess={() => setEnrollmentConfirmationOpen(true)}
          />
        )}
      </div>

      <EnrollementConfirmation
        open={enrollmentConfirmationOpen}
        onOpenChange={setEnrollmentConfirmationOpen}
        courseTitle={course.data.title}
      />

      <CourseCompletionModal
        open={courseCompletionOpen}
        onOpenChange={setCourseCompletionOpen}
        courseTitle={course.data.title}
        token={token}
        courseId={course.data.id}
        isRated={course.data.isRated}
      />
    </>
  );
};

export default CoursePage;
