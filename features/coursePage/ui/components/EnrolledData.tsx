import { EnrollmentType } from "@/types";
import { PiCalendarDotsDuotone, PiClock } from "react-icons/pi";
import { SlLocationPin } from "react-icons/sl";
import { FiMonitor } from "react-icons/fi";
import { Field, FieldLabel } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  usePostCompleteCourse,
  usePostRetakeCourse,
} from "@/features/coursesInProgress/api";
import { usePostRateCourse } from "../../api";
import { useState } from "react";
import CourseRatingStars from "./CourseRatingStars";

type Props = {
  enrollment: EnrollmentType;
  isRated: boolean;
  token: string;
  courseId: number;
  onCourseCompleted?: () => void;
};

const EnrolledData = ({
  enrollment,
  isRated,
  token,
  courseId,
  onCourseCompleted,
}: Props) => {
  const deleteEnrollement = usePostRetakeCourse();
  const completeCourse = usePostCompleteCourse();
  const rateMutation = usePostRateCourse();
  const [rating, setRating] = useState(0);
  const [ratingHover, setRatingHover] = useState(0);

  const isCompleted = enrollment.progress === 100;

  const handleClick = async () => {
    try {
      if (isCompleted) {
        await deleteEnrollement.mutateAsync(enrollment.id);
      } else {
        await completeCourse.mutateAsync(enrollment.id);
        onCourseCompleted?.();
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return (
    <section className="col-span-3">
      <h4
        className={`w-max heading-4 p-4 rounded-full  ${isCompleted ? "text-success bg-success-light" : "text-brand-400 bg-brand-50"}`}
      >
        {isCompleted ? "Completed" : "Enrolled"}
      </h4>

      <div className="flex flex-col gap-5.5 mt-5.5 body-l text-gray-600">
        <div className="flex items-center gap-3">
          <PiCalendarDotsDuotone className="text-xl mt-1" />
          <span>{enrollment.schedule.weeklySchedule.label}</span>
        </div>

        <div className="flex items-center gap-3">
          <PiClock className="text-xl mt-1" />
          <span>{enrollment.schedule.timeSlot.label}</span>
        </div>

        <div className="flex items-center gap-3">
          <FiMonitor className="text-xl mt-1" />
          <span>{enrollment.schedule.sessionType.name}</span>
        </div>

        {enrollment.schedule.location && (
          <div className="flex items-center gap-3">
            <SlLocationPin className="text-xl mt-1" />
            <span>{enrollment.schedule.location}</span>
          </div>
        )}
      </div>

      <Field className="max-w-full">
        <FieldLabel
          htmlFor="progress-upload"
          className="flex flex-row-reverse justify-start w-max! text-xs heading-4 text-gray-500 mt-12"
        >
          <span>Upload progress</span>
          <span className="ml-auto">{enrollment.progress}%</span>
        </FieldLabel>
        <Progress value={enrollment.progress} id="progress-upload" />
      </Field>

      <Button
        disabled={deleteEnrollement.isPending || completeCourse.isPending}
        onClick={handleClick}
        className="w-full bg-brand-500 rounded-lg text-gray-50 py-7 text-xl font-medium my-10 cursor-pointer"
      >
        {isCompleted ? "Retake Course" : "Complete Course"}
      </Button>

      {isCompleted && (
        <div className="flex flex-col gap-3 bg-gray-50 p-10 rounded-xl border border-gray-100 mt-2 mb-3">
          {!isRated ? (
            <>
              <p className="body-s text-center text-gray-600">
                Rate your experience
              </p>
              <CourseRatingStars
                value={rating}
                hover={ratingHover}
                onHover={setRatingHover}
                disabled={rateMutation.isPending}
                onSelect={async (value) => {
                  setRating(value);
                  await rateMutation.mutateAsync({
                    token,
                    courseId,
                    rating: value,
                  });
                  setRating(0);
                  setRatingHover(0);
                }}
              />
            </>
          ) : (
            <p className="body-s text-center text-gray-600">
              You have already rated this course. Thank you!
            </p>
          )}
        </div>
      )}
    </section>
  );
};

export default EnrolledData;
