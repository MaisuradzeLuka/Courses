import { SessionType, SingleCourseType, TimeType, WeekType } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useGetCourse(id: string, token: string) {
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

      const data = await res.json();

      return data;
    },
  });

  return query;
}

export function useGetWeeks(id: number) {
  const query = useQuery<WeekType[]>({
    queryKey: ["weeks", id],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_REQUEST_API_URL}/courses/${id}/weekly-schedules`,
      );

      if (!res.ok) {
        throw new Error("Error while fetching weekly schedule");
      }

      const data = await res.json();

      return data.data;
    },
  });

  return query;
}

export function useGetTimeSlots({
  id,
  weekId,
}: {
  id: number;
  weekId: number | null;
}) {
  const query = useQuery<TimeType[]>({
    queryKey: ["timeSlots", id, weekId],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_REQUEST_API_URL}/courses/${id}/time-slots?weekly_schedule_id=${weekId}`,
      );

      if (!res.ok) {
        throw new Error("Error while fetching time slots");
      }

      const data = await res.json();

      return data.data;
    },
    enabled: !!weekId,
  });

  return query;
}

export function useGetSessionType({
  id,
  weekId,
  timeId,
}: {
  id: number;
  weekId: number | null;
  timeId: number | null;
}) {
  const query = useQuery<SessionType[]>({
    queryKey: ["sessionType", id, weekId, timeId],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_REQUEST_API_URL}/courses/${id}/session-types?weekly_schedule_id=${weekId}&time_slot_id=${timeId}`,
      );

      if (!res.ok) {
        throw new Error("Error while fetching session types");
      }

      const data = await res.json();

      return data.data;
    },
    enabled: !!timeId,
  });

  return query;
}

type usePostEnrollmentType = {
  scheduleId: number;
  token: string;
  courseId: number;
};

export function usePostEnrollment() {
  const mutation = useMutation<any, Error, usePostEnrollmentType>({
    mutationFn: async ({ token, courseId, scheduleId }) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_REQUEST_API_URL!}/enrollments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            courseId,
            courseScheduleId: scheduleId,
            force: true,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Sign in failed");
      }

      return data;
    },
  });

  return mutation;
}
