import { weeksData } from "@/constants/EnrollementSlots";
import { Dispatch, SetStateAction } from "react";
import SlotCard from "./SlotCard";
import { isDisabledSlot } from "@/lib/utils";
import { getWeeks } from "../../api";

type Props = {
  postId: number;
  selectedWeek: number | null;
  setSelectedWeek: Dispatch<SetStateAction<number | null>>;
};

const Week = ({ postId, selectedWeek, setSelectedWeek }: Props) => {
  const { data: weeks, isLoading, isError } = getWeeks(postId);

  if (isLoading) return <div>Loading...</div>;
  if (!weeks || isError) return <div>Error</div>;

  const weekIds = weeks.map((week) => week.id);
  return (
    <div>
      <h3 className="heading-3 text-brand-800 mb-6.5">Weekly Schedule</h3>
      <div className="grid grid-cols-4 gap-3 h-23">
        {weeksData.map((week) => (
          <SlotCard
            key={`week-${week.id}`}
            variant="horizontal"
            disabled={isDisabledSlot({
              uiId: week.id,
              dataIds: weekIds as number[],
            })}
            name="week"
            value={week.id}
            isActive={selectedWeek === week.id}
            handleChange={setSelectedWeek}
          >
            {week.label}
          </SlotCard>
        ))}
      </div>
    </div>
  );
};

export default Week;
