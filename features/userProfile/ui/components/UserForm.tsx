import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Controller, useForm } from "react-hook-form";

import { LuPencil } from "react-icons/lu";
import { IoCheckmark } from "react-icons/io5";
import { updateProfile } from "../../api";
import { UpdateProfileData } from "@/lib/validations";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import UploadImage from "@/components/shared/UploadImage";

type Props = {
  fullname: string | null;
  email: string;
  mobile: string | null;
  age: number | null;
  avatar: string | null;
};

const UserForm = ({ email, fullname, age, avatar, mobile }: Props) => {
  const router = useRouter();
  const mutation = updateProfile();

  const form = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      age: 0,
      avatar: null,
      mobile: "",
    },
  });

  useEffect(() => {
    form.reset({
      fullname: fullname ?? "",
      email: email ?? "",
      age: age ?? undefined,
      avatar: null,
      mobile: mobile ?? "",
    });
  }, [fullname, email, age, avatar, mobile]);

  const handleSubmit = async (values: UpdateProfileData) => {
    try {
      const { data } = await mutation.mutateAsync(values);
      console.log(data);
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(data));
      router.refresh();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="flex flex-col gap-3 mt-4"
    >
      <Controller
        name="fullname"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel
              className={`body-xs ${fieldState.invalid ? "text-error" : "text-gray-700"}`}
            >
              Full Name
            </FieldLabel>

            <Label className="flex items-center border rounded-lg h-12 mb-1 bg-gray-100 border-gray-200 p-3">
              <Input
                id="fullname"
                type="text"
                className={`pl-0 border-none ${fieldState.invalid ? "border-error focus:border-error text-error" : ""}`}
                placeholder="you@example.com"
                {...field}
              />
            </Label>

            {fieldState.invalid && (
              <p className="text-xs text-error">{fieldState.error?.message}</p>
            )}
          </Field>
        )}
      />

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
              readOnly
              type="text"
              className={`bg-gray-100 mb-1 ${fieldState.invalid ? "border-error focus:border-error text-error" : ""}`}
              placeholder="you@example.com"
              {...field}
            />

            {fieldState.invalid && (
              <p className="text-xs text-error">{fieldState.error?.message}</p>
            )}
          </Field>
        )}
      />

      <div className="flex items-center gap-2">
        <Controller
          name="mobile"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel
                className={`body-xs ${fieldState.invalid ? "text-error" : "text-gray-700"}`}
              >
                Mobile Number
              </FieldLabel>

              <Label className="flex items-center border rounded-lg h-12 mb-1 border-gray-200 p-3">
                <p className=" body-xs text-gray-200 pr-1 border-r border-gray-400">
                  +995
                </p>

                <Input
                  id="fullname"
                  type="text"
                  className={`pl-0 border-none ${fieldState.invalid ? "border-error focus:border-error text-error" : ""}`}
                  placeholder="you@example.com"
                  {...field}
                />
              </Label>

              {fieldState.invalid && (
                <p className="text-xs text-error">
                  {fieldState.error?.message}
                </p>
              )}
            </Field>
          )}
        />

        <select name="gg" id="gg">
          <option value="dw">fwe</option>
        </select>
      </div>

      <UploadImage
        avatarUrl={avatar}
        onUpload={(file) => {
          form.setValue("avatar", file as any);
        }}
      />

      <Button
        type="submit"
        className="w-full py-6 bg-brand-500 rounded-lg text-white mt-4 text-[16px] font-medium cursor-pointer disabled:bg-brand-300"
        //   disabled={mutation.isPending}
      >
        Update Profile
      </Button>
    </form>
  );
};

export default UserForm;
