import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .pipe(z.email({ message: "Invalid email" })),
  password: z
    .string()
    .min(3, { message: "Password must be at least 3 characters" }),
});

export const signUpSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .pipe(z.email({ message: "Invalid email" })),
    password: z
      .string()
      .min(3, { message: "Password must be at least 3 characters" }),
    confirmPassword: z.string().min(1, { message: "Confirm your password" }),
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters" }),
    avatar: z
      .string()
      .url({ message: "Avatar must be a valid URL" })
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        code: "custom",
        message: "Passwords do not match",
      });
    }
  });

export type SignUpData = z.infer<typeof signUpSchema>;
export type SignInData = z.infer<typeof signInSchema>;
