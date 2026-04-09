import Image from "next/image";
import { Field, FieldLabel } from "../ui/field";
import { Progress } from "../ui/progress";
import Card from "./Card";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
import { PiCalendarDotsDuotone, PiClock } from "react-icons/pi";
import { FiMonitor } from "react-icons/fi";
import { SlLocationPin } from "react-icons/sl";

type Props = {
  courseId: number;
  variant: "short" | "full";
  image: string;
  instructor: string;
  avgRating: number;
  title: string;
  weeklyLabel: string | null;
  timeSlotLabel: string | null;
  sessionLabel: string | null;
  location: string | null;
  progress: number;
};

const CourseCard = ({
  courseId,
  variant,
  image,
  instructor,
  avgRating,
  title,
  location,
  sessionLabel,
  timeSlotLabel,
  weeklyLabel,
  progress,
}: Props) => {
  const imageDimentions = variant === "short" ? "w-35 h-31" : "w-68 h-48";
  return (
    <Card>
      <div className="flex items-start gap-4">
        <Image
          src={image}
          alt="course banner"
          width={140}
          height={125}
          className={`object-cover rounded-xl  ${imageDimentions}`}
        />

        <div className="w-full flex flex-col">
          <div className="w-full flex justify-between items-start body-xs">
            <div className="flex items-center gap-1">
              <h4 className="text-gray-400">Lecturer</h4>
              <span className="text-gray-500">{instructor}</span>
            </div>

            <div className="flex items-center gap-1 text-[16px]">
              <FaStar className="text-warning" />
              <span className="text-gray-600">{avgRating || 0}</span>
            </div>
          </div>

          <h3 className="heading-3 mt-1 mb-4">{title}</h3>

          {variant === "full" && (
            <div className="flex flex-col gap-1.5 body-l text-gray-600 text-sm!">
              <div className="flex items-center gap-3">
                <PiCalendarDotsDuotone className="text-xl mt-1" />
                <span>{weeklyLabel}</span>
              </div>

              <div className="flex items-center gap-3">
                <PiClock className="text-xl mt-1" />
                <span>{timeSlotLabel}</span>
              </div>

              <div className="flex items-center gap-3">
                <FiMonitor className="text-xl mt-1" />
                <span>{sessionLabel}</span>
              </div>

              {location && (
                <div className="flex items-center gap-3">
                  <SlLocationPin className="text-xl mt-1" />
                  <span>{location}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div
        className={`flex items-end justify-between ${variant === "short" ? "gap-10" : "gap-5"} mt-2 `}
      >
        <Field className="w-full max-w-md">
          <FieldLabel
            htmlFor="progress-upload"
            className={`flex flex-row-reverse justify-start w-max! mt-5 ${variant === "short" ? "text-xs" : "text-[16px]"} font-medium`}
          >
            <span>Complete</span>
            <span className="ml-auto">{progress}%</span>
          </FieldLabel>
          <Progress value={progress} id="progress-upload" />
        </Field>

        <Link
          href={`/browse/${courseId}`}
          className="flex-1 border-2 border-brand-300 py-3 px-4 rounded-lg text-brand-500 font-medium text-center"
        >
          View
        </Link>
      </div>
    </Card>
  );
};

export default CourseCard;
