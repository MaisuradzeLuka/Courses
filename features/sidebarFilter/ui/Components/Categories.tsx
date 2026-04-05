import { Dispatch, SetStateAction } from "react";
import { getCourseCategories } from "../../api";
import CategoryCard from "@/components/shared/CategoryCard";
import { CategoryType } from "@/types";
import FilterLayout from "./FilterLayout";

type Props = {
  filterItems: CategoryType[];
  setFilterItems: Dispatch<SetStateAction<CategoryType[]>>;
};

const Categories = ({ filterItems, setFilterItems }: Props) => {
  const { data: categories, isLoading, isError } = getCourseCategories();

  if (isLoading) return <div>Loading...</div>;
  if (isError || !categories) return <div>Error</div>;

  return (
    <>
      <FilterLayout
        title="Categroies"
        filterItems={categories.data}
        selectedFilterItems={filterItems}
        setSelectedFilterItems={setFilterItems}
      />
    </>
  );
};

export default Categories;
