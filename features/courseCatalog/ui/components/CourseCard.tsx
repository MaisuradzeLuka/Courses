import Card from "@/components/shared/Card";
import CategoryCard from "@/components/shared/CategoryCard";
import { CourseType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { BiDollar } from "react-icons/bi";
import { FaStar } from "react-icons/fa";

const CourseCard = ({
  image,
  instructor,
  avgRating,
  title,
  durationWeeks,
  category,
  basePrice,
  id,
}: CourseType) => {
  return (
    <Card styles="flex flex-col gap-4">
      <Image
        src={image}
        alt="course banner"
        width={333}
        height={180}
        className="w-full h-45 object-cover rounded-xl"
      />

      <div className="w-full h-full flex flex-col justify-between">
        <div className="w-full flex justify-between items-start body-xs">
          <div className="flex items-center gap-1">
            <span className="text-gray-300 body-xs border-r-2 border-gray-200 pr-2 mr-1">
              {instructor.name}
            </span>
            <p className="flex items-center gap-1 text-gray-300 body-xs">
              <span>{durationWeeks}</span>Weeks
            </p>
          </div>

          <div className="flex items-center gap-1 text-[16px]">
            <FaStar className="text-warning" />
            <span className="text-gray-600">{avgRating || 0}</span>
          </div>
        </div>

        <h3 className="heading-3 mt-1 mb-4">{title}</h3>

        <CategoryCard id={category.id} label={category.name} variant="dark" />

        <div className="flex justify-between mt-4">
          <div className="flex flex-col">
            <p className="text-xs font-medium text-gray-300">Starting from</p>

            <p className="heading-3 flex items-center">
              <BiDollar className="mt-1" />
              <span className="-ml-1">{basePrice}</span>
            </p>
          </div>

          <Link
            href={`/courses/${id}`}
            className="bg-brand-500 py-4 px-6 rounded-lg text-gray-50 font-medium"
          >
            Details
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default CourseCard;
