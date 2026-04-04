"use client";

import CoursesInProgress from "@/features/coursesInProgress/ui/views/CoursesInProgress";
import FeaturedCourses from "@/features/featuredCourses/ui/views/featuredCourses";
import { useEffect, useState } from "react";

const DashboardLayoutHelper = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token") || "";
    setToken(storedToken);
  }, []);

  return (
    <div className={`flex gap-16 ${token ? "flex-col-reverse" : "flex-col"}`}>
      <FeaturedCourses />
      <CoursesInProgress token={token} />
    </div>
  );
};

export default DashboardLayoutHelper;
