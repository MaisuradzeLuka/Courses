import { FilterSectionSkeleton } from "@/features/sidebarFilter/ui/skeletons";
import { useGetCourseCategories } from "../../api";
import FilterLayout from "./FilterLayout";

const Categories = () => {
  const { data: categories, isLoading, isError } = useGetCourseCategories();

  if (isLoading) return <FilterSectionSkeleton />;
  if (isError || !categories) return <div>Error</div>;

  return (
    <FilterLayout
      paramKey="categories[]"
      title="Categroies"
      filterItems={categories}
    />
  );
};

export default Categories;
