import { CourseCatalogMetaType, CourseType } from "@/types";
import { useQuery } from "@tanstack/react-query";

type CatalogDataType = {
  data: CourseType[];
  meta: CourseCatalogMetaType;
};

type CatalogProps = {
  categories: string[];
  topics: string[];
  instructors: string[];
  page: number;
  sort: string;
};

export function getCourseCatalog({
  categories,
  topics,
  instructors,
  page,
  sort,
}: CatalogProps) {
  const query = useQuery<CatalogDataType>({
    queryKey: ["courseCatalog", categories, topics, instructors, page, sort],
    queryFn: async () => {
      console.log(categories);

      const params = new URLSearchParams();

      categories.forEach((id) => {
        params.append("categories[]", id);
      });

      topics.forEach((id) => {
        params.append("topics[]", id);
      });

      instructors.forEach((id) => {
        params.append("instructors[]", id);
      });

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_REQUEST_API_URL}/courses?${params}&page=${page}&sort=${sort}`,
      );

      if (!res.ok) {
        throw new Error("Error while fetching course catalog");
      }

      const data = await res.json();

      return data;
    },
  });

  return query;
}
