"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import SignUpEmail from "../components/SignUpEmail";
import SignUpPassword from "../components/SignUpPassword";
import SignUpUsername from "../components/SignUpUsername";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { SignUpData, signUpSchema } from "@/lib/validations";
import { TfiAngleLeft } from "react-icons/tfi";
import FormProgress from "../components/FormProgress";
import { signUpAction } from "../../api";
import { useState } from "react";
import Redirect from "../components/Redirect";
import { useRouter } from "next/navigation";
import { useAuthModal } from "@/hooks/useAuthModal";

const SignUp = () => {
  const router = useRouter();
  const mutation = signUpAction();
  const { signUpOpen, closeSignUp, switchToSignIn, setShowSignUp } =
    useAuthModal();

  const [formError, setFormError] = useState("");

  const form = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
      avatar: "",
    },
  });

  const { step, next, back, isFirstStep, isLastStep, currentStepIndex, steps } =
    useMultiStepForm([
      <SignUpEmail control={form.control} />,
      <SignUpPassword control={form.control} />,
      <SignUpUsername control={form.control} />,
    ]);

  const handleSubmit = async (values: SignUpData) => {
    try {
      const { data } = await mutation.mutateAsync(values);

      closeSignUp();

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      router.push("/");
    } catch (error: any) {
      setFormError(error.message);
    }
  };

  return (
    <Dialog open={signUpOpen} onOpenChange={setShowSignUp}>
      <DialogTrigger className="border-2 rounded-lg py-4 px-6 border-brand-500 bg-brand-500 text-gray-50 font-semibold text-xl cursor-pointer">
        Sign Up
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="heading-2 text-gray-900">
            Create Account
          </DialogTitle>

          <DialogDescription className="body-xs text-gray-500">
            Join and start learning today{" "}
          </DialogDescription>
        </DialogHeader>

        <FormProgress
          currentStep={currentStepIndex}
          totalSteps={steps.length}
        />

        <form onSubmit={form.handleSubmit(handleSubmit)}>
          {step}

          {formError && (
            <p className="text-error text-sm mt-2 text-center">{formError}</p>
          )}

          {isLastStep && (
            <Button
              type="submit"
              className="w-full py-5 bg-brand-500 rounded-lg text-white mt-4 text-[16px] font-medium cursor-pointer disabled:bg-brand-300 disabled:cursor-none"
              disabled={mutation.isPending}
            >
              Sign Up
            </Button>
          )}

          {!isLastStep && (
            <Button
              type="button"
              className="w-full py-5 bg-brand-500 rounded-lg text-white mt-4 text-[16px] font-medium cursor-pointer"
              onClick={next}
            >
              Next
            </Button>
          )}
        </form>

        {!isFirstStep && (
          <button
            className="absolute cursor-pointer top-5 left-4"
            onClick={back}
          >
            <TfiAngleLeft className="text-gray-400 text-lg" />
          </button>
        )}

        <Redirect variant="signUp" redirectFunction={switchToSignIn} />
      </DialogContent>
    </Dialog>
  );
};

export default SignUp;
