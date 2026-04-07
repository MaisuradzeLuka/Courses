"use client";

import { useEffect, useState } from "react";
import { getCourse } from "../../api";
import Description from "../components/Description";
import EnrollmentData from "../components/EnrollmentData";
import EnrolledData from "../components/EnrolledData";

const CoursePage = ({ id }: { id: string }) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const storageToken = localStorage.getItem("token");

    if (storageToken) setToken(storageToken);
  }, []);

  const { data: course, isLoading, isError } = getCourse(id, token);

  if (isLoading) return <div>Loading...</div>;
  if (!course || isError) return <div>Error</div>;

  return (
    <>
      <h1 className="heading-1 mb-6">{course.data.title}</h1>
      <div className="grid grid-cols-8 gap-33">
        <Description {...course} />
        {course.data.enrollment ? (
          <EnrolledData {...course.data.enrollment} />
        ) : (
          <EnrollmentData data={course} token={token} />
        )}
      </div>
    </>
  );
};

export default CoursePage;
