import { CategoryType } from "@/types";
import { Dispatch, SetStateAction } from "react";
import FilterLayout from "./FilterLayout";
import { getCourseTopics } from "../../api";

type Props = {
  filterItems: CategoryType[];
  setFilterItems: Dispatch<SetStateAction<CategoryType[]>>;
};

const Topics = ({ filterItems, setFilterItems }: Props) => {
  const { data: topics, isLoading, isError } = getCourseTopics();

  if (isLoading) return <div>Loading...</div>;
  if (isError || !topics) return <div>Error</div>;

  return (
    <>
      <FilterLayout
        title="Topics"
        filterItems={topics.data}
        selectedFilterItems={filterItems}
        setSelectedFilterItems={setFilterItems}
      />
    </>
  );
};

export default Topics;
