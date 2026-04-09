import { CourseType, EnrollmentFullType } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useGetCoursesInProgress(token: string) {
  const query = useQuery<EnrollmentFullType[]>({
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

      const data = await res.json();

      return data.data;
    },
  });

  return query;
}

export function CompleteCourse() {
  const mutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_REQUEST_API_URL}/enrollments/${id}/complete`,
        {
          method: "PATCH",
          headers: {
            accept: "application/json",
            Authorization: `Bearer 612|EzbWZVpedyrJHPHoxnVS8g2b391KMz16GLxE7kx095535e34`,
          },
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to complete the course");
      }

      return data;
    },
  });

  return mutation;
}

export function RetakeCourse() {
  const mutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_REQUEST_API_URL}/enrollments/${id}`,
        {
          method: "DELETE",
          headers: {
            accept: "application/json",
            Authorization: `Bearer 612|EzbWZVpedyrJHPHoxnVS8g2b391KMz16GLxE7kx095535e34`,
          },
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete the enrollement");
      }

      return data;
    },
  });

  return mutation;
}
