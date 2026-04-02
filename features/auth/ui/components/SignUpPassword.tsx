import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SignUpData } from "@/lib/validations";
import { useState } from "react";
import { Control, Controller } from "react-hook-form";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

type Props = {
  control: Control<SignUpData>;
};
const SignUpPassword = ({ control }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div>
      <Controller
        name="password"
        control={control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel
              className={`body-xs ${fieldState.invalid ? "text-error" : "text-gray-700"}`}
            >
              Password
            </FieldLabel>

            <Label
              className={`flex items-center border rounded-lg h-12 mt-2 mb-1 border-gray-200 pr-3 ${fieldState.invalid ? "border-error focus:border-error text-error" : ""}`}
            >
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="you@example.com"
                className={`w-full mt-2 mb-1 border-none ${fieldState.invalid ? "border-error focus:border-error text-error" : ""}`}
                {...field}
              />
              <button
                onClick={() => setShowPassword((prev) => !prev)}
                type="button"
                className="text-[22px] text-gray-300 cursor-pointer"
              >
                {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </button>
            </Label>

            {fieldState.invalid && (
              <p className="text-xs text-error">{fieldState.error?.message}</p>
            )}
          </Field>
        )}
      />

      <Controller
        name="confirmPassword"
        control={control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel
              className={`body-xs mt-6 ${fieldState.invalid ? "text-error" : "text-gray-700"}`}
            >
              Confirm Password
            </FieldLabel>

            <Label
              className={`flex items-center border rounded-lg h-12 mt-2 mb-1 border-gray-200 pr-3 ${fieldState.invalid ? "border-error focus:border-error text-error" : ""}`}
            >
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="you@example.com"
                className={`w-full mt-2 mb-1 border-none ${fieldState.invalid ? "border-error focus:border-error text-error" : ""}`}
                {...field}
              />
              <button
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                type="button"
                className="text-[22px] text-gray-300 cursor-pointer"
              >
                {showConfirmPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </button>
            </Label>

            {fieldState.invalid && (
              <p className="text-xs text-error">{fieldState.error?.message}</p>
            )}
          </Field>
        )}
      />
    </div>
  );
};

export default SignUpPassword;
