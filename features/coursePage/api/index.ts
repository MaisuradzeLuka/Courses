import { SingleCourseType } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function getCourse(id: string, token: string) {
  const query = useQuery<SingleCourseType>({
    queryKey: ["courses", id, token],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_REQUEST_API_URL}/courses/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.ok) {
        throw new Error("Error while fetching course");
      }

      const data = res.json();

      return data;
    },
  });

  return query;
}
