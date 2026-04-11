import { EnrollmentSlotSkeleton } from "@/features/coursePage/ui/skeletons";
import { timesData } from "@/constants/EnrollementSlots";
import { Dispatch, SetStateAction } from "react";
import SlotCard from "./SlotCard";
import { isDisabledSlot } from "@/lib/utils";
import { useGetTimeSlots } from "../../../api";

type Props = {
  postId: number;
  weekId: number;
  selectedTimeSlot: number | null;
  setSelectedTimeSlot: Dispatch<SetStateAction<number | null>>;
};

const TimeSlots = ({
  postId,
  weekId,
  selectedTimeSlot,
  setSelectedTimeSlot,
}: Props) => {
  const {
    data: timeSlots,
    isLoading,
    isError,
  } = useGetTimeSlots({ id: postId, weekId });

  if (isLoading) return <EnrollmentSlotSkeleton variant="time" />;
  if (!timeSlots || isError) return <div>Error</div>;

  const timeIds = timeSlots?.map((time) => time.id) || [];

  return (
    <div>
      <div className="grid grid-cols-3 gap-3 h-15">
        {timesData.map((time) => {
          const isDisabled = isDisabledSlot({
            uiId: time.id,
            dataIds: timeIds as number[],
          });

          const isActive = selectedTimeSlot === time.id;
          return (
            <SlotCard
              key={`time-${time.id}`}
              variant="horizontal"
              disabled={isDisabled}
              name="time"
              value={time.id}
              isActive={isActive}
              handleChange={setSelectedTimeSlot}
              styles="gap-3 group"
            >
              <time.icon
                className={`text-2xl group-hover:text-brand-500 ${!isDisabled && !isActive ? "text-gray-600" : ""}`}
              />
              <div
                className={`flex flex-col group-hover:text-brand-500 ${!isDisabled && !isActive ? "text-gray-500" : ""}`}
              >
                <h4>{time.label}</h4>
                <p className="text-xs">{time.time}</p>
              </div>
            </SlotCard>
          );
        })}
      </div>
    </div>
  );
};

export default TimeSlots;
