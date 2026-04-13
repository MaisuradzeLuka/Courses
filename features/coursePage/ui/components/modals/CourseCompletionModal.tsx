"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { usePostRateCourse } from "../../../api";
import type { ComponentProps } from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import CourseRatingStars from "../CourseRatingStars";

const CLOSE_REASON = "close-press" as const;

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courseTitle: string;
  token: string;
  courseId: number;
  isRated: boolean;
};

const CourseCompletionModal = ({
  open,
  onOpenChange,
  courseTitle,
  token,
  courseId,
  isRated,
}: Props) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [hasRated, setHasRated] = useState(isRated);
  const rateMutation = usePostRateCourse();

  useEffect(() => {
    setHasRated(isRated);
  }, [isRated]);

  useEffect(() => {
    if (open) {
      setRating(0);
      setHover(0);
    }
  }, [open]);

  const handleDone = () => {
    setRating(0);
    setHover(0);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} disablePointerDismissal>
      <DialogContent
        className="sm:max-w-md border-0 rounded-xl bg-gray-50 p-12 shadow-none"
        showCloseButton={false}
      >
        <div className="flex flex-col items-center text-center">
          <Image src="/candy.png" alt="party popper" width={90} height={90} />

          <DialogTitle className="heading-2 my-6 text-gray-700">
            Congratulations!
          </DialogTitle>

          <p className="body-l max-w-[320px] text-gray-700 mb-4">
            You&apos;ve completed{" "}
            <span className="font-semibold text-gray-800">
              &quot;{courseTitle}&quot;
            </span>{" "}
            Course!
          </p>

          <p className="mt-8 text-lg font-medium text-brand-400">
            {hasRated ? "Your rating" : "Rate your experience"}
          </p>

          {hasRated ? (
            <p className="body-s mt-4 max-w-[280px] text-gray-600">
              You&apos;ve already rated this course. Thank you!
            </p>
          ) : (
            <CourseRatingStars
              className="mt-4"
              value={rating}
              hover={hover}
              onHover={setHover}
              disabled={rateMutation.isPending}
              onSelect={async (value) => {
                setRating(value);
                try {
                  await rateMutation.mutateAsync({
                    token,
                    courseId,
                    rating: value,
                  });
                  setHasRated(true);
                  setRating(0);
                  setHover(0);
                } catch {
                  // keep stars interactive for retry
                }
              }}
            />
          )}

          <Button
            type="button"
            disabled={rateMutation.isPending}
            className="mt-10 w-full rounded-lg bg-brand-500 py-6 text-[16px] font-medium text-gray-50 hover:bg-brand-600 disabled:opacity-70 cursor-pointer"
            onClick={handleDone}
          >
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CourseCompletionModal;
