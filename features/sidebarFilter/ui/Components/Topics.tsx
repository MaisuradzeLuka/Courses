import { CategoryType } from "@/types";
import { Dispatch, SetStateAction } from "react";
import FilterLayout from "./FilterLayout";
import { useGetCourseTopics } from "../../api";
import { useSearchParams } from "next/navigation";

type Props = {
  filterItems: CategoryType[];
  setFilterItems: Dispatch<SetStateAction<CategoryType[]>>;
};

const Topics = ({ filterItems, setFilterItems }: Props) => {
  const searchParams = useSearchParams();

  const categories = searchParams.getAll("categories[]");
  const { data: topics, isLoading, isError } = useGetCourseTopics(categories);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !topics) return <div>Error</div>;

  return (
    <>
      <FilterLayout
        paramKey="topics[]"
        title="Topics"
        filterItems={topics}
        selectedFilterItems={filterItems}
        setSelectedFilterItems={setFilterItems}
      />
    </>
  );
};

export default Topics;
