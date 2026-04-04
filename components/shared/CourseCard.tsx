import Image from "next/image";
import { Field, FieldLabel } from "../ui/field";
import { Progress } from "../ui/progress";
import Card from "./Card";
import { FaStar } from "react-icons/fa";
import Link from "next/link";

type Props = {
  variant: "short" | "full";
  instructor: string;
  avgRating: number;
  title: string;
};

const CourseCard = ({ variant, instructor, avgRating, title }: Props) => {
  return (
    <Card>
      <div className="flex items-start gap-4">
        <Image
          src="/miniBanner.png"
          alt="course banner"
          width={140}
          height={125}
          className="w-35 h-31 object-cover rounded-xl"
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
        </div>
      </div>

      <div className="flex items-center gap-10 mt-2">
        <Field className="w-full max-w-sm">
          <FieldLabel
            htmlFor="progress-upload"
            className="flex flex-row-reverse justify-start w-max! text-xs font-medium"
          >
            <span>Upload progress</span>
            <span className="ml-auto">66%</span>
          </FieldLabel>
          <Progress value={66} id="progress-upload" />
        </Field>

        <Link
          href="#"
          className="border-2 border-brand-300 py-3 px-4 rounded-lg text-brand-500 font-medium"
        >
          View
        </Link>
      </div>
    </Card>
  );
};

export default CourseCard;
