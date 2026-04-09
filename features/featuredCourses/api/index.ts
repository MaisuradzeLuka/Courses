import { CourseType } from "@/types";
import { useQuery } from "@tanstack/react-query";

type FeaturedReturnType = {
  data: CourseType[];
};

export function useGetFeaturedCourses() {
  const query = useQuery<FeaturedReturnType>({
    queryKey: ["featuredCourses"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_REQUEST_API_URL!}/courses/featured`,
      );

      if (!res.ok) {
        throw new Error("Error while fetching featured courses");
      }

      const data = await res.json();

      return { ...data };
    },
  });

  return query;
}
