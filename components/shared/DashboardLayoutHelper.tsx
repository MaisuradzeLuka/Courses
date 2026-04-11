"use client";

import CoursesInProgress from "@/features/coursesInProgress/ui/views/CoursesInProgress";
import FeaturedCourses from "@/features/featuredCourses/ui/views/featuredCourses";
import { useAuthModal } from "@/hooks/useAuthModal";

const DashboardLayoutHelper = () => {
  const { token } = useAuthModal();

  return (
    <div className={`flex gap-16 ${token ? "flex-col-reverse" : "flex-col"}`}>
      <FeaturedCourses />
      <CoursesInProgress token={token} />
    </div>
  );
};

export default DashboardLayoutHelper;
