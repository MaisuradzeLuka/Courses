import { timesData } from "@/constants/EnrollementSlots";
import { Dispatch, SetStateAction } from "react";
import SlotCard from "./SlotCard";
import { isDisabledSlot } from "@/lib/utils";
import { useGetTimeSlots } from "../../api";

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

  if (isLoading) return <div>Loading...</div>;
  if (!timeSlots || isError) return <div>Error</div>;

  const timeIds = timeSlots?.map((time) => time.id) || [];

  return (
    <div className="mt-12">
      <h3 className="heading-3 text-brand-800 mb-6.5">Time Slot</h3>
      <div className="grid grid-cols-3 gap-3 h-15 ">
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
              styles="gap-3"
            >
              <time.icon
                className={`text-2xl hover:text-brand-500 ${!isDisabled && !isActive ? "text-gray-600" : ""}`}
              />
              <div
                className={`flex flex-col hover:text-brand-500 ${!isDisabled && !isActive ? "text-gray-500" : ""}`}
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
