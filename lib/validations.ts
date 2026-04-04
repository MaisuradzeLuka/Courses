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
    avatar: z.string().optional(),
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

export const updateProfileSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .pipe(z.email({ message: "Invalid email" })),
  age: z
    .number({ message: "Age must be a number" })
    .int({ message: "Age must be a whole number" })
    .min(1, { message: "Age is required" }),
  mobile: z
    .string()
    .min(1, { message: "Mobile number is required" })
    .regex(/^(\+995|0)9\d{8}$/, {
      message: "Mobile must be in Georgian format (+995 or 0)",
    }),
  fullname: z
    .string()
    .min(3, { message: "Fullname must be at least 3 characters" })
    .max(50, { message: "Fullname must be at most 50 characters" }),
  avatar: z.instanceof(File).nullable(),
});

export type SignUpData = z.infer<typeof signUpSchema>;
export type SignInData = z.infer<typeof signInSchema>;
export type UpdateProfileData = z.infer<typeof updateProfileSchema>;
