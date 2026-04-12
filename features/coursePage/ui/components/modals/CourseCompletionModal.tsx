"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePostRateCourse } from "../../../api";
import { cn } from "@/lib/utils";
import { PartyPopper, Star } from "lucide-react";
import type { ComponentProps } from "react";
import { useEffect, useState } from "react";

const CLOSE_REASON = "close-press" as const;

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courseTitle: string;
  token: string;
  courseId: number;
  /** When true, stars are hidden (already rated). */
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
  const rateMutation = usePostRateCourse();

  const displayRating = hover || rating;

  useEffect(() => {
    if (open) {
      setRating(0);
      setHover(0);
    }
  }, [open]);

  const handleOpenChange: NonNullable<
    ComponentProps<typeof Dialog>["onOpenChange"]
  > = (nextOpen, eventDetails) => {
    if (!nextOpen && eventDetails.reason !== CLOSE_REASON) {
      eventDetails.cancel();
      return;
    }
    onOpenChange(nextOpen);
  };

  const handleDone = async () => {
    if (!isRated && rating > 0) {
      try {
        await rateMutation.mutateAsync({ token, courseId, rating });
      } catch {
        return;
      }
    }
    setRating(0);
    setHover(0);
    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={handleOpenChange}
      disablePointerDismissal
    >
      <DialogContent
        className="sm:max-w-md border-0 bg-transparent p-0 shadow-none"
        showCloseButton={false}
      >
        <div className="rounded-xl border-2 border-brand-500 bg-gray-50 p-3 sm:p-4">
          <div className="rounded-lg border border-dashed border-brand-300 px-6 py-8 sm:px-8 sm:py-10">
            <div className="flex flex-col items-center text-center">
              <PartyPopper
                className="size-16 shrink-0 text-green-600 sm:size-20"
                strokeWidth={1.5}
                aria-hidden
              />

              <DialogTitle className="heading-2 mt-6 text-gray-800">
                Congratulations!
              </DialogTitle>

              <p className="body-l mt-4 max-w-[320px] text-gray-700">
                You&apos;ve completed{" "}
                <span className="font-semibold text-gray-800">
                  &quot;{courseTitle}&quot;
                </span>{" "}
                Course!
              </p>

              {!isRated && (
                <>
                  <p className="mt-8 text-lg font-medium text-brand-400">
                    Rate your experience
                  </p>

                  <div
                    className="mt-4 flex justify-center gap-2 sm:gap-3"
                    role="group"
                    aria-label="Course rating"
                  >
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        className="rounded p-0.5 transition hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
                        onMouseEnter={() => setHover(value)}
                        onMouseLeave={() => setHover(0)}
                        onClick={() => setRating(value)}
                        aria-label={`${value} stars`}
                      >
                        <Star
                          className={cn(
                            "size-9 sm:size-11",
                            displayRating >= value
                              ? "fill-orange-500 text-orange-500"
                              : "fill-gray-200 text-gray-200",
                          )}
                          strokeWidth={0}
                        />
                      </button>
                    ))}
                  </div>
                </>
              )}

              <Button
                type="button"
                disabled={rateMutation.isPending}
                className="mt-10 w-full rounded-lg bg-brand-500 py-6 text-[16px] font-medium text-gray-50 hover:bg-brand-600 disabled:opacity-70"
                onClick={() => void handleDone()}
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CourseCompletionModal;
