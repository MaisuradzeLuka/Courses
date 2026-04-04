import Card from "@/components/shared/Card";
import { CourseType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { BiDollar } from "react-icons/bi";
import { FaStar } from "react-icons/fa";

const CourseItem = ({
  image,
  instructor,
  avgRating,
  title,
  description,
  basePrice,
  id,
}: CourseType) => {
  return (
    <Card>
      <Image
        src={image}
        width={466}
        height={260}
        alt="course banner"
        className="object-cover w-full h-65 rounded-[10px] "
      />

      <div className="flex justify-between items-center mt-4 body-xs">
        <div className="flex items-center gap-1">
          <h4 className="text-gray-400">Lecturer</h4>
          <span className="text-gray-500">{instructor.name}</span>
        </div>

        <div className="flex items-center gap-1 text-[16px]">
          <FaStar className="text-warning" />
          <span className="text-gray-600">{avgRating || 0}</span>
        </div>
      </div>

      <h3 className="heading-3 mt-3 mb-4">{title}</h3>

      <p className="body-s text-gray-500">{description}</p>

      <div className="flex items-center justify-between mt-7">
        <div className="flex items-center gap-1">
          <p className="text-xs font-medium text-gray-400">Starting from</p>

          <p className="heading-2 flex items-center">
            <BiDollar className="mt-1" />
            <span className="-ml-1">{basePrice}</span>
          </p>
        </div>

        <Link
          className="py-4 px-7 bg-brand-500 rounded-lg text-white mt-4 text-xl font-medium! cursor-pointer disabled:bg-brand-300"
          href={`/courses/${id}`}
        >
          Details
        </Link>
      </div>
    </Card>
  );
};

export default CourseItem;
