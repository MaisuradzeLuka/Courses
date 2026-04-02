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
import { SubmitEvent, useState } from "react";
import { signInAction } from "../../api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { signInSchema } from "@/lib/validations";
import z from "zod";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");

  const mutation = signInAction();

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (emailError || passwordError || formError) {
      setEmailError("");
      setPasswordError("");
      setFormError("");
    }

    const valid = signInSchema.safeParse({ email, password });

    if (valid.error) {
      const errors = z.treeifyError(valid.error);

      setEmailError(errors.properties?.email?.errors?.[0] ?? "");
      setPasswordError(errors.properties?.password?.errors?.[0] ?? "");
      return;
    }

    try {
      const res = await mutation.mutateAsync({ email, password });
    } catch (error: any) {
      setFormError(error.message);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="border-2 rounded-lg py-3 px-4 border-brand-300 text-brand-500 font-semibold text-xl cursor-pointer">
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

        <form onSubmit={(e) => handleSubmit(e)} className="mt-6">
          <div className={emailError ? "text-error" : "text-gray-700"}>
            <Label htmlFor="email" className="body-xs">
              Email
            </Label>

            <Input
              type="email"
              className={`mt-2 mb-1 ${emailError ? "border-error focus:border-error text-error" : ""}`}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />

            {emailError && <p className="text-xs">{emailError}</p>}
          </div>

          <div
            className={`mt-6 ${passwordError ? "text-error" : "text-gray-700"}`}
          >
            <Label htmlFor="email" className="body-xs">
              Password
            </Label>

            <Label
              className={`flex items-center border rounded-lg h-12 mt-2 mb-1 border-gray-200 pr-3 ${passwordError ? "border-error focus:border-error text-error" : ""}`}
            >
              <Input
                type={showPassword ? "text" : "password"}
                className="border-none"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-[22px] text-gray-300 cursor-pointer"
              >
                {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </button>
            </Label>

            {passwordError && <p className="text-xs">{passwordError}</p>}
          </div>

          {formError && <p className="text-error text-sm mt-2">{formError}</p>}

          <Button
            type="submit"
            className="w-full py-3 bg-brand-500 rounded-lg text-white mt-4 text-[16px] font-medium cursor-pointer"
            disabled={mutation.isPending}
          >
            Log In
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SignIn;
