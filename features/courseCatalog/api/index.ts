import { CourseCatalogMetaType, CourseType } from "@/types";
import { useQuery } from "@tanstack/react-query";

type CatalogDataType = {
  data: CourseType[];
  meta: CourseCatalogMetaType;
};

export function getCourseCatalog() {
  const query = useQuery<CatalogDataType>({
    queryKey: ["courseCatalog"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_REQUEST_API_URL}/courses`,
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
