import { UpdateProfileData } from "@/lib/validations";
import { AuthType } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Error from "next/error";

export function updateProfile() {
  const queryClient = useQueryClient();

  const mutation = useMutation<AuthType, Error, UpdateProfileData>({
    mutationFn: async (values: UpdateProfileData) => {
      const formData = new FormData();
      formData.append("full_name", values.fullname);
      formData.append("mobile_number", values.mobile);
      formData.append("age", "16");
      formData.append("avatar", values.avatar || "");
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Unauthorized" as any);
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_REQUEST_API_URL!}/profile`,
        {
          method: "PUT",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update profile");
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });

  return mutation;
}
