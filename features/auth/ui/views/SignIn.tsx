"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@base-ui/react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignInMutation } from "../../api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { signInSchema, SignInData } from "@/lib/validations";
import { Field, FieldLabel } from "@/components/ui/field";
import Redirect from "../components/Redirect";
import { useAuthModal } from "@/hooks/useAuthModal";
import { useQueryClient } from "@tanstack/react-query";

const SignIn = ({ styles }: { styles?: string }) => {
  const mutation = useSignInMutation();
  const queryClient = useQueryClient();
  const {
    signInOpen,
    closeSignIn,
    switchToSignUp,
    setShowSignIn,
    setAuthToken,
  } = useAuthModal();

  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: SignInData) => {
    if (formError) {
      setFormError("");
    }

    try {
      const { data } = await mutation.mutateAsync(values);

      setAuthToken(data.token);
      queryClient.setQueryData(["me"], data.user);

      closeSignIn();
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      setFormError(message);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setShowSignIn(open);
    if (!open) {
      form.reset();
    }
  };

  return (
    <Dialog open={signInOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger
        className={`border-2 rounded-lg py-4 px-6 border-brand-300 text-brand-500 font-semibold text-xl cursor-pointer  ${styles}`}
      >
        Log In
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="heading-2 text-gray-900">
            Welcome Back
          </DialogTitle>

          <DialogDescription className="body-xs text-gray-500">
            Log in to continue your learning
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6">
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel
                  className={`body-xs ${fieldState.invalid ? "text-error" : "text-gray-700"}`}
                >
                  Email
                </FieldLabel>

                <Input
                  id="email"
                  type="email"
                  className={` mb-1 ${fieldState.invalid ? "border-error focus:border-error text-error" : ""}`}
                  placeholder="you@example.com"
                  {...field}
                />

                {fieldState.invalid && (
                  <p className="text-xs text-error">
                    {fieldState.error?.message}
                  </p>
                )}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel
                  className={`body-xs mt-6 ${fieldState.invalid ? "text-error" : "text-gray-700"}`}
                >
                  Password
                </FieldLabel>

                <Label
                  className={`flex items-center border rounded-lg h-12 mb-1 border-gray-200 pr-3 ${fieldState.invalid ? "border-error focus:border-error text-error" : ""}`}
                >
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="border-none"
                    placeholder="********"
                    {...field}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="text-[22px] text-gray-300 cursor-pointer"
                  >
                    {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                  </button>
                </Label>

                {fieldState.invalid && (
                  <p className="text-xs text-error">
                    {fieldState.error?.message}
                  </p>
                )}
              </Field>
            )}
          />

          {formError && (
            <p className="text-error text-sm mt-2 text-center">{formError}</p>
          )}

          <Button
            type="submit"
            className="w-full py-3 bg-brand-500 rounded-lg text-white mt-4 text-[16px] font-medium cursor-pointer disabled:bg-brand-300"
            disabled={mutation.isPending}
          >
            Log In
          </Button>
        </form>

        <Redirect variant="signIn" redirectFunction={switchToSignUp} />
      </DialogContent>
    </Dialog>
  );
};

export default SignIn;
