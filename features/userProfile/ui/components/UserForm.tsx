"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import { updateProfile } from "../../api";
import { UpdateProfileData } from "@/lib/validations";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import UploadImage from "@/components/shared/UploadImage";
import AgeSelector from "./AgeSelector";

type Props = {
  fullname: string | null;
  email: string;
  mobile: string | null;
  age: number | null;
  avatar: string | null;
  setShowProfile: (open: boolean) => void;
};

const UserForm = ({
  email,
  fullname,
  age,
  avatar,
  mobile,
  setShowProfile,
}: Props) => {
  const queryClient = useQueryClient();
  const mutation = updateProfile();
  const [formError, setFormError] = useState("");

  const form = useForm<UpdateProfileData>({
    defaultValues: {
      fullname: "",
      email: "",
      age: 16,
      avatar: null,
      mobile: "",
    },
  });

  useEffect(() => {
    form.reset({
      fullname: fullname ?? "",
      email: email ?? "",
      age: age ?? 16,
      avatar: null,
      mobile: mobile ?? "",
    });
  }, [fullname, email, age, avatar, mobile]);

  const handleSubmit = async (values: UpdateProfileData) => {
    try {
      const { data } = await mutation.mutateAsync(values);
      queryClient.setQueryData(["me"], data);
      setShowProfile(false);
    } catch (error: any) {
      setFormError(error.message);
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
              className={`body-xs ${
                fieldState.invalid ? "text-error" : "text-gray-700"
              }`}
            >
              Full Name
            </FieldLabel>

            <Label className="flex items-center border rounded-lg h-12 mb-1 bg-gray-100 border-gray-200 p-3">
              <Input
                type="text"
                className={`pl-0 border-none ${
                  fieldState.invalid
                    ? "border-error focus:border-error text-error"
                    : ""
                }`}
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
              className={`body-xs ${
                fieldState.invalid ? "text-error" : "text-gray-700"
              }`}
            >
              Email
            </FieldLabel>

            <Input
              readOnly
              type="text"
              className={`bg-gray-100 mb-1 ${
                fieldState.invalid
                  ? "border-error focus:border-error text-error"
                  : ""
              }`}
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
                className={`body-xs ${
                  fieldState.invalid ? "text-error" : "text-gray-700"
                }`}
              >
                Mobile Number
              </FieldLabel>

              <Label className="flex items-center border rounded-lg h-12 mb-1 border-gray-200 p-3">
                <p className="body-xs text-gray-200 pr-1 border-r border-gray-400">
                  +995
                </p>

                <Input
                  type="text"
                  className={`pl-0 border-none ${
                    fieldState.invalid
                      ? "border-error focus:border-error text-error"
                      : ""
                  }`}
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

        <Controller
          name="age"
          control={form.control}
          render={({ field }) => (
            <AgeSelector value={field.value} onChange={field.onChange} />
          )}
        />
      </div>

      <UploadImage
        avatarUrl={avatar}
        onUpload={(file) => {
          setFormError("");
          form.setValue("avatar", file as any);
        }}
        onError={(error) => {
          setFormError(error.message);
          form.setValue("avatar", null);
        }}
      />

      {formError && (
        <p className="text-error text-sm mt-2 text-center">{formError}</p>
      )}

      <Button
        type="submit"
        disabled={mutation.isPending}
        className="w-full py-6 bg-brand-500 rounded-lg text-white mt-4 text-[16px] font-medium cursor-pointer disabled:bg-brand-300"
      >
        Update Profile
      </Button>
    </form>
  );
};

export default UserForm;
