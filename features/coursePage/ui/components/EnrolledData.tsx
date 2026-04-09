import { EnrollmentType } from "@/types";
import { PiCalendarDotsDuotone, PiClock } from "react-icons/pi";
import { SlLocationPin } from "react-icons/sl";
import { FiMonitor } from "react-icons/fi";
import { Field, FieldLabel } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CompleteCourse, RetakeCourse } from "@/features/coursesInProgress/api";

const EnrolledData = ({ schedule, progress, id }: EnrollmentType) => {
  const deleteEnrollement = RetakeCourse();
  const completeCourse = CompleteCourse();

  const isCompleted = progress === 100;

  const handleClick = async () => {
    try {
      let res;
      if (isCompleted) {
        res = await deleteEnrollement.mutateAsync(id);
      } else {
        res = await completeCourse.mutateAsync(id);
      }
    } catch (error: any) {
      console.log(error.message);
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
          <span>{schedule.weeklySchedule.label}</span>
        </div>

        <div className="flex items-center gap-3">
          <PiClock className="text-xl mt-1" />
          <span>{schedule.timeSlot.label}</span>
        </div>

        <div className="flex items-center gap-3">
          <FiMonitor className="text-xl mt-1" />
          <span>{schedule.sessionType.name}</span>
        </div>

        {schedule.location && (
          <div className="flex items-center gap-3">
            <SlLocationPin className="text-xl mt-1" />
            <span>{schedule.location}</span>
          </div>
        )}
      </div>

      <Field className="w-full max-w-sm">
        <FieldLabel
          htmlFor="progress-upload"
          className="flex flex-row-reverse justify-start w-max! text-xs heading-4 text-gray-500 mt-12"
        >
          <span>Upload progress</span>
          <span className="ml-auto">{progress}%</span>
        </FieldLabel>
        <Progress value={progress} id="progress-upload" />
      </Field>

      <Button
        onClick={handleClick}
        className="w-full bg-brand-500 rounded-lg text-gray-50 py-7 text-xl font-medium my-10 cursor-pointer"
      >
        {isCompleted ? "Retake Course" : "Complete Course"}
      </Button>
    </section>
  );
};

export default EnrolledData;
