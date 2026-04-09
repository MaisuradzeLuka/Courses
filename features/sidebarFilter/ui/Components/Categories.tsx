import { Dispatch, SetStateAction } from "react";
import { useGetCourseCategories } from "../../api";
import { CategoryType } from "@/types";
import FilterLayout from "./FilterLayout";

type Props = {
  filterItems: CategoryType[];
  setFilterItems: Dispatch<SetStateAction<CategoryType[]>>;
};

const Categories = ({ filterItems, setFilterItems }: Props) => {
  const { data: categories, isLoading, isError } = useGetCourseCategories();

  if (isLoading) return <div>Loading...</div>;
  if (isError || !categories) return <div>Error</div>;

  return (
    <>
      <FilterLayout
        paramKey="categories[]"
        title="Categroies"
        filterItems={categories}
        selectedFilterItems={filterItems}
        setSelectedFilterItems={setFilterItems}
      />
    </>
  );
};

export default Categories;
