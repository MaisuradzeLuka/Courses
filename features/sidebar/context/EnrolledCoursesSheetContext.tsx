"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import CourseCard from "@/components/shared/CourseCard";
import EmptyContent from "@/features/sidebar/ui/components/EmptyContent";
import { useGetEnrolledCourses } from "@/features/sidebar/api";
import { useAuthModal } from "@/hooks/useAuthModal";
import { useRouter } from "next/navigation";

type EnrolledCoursesSheetContextValue = {
  openEnrolledCourses: () => void;
};

const EnrolledCoursesSheetContext =
  createContext<EnrolledCoursesSheetContextValue | null>(null);

export function EnrolledCoursesSheetProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { token } = useAuthModal();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useGetEnrolledCourses(token, isOpen);

  const openEnrolledCourses = useCallback(() => setIsOpen(true), []);

  const navigateToCourse = useCallback(
    (courseId: number) => {
      setIsOpen(false);
      router.push(`/browse/${courseId}`);
    },
    [router],
  );

  const value = useMemo(
    () => ({ openEnrolledCourses }),
    [openEnrolledCourses],
  );

  return (
    <EnrolledCoursesSheetContext.Provider value={value}>
      {children}
      <Sheet onOpenChange={setIsOpen} open={isOpen}>
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
                  onViewClick={() => navigateToCourse(course.course.id)}
                />
              ))
            ) : (
              <EmptyContent setIsOpen={setIsOpen} />
            )}
          </div>
        </SheetContent>
      </Sheet>
    </EnrolledCoursesSheetContext.Provider>
  );
}

export function useEnrolledCoursesSheet() {
  const ctx = useContext(EnrolledCoursesSheetContext);
  if (!ctx) {
    throw new Error(
      "useEnrolledCoursesSheet must be used within EnrolledCoursesSheetProvider",
    );
  }
  return ctx;
}
