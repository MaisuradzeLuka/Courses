import { EnrollmentFullType } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useGetEnrolledCourses(token: string, isOpen: boolean) {
  const query = useQuery<EnrollmentFullType[]>({
    queryKey: ["enrolledCourses"],
    queryFn: async () => {
      if (!token) {
        throw new Error("Not authorized");
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_REQUEST_API_URL}/enrollments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.ok) {
        throw new Error("Error while fetching enrolled courses");
      }

      const data = await res.json();

      return data.data;
    },
    enabled: isOpen,
  });

  return query;
}
