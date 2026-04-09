import { UserType } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useGetUser(token: string) {
  const query = useQuery<UserType>({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_REQUEST_API_URL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Error while fetching the authenticated user");
      }

      const data = await res.json();

      return data.data;
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
  });

  return query;
}
