import { useGetCourseCategories } from "../../api";
import FilterLayout from "./FilterLayout";

const Categories = () => {
  const { data: categories, isLoading, isError } = useGetCourseCategories();

  if (isLoading) return <div>Loading...</div>;
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
