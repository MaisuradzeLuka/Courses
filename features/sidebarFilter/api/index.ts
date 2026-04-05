import { CategoryType, CourseCatalogMetaType, CourseType } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function getCourseCategories() {
  const query = useQuery<{ data: CategoryType[] }>({
    queryKey: ["coursCategories"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_REQUEST_API_URL}/categories`,
      );

      if (!res.ok) {
        throw new Error("Error while fetching course categories");
      }

      const data = await res.json();

      return data;
    },
  });

  return query;
}

export function getCourseTopics(categoryId: number) {
  const query = useQuery<{ data: CategoryType[] }>({
    queryKey: ["courseTopics", categoryId],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_REQUEST_API_URL}/topics`,
      );

      if (!res.ok) {
        throw new Error("Error while fetching course topics");
      }

      const data = await res.json();

      return data;
    },
  });

  return query;
}
