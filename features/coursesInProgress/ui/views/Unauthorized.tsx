import CourseCard from "@/components/shared/CourseCard";
import LogInCard from "../components/LogInCard";

const Unauthorized = () => {
  return (
    <section>
      <div className="mb-8">
        <h2 className="heading-1">Continue Learning</h2>
        <p className="text-[18px] text-gray-700">Pick up where you left</p>
      </div>

      <div className="relative grid grid-cols-3 gap-6">
        {Array.from([1, 2, 3]).map((_, index) => (
          <CourseCard
            location={null}
            progress={66}
            sessionLabel={null}
            timeSlotLabel={null}
            weeklyLabel={null}
            courseId={0}
            image="/miniBanner.png"
            avgRating={2}
            instructor="Emily Rodriguez"
            title="UI/UX Design Masterclass"
            variant="short"
            key={index}
          />
        ))}
        <div className="absolute inset-0 z-10 rounded-xl backdrop-blur-md bg-white/20 border border-white/30" />
        <LogInCard />
      </div>
    </section>
  );
};

export default Unauthorized;
