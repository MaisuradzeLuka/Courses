import CategoryCard from "@/components/shared/CategoryCard";
import { SingleCourseType } from "@/types";
import Image from "next/image";
import { FaRegCalendar, FaStar } from "react-icons/fa";

const Description = ({ data }: SingleCourseType) => {
  const avgRating =
    data.reviews.length === 0
      ? 0
      : data.reviews.reduce((sum, review) => sum + review.rating, 0) /
        data.reviews.length;

  const roundedRating = Math.round(avgRating * 10) / 10;

  return (
    <section className="col-span-5">
      <Image
        src={data.image}
        alt="course banner"
        width={900}
        height={470}
        className="w-full h-117 object-cover rounded-[10px]"
      />

      <div className="flex items-center justify-between mt-4 mb-6 text-gray-600 text-sm">
        <div className="flex items-center gap-1">
          <FaRegCalendar />
          <span>{data.durationWeeks}</span>
          Weeks
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-[16px]">
            <FaStar className="text-warning" />
            <span className="text-gray-600">{roundedRating || 0}</span>
          </div>

          <CategoryCard
            active={false}
            id={data.id}
            label={data.category.name}
            variant="light"
            icon="development"
          />
        </div>
      </div>

      <CategoryCard
        active={false}
        id={data.id}
        label={data.instructor.name}
        variant="light"
        avatar={data.instructor.avatar}
      />

      <article className="mt-4.5">
        <h4 className="heading-4 text-gray-40 mb-6">Course Description</h4>

        <p className="body-s text-gray-600">{data.description}</p>
      </article>
    </section>
  );
};

export default Description;
