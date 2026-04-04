import { CourseType } from "@/types";
import { useQuery } from "@tanstack/react-query";

type CoursesReturnType = {
  data: CourseType[];
};

export function getCoursesInProgress(token: string) {
  const query = useQuery<CoursesReturnType>({
    queryKey: ["coursesInProgress"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_REQUEST_API_URL}/courses/in-progress`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.ok) {
        throw new Error("Error while fetching courses in progress");
      }

      const data = res.json();

      return data;
    },
  });

  return query;
}
