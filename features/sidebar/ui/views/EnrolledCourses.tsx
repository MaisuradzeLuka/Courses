"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LuBookOpen } from "react-icons/lu";
import { useGetEnrolledCourses } from "../../api";
import { useState } from "react";
import CourseCard from "@/components/shared/CourseCard";
import Link from "next/link";

const EnrolledCourses = ({ token }: { token: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useGetEnrolledCourses(token, isOpen);

  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger className="flex items-center gap-2 body-l text-gray-600 cursor-pointer hover:text-brand-500 transition">
        <LuBookOpen className="mt-1" /> <span>Enrolled Courses</span>
      </SheetTrigger>

      <SheetContent className="bg-gray-100 border-0! px-14">
        <SheetHeader className="flex-row justify-between items-end p-0 mt-10.5">
          <SheetTitle className="heading-1 ">Enrolled Courses</SheetTitle>
          <SheetDescription className="font-medium text-[16px]">
            Total Enrollments {data?.length || 0}
          </SheetDescription>
        </SheetHeader>

        <div className="h-full flex flex-col">
          {data?.length ? (
            data.map((course) => (
              <CourseCard
                courseId={course.course.id}
                image={course.course.image}
                key={course.id}
                avgRating={course.course.avgRating}
                instructor={course.course.instructor.name}
                title={course.course.title}
                progress={course.progress}
                variant="full"
                location={course.schedule.location}
                sessionLabel={course.schedule.sessionType.name}
                timeSlotLabel={course.schedule.timeSlot.label}
                weeklyLabel={course.schedule.weeklySchedule.label}
              />
            ))
          ) : (
            <div className="h-full flex flex-col justify-center">
              <div className="flex flex-col items-center gap-6">
                <div className="text-center">
                  <h3 className="heading-3 text-brand-800">
                    No Enrolled Courses Yet
                  </h3>
                  <p className="max-w-65 body-xs text-brand-800 mt-2">
                    Your learning journey starts here! Browse courses to get
                    started.
                  </p>
                </div>

                <Link
                  href="/browse"
                  className="py-4 px-6 rounded-lg bg-brand-500 text-gray-50 font-medium"
                >
                  Browse Courses
                </Link>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default EnrolledCourses;
