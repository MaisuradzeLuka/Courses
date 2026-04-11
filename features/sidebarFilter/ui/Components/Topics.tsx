import FilterLayout from "./FilterLayout";
import { useGetCourseTopics } from "../../api";
import { useSearchParams } from "next/navigation";

const Topics = () => {
  const searchParams = useSearchParams();

  const categories = searchParams.getAll("categories[]");
  const { data: topics, isLoading, isError } = useGetCourseTopics(categories);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !topics) return <div>Error</div>;

  return (
    <FilterLayout
      paramKey="topics[]"
      title="Topics"
      filterItems={topics}
    />
  );
};

export default Topics;
