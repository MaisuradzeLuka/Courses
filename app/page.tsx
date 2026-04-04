import DashboardLayoutHelper from "@/components/shared/DashboardLayoutHelper";
import DashCarousel from "@/features/dashCarousel/ui/views/DashCarousel";
import FeaturedCourses from "@/features/featuredCourses/ui/views/featuredCourses";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 my-16">
      <DashCarousel />
      <DashboardLayoutHelper />
      {/* <FeaturedCourses /> */}
    </div>
  );
}
