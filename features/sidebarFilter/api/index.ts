import { CategoryType } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useGetCourseCategories() {
  const query = useQuery<CategoryType[]>({
    queryKey: ["coursCategories"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_REQUEST_API_URL}/categories`,
      );

      if (!res.ok) {
        throw new Error("Error while fetching course categories");
      }

      const data = await res.json();

      return data.data;
    },
  });

  return query;
}

export function useGetCourseTopics(categories: string[]) {
  const query = useQuery<CategoryType[]>({
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

      return data.data;
    },
  });

  return query;
}

export function useGetCourseInstructors() {
  const query = useQuery<CategoryType[]>({
    queryKey: ["instructors"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_REQUEST_API_URL}/instructors`,
      );

      if (!res.ok) {
        throw new Error("Error while fetching course instructors");
      }

      const data = await res.json();

      return data.data;
    },
  });

  return query;
}
