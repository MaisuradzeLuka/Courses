import { getSearchParams } from "@/lib/utils";
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

export function getCourseTopics(categories: string[]) {
  const query = useQuery<{ data: CategoryType[] }>({
    queryKey: ["courseTopics", categories],
    queryFn: async () => {
      const params = new URLSearchParams(window.location.search);

      categories.forEach((id) => {
        params.append("categories[]", id);
      });
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_REQUEST_API_URL}/topics?${params}`,
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

export function getCourseInstructors() {
  const query = useQuery<{ data: CategoryType[] }>({
    queryKey: ["instructors"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_REQUEST_API_URL}/instructors`,
      );

      if (!res.ok) {
        throw new Error("Error while fetching course instructors");
      }

      const data = await res.json();

      return data;
    },
  });

  return query;
}
