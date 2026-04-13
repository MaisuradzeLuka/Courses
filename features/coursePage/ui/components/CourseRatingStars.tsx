"use client";

import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

type Props = {
  value: number;
  hover: number;
  onHover: (v: number) => void;
  onSelect: (v: number) => void;
  disabled?: boolean;
  className?: string;
};

const CourseRatingStars = ({
  value,
  hover,
  onHover,
  onSelect,
  disabled,
  className,
}: Props) => {
  const display = disabled ? value : hover || value;

  return (
    <div
      className={cn("flex justify-center gap-2 sm:gap-3", className)}
      role="group"
      aria-label="Course rating"
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={disabled}
          className={cn(
            "rounded p-0.5 transition hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500",
            disabled && "pointer-events-none cursor-default opacity-70",
          )}
          onMouseEnter={() => !disabled && onHover(star)}
          onMouseLeave={() => !disabled && onHover(0)}
          onClick={() => !disabled && onSelect(star)}
          aria-label={`${star} stars`}
        >
          <Star
            className={cn(
              "size-9 sm:size-11",
              display >= star
                ? "fill-warning text-warning"
                : "fill-gray-200 text-gray-200",
            )}
            strokeWidth={0}
          />
        </button>
      ))}
    </div>
  );
};

export default CourseRatingStars;
