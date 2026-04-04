import { SignInData, SignUpData } from "@/lib/validations";
import { AuthType } from "@/types";
import { useMutation } from "@tanstack/react-query";
import Error from "next/error";

export function signInAction() {
  const mutation = useMutation<AuthType, Error, SignInData>({
    mutationFn: async (values: SignInData) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_REQUEST_API_URL!}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
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

export function signUpAction() {
  const mutation = useMutation<AuthType, Error, SignUpData>({
    mutationFn: async (values: SignUpData) => {
      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("password_confirmation", values.confirmPassword);
      if (values.avatar) {
        formData.append("avatar", values.avatar);
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_REQUEST_API_URL!}/register`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
          },
          body: formData,
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
