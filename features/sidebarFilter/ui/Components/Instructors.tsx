import { FilterSectionSkeleton } from "@/features/sidebarFilter/ui/skeletons";
import FilterLayout from "./FilterLayout";
import { useGetCourseInstructors } from "../../api";

const Instructors = () => {
  const { data: instructors, isLoading, isError } = useGetCourseInstructors();

  if (isLoading) return <FilterSectionSkeleton />;
  if (isError || !instructors) return <div>Error</div>;

  return (
    <FilterLayout
      paramKey="instructors[]"
      title="Instructors"
      filterItems={instructors}
    />
  );
};

export default Instructors;
