"use client";

import { LuBookOpen } from "react-icons/lu";
import { useEnrolledCoursesSheet } from "@/features/sidebar/context/EnrolledCoursesSheetContext";

const EnrolledCourses = () => {
  const { openEnrolledCourses } = useEnrolledCoursesSheet();

  return (
    <button
      type="button"
      onClick={openEnrolledCourses}
      className="flex items-center gap-2 body-l text-gray-600 cursor-pointer hover:text-brand-500 transition"
    >
      <LuBookOpen className="mt-1" /> <span>Enrolled Courses</span>
    </button>
  );
};

export default EnrolledCourses;
