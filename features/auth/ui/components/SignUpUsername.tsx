import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { SignUpData } from "@/lib/validations";
import { Control, Controller } from "react-hook-form";

type Props = {
  control: Control<SignUpData>;
};

const SignUpUsername = ({ control }: Props) => {
  return (
    <Controller
      name="username"
      control={control}
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel
            className={`body-xs ${fieldState.invalid ? "text-error" : "text-gray-700"}`}
          >
            Username
          </FieldLabel>

          <Input
            type="text"
            placeholder="you@example.com"
            className={`w-full mt-2 mb-1 ${fieldState.invalid ? "border-error focus:border-error text-error" : ""}`}
            {...field}
          />

          {fieldState.invalid && (
            <p className="text-xs text-error">{fieldState.error?.message}</p>
          )}
        </Field>
      )}
    />
  );
};

export default SignUpUsername;
