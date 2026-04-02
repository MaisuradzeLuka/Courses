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

const SignUp = () => {
  const mutation = signUpAction();

  const form = useForm<SignUpData>({
    // resolver: zodResolver(signUpSchema),
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

  const handleSubmit = (values: SignUpData) => {
    console.log(values);

    mutation.mutate(values);
  };

  return (
    <Dialog>
      <DialogTrigger className="border-2 rounded-lg py-3 px-4 border-brand-500 bg-brand-500 text-gray-50 font-semibold text-xl cursor-pointer">
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

          <Button
            type={isLastStep ? "submit" : "button"}
            className="w-full py-5 bg-brand-500 rounded-lg text-white mt-4 text-[16px] font-medium cursor-pointer"
            //  disabled={mutation.isPending}
            onClick={next}
          >
            {isLastStep ? "Sign Up" : "Next"}
          </Button>
        </form>

        {!isFirstStep && (
          <button
            className="absolute cursor-pointer top-5 left-4"
            onClick={back}
          >
            <TfiAngleLeft className="text-gray-400 text-lg" />
          </button>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SignUp;
