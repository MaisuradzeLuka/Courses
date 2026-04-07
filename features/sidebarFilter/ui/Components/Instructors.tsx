import { CategoryType } from "@/types";
import FilterLayout from "./FilterLayout";
import { Dispatch, SetStateAction } from "react";
import { getCourseInstructors } from "../../api";

type Props = {
  filterItems: CategoryType[];
  setFilterItems: Dispatch<SetStateAction<CategoryType[]>>;
};

const Instructors = ({ filterItems, setFilterItems }: Props) => {
  const { data: instructors, isLoading, isError } = getCourseInstructors();

  if (isLoading) return <div>Loading...</div>;
  if (isError || !instructors) return <div>Error</div>;

  return (
    <>
      <FilterLayout
        paramKey="instructors[]"
        title="Instructors"
        filterItems={instructors.data}
        selectedFilterItems={filterItems}
        setSelectedFilterItems={setFilterItems}
      />
    </>
  );
};

export default Instructors;
