import { SessionType, SingleCourseType, TimeType, WeekType } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

export class EnrollmentConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EnrollmentConflictError";
  }
}

type usePostEnrollmentType = {
  scheduleId: number;
  token: string;
  courseId: number;
  force?: boolean;
};

type usePostEnrollmentResponse = {
  status: number;
  message: {
    conflictingCourseName: string;
    conflictingEnrollmentId: number;
    requestedCourseId: number;
    schedule: string;
  };
};

export function usePostEnrollment() {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    usePostEnrollmentResponse,
    Error,
    usePostEnrollmentType
  >({
    mutationFn: async ({ token, courseId, scheduleId, force }) => {
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
            ...(force ? { force: true } : {}),
          }),
        },
      );

      if (res.status === 409) {
        const conflictData = await res.json();
        return { status: 409, message: conflictData.conflicts[0] };
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to enroll in the course");
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["enrolledCourses"] });
      queryClient.invalidateQueries({ queryKey: ["coursesInProgress"] });
    },
  });

  return mutation;
}

type usePostRatingType = {
  rating: number;
  token: string;
  courseId: number;
};

export function usePostRateCourse() {
  const queryClient = useQueryClient();

  const mutation = useMutation<any, Error, usePostRatingType>({
    mutationFn: async ({ token, courseId, rating }) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_REQUEST_API_URL!}/courses/${courseId}/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            rating,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Rating failed");
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["enrolledCourses"] });
      queryClient.invalidateQueries({ queryKey: ["coursesInProgress"] });
    },
  });

  return mutation;
}
