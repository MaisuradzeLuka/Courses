"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { PiStarThin, PiStarFill } from "react-icons/pi";
import { usePostRateCourse } from "../../api";
import { useAuthModal } from "@/hooks/useAuthModal";

type Props = {
  isRated: boolean;
  token: string;
  courseId: number;
};

const RateComponent = ({ isRated, courseId, token }: Props) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const mutation = usePostRateCourse();

  const handleRating = async (rating: number) => {
    try {
      await mutation.mutateAsync({ token, courseId, rating });
    } catch (error: any) {
      setError(error.message);
    }
  };

  if (error) {
    <div className="flex flex-col items-center justify-center gap-4.5 py-10 bg-gray-50 p-4 rounded-lg">
      <p className="body-s text-error">{error}</p>
    </div>;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4.5 py-10 bg-gray-50 p-4 rounded-lg">
      {isRated ? (
        <p>You have already rated this course</p>
      ) : (
        <>
          <p className="body-s text-gray-600">Rate your experience</p>

          <div className="flex gap-4.5">
            {[1, 2, 3, 4, 5].map((star) => {
              // const starValue = index + 1;

              return (hover || rating) >= star ? (
                <PiStarFill
                  key={star}
                  className="w-12.5 h-12.5 cursor-pointer text-yellow-400 transition"
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => setRating(star)}
                />
              ) : (
                <PiStarThin
                  key={star}
                  className="w-12.5 h-12.5 cursor-pointer text-gray-300 transition"
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => handleRating(star)}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default RateComponent;
