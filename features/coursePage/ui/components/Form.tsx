"use client";

import { Button } from "@/components/ui/button";
import { usePostEnrollment } from "../../api";
import { useAuthModal } from "@/hooks/useAuthModal";
import { useGetUser } from "@/features/navbar/api";
import { SubmitEvent } from "react";
import { useState } from "react";
import AuthWarningCard from "./AuthWarningCard";
import ConflictModal from "./modals/ConflictModal";

type Props = {
  basePrice: number;
  priceModifier: number;
  courseId: number;
  scheduleId: number | null;
  disabled: boolean;
  onEnrollmentSuccess?: () => void;
};

const Form = ({
  basePrice,
  priceModifier,
  courseId,
  scheduleId,
  disabled,
  onEnrollmentSuccess,
}: Props) => {
  const { token, openSignIn, openProfile } = useAuthModal();
  const { data: user } = useGetUser(token);

  const [conflictOpen, setConflictOpen] = useState(false);
  const [conflictMessage, setConflictMessage] = useState({
    message: "",
    schedule: "",
  });
  const mutation = usePostEnrollment();

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) {
      openSignIn();
      return;
    }

    if (user && !user.profileComplete) {
      openProfile();
      return;
    }

    if (!scheduleId) return;

    try {
      const data = await mutation.mutateAsync({
        token,
        courseId,
        scheduleId,
        force: false,
      });

      if (data.status === 409) {
        setConflictMessage({
          message: data.message.conflictingCourseName,
          schedule: data.message.schedule,
        });
        setConflictOpen(true);
        return;
      }

      onEnrollmentSuccess?.();
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleConflictProceed = async () => {
    try {
      if (!scheduleId) return;

      await mutation.mutateAsync({
        token,
        courseId,
        scheduleId,
        force: true,
      });
      setConflictOpen(false);
      onEnrollmentSuccess?.();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col gap-3 bg-gray-50 p-10 rounded-xl border border-gray-100 mt-8 mb-3"
      >
        <div className="flex justify-between">
          <h3 className="heading-4 text-gray-400">Total Price</h3>
          <span className="heading-2 text-gray-800">
            ${basePrice + priceModifier}
          </span>
        </div>

        <div className="flex justify-between mt-4">
          <h3 className="body-s text-gray-400">Base Price</h3>
          <span className="body-s text-gray-800">+ ${basePrice}</span>
        </div>

        <div className="flex justify-between">
          <h3 className="body-s text-gray-400">Session Type</h3>
          <span className="body-s text-gray-800">
            {priceModifier ? `+ $${priceModifier}` : "Included"}
          </span>
        </div>

        <Button
          type="submit"
          disabled={disabled}
          className="heading-4 w-full py-6 bg-brand-500 text-gray-50 disabled:bg-brand-50 disabled:text-brand-200 mt-4 cursor-pointer"
        >
          Enroll Now
        </Button>
      </form>

      {!token && (
        <AuthWarningCard
          title="Authentication Required"
          description="You need sign in to your profile before enrolling in this course."
          btnLabel="Sign In"
          onAction={openSignIn}
        />
      )}

      {!user?.profileComplete && (
        <AuthWarningCard
          title="Complete Your Profile"
          description="You need to fill in your profile details before enrolling in this course."
          btnLabel="Complete"
          onAction={openProfile}
        />
      )}

      <ConflictModal
        open={conflictOpen}
        onOpenChange={setConflictOpen}
        message={conflictMessage.message}
        schedule={conflictMessage.schedule}
        onProceed={handleConflictProceed}
        isPending={mutation.isPending}
      />
    </>
  );
};

export default Form;
