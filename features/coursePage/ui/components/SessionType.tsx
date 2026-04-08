import { sessionData } from "@/constants/EnrollementSlots";
import { Dispatch, SetStateAction } from "react";
import SlotCard from "./SlotCard";
import { isDisabledSlot } from "@/lib/utils";
import { useGetSessionType } from "../../api";

type Props = {
  postId: number;
  weekId: number;
  timeSlotId: number;
  selectedSessionType: number | null;
  setSelectedSessionType: Dispatch<SetStateAction<number | null>>;
  setPriceModifier: Dispatch<SetStateAction<number>>;
  setScheduleId: Dispatch<SetStateAction<number | null>>;
};

const SessionType = ({
  postId,
  weekId,
  timeSlotId,
  selectedSessionType,
  setPriceModifier,
  setSelectedSessionType,
  setScheduleId,
}: Props) => {
  const {
    data: sessionTypes,
    isLoading,
    isError,
  } = useGetSessionType({ id: postId, weekId, timeId: timeSlotId });

  if (isLoading) return <div>Loading...</div>;
  if (!sessionTypes || isError) return <div>Error</div>;

  const sessionIds = sessionTypes?.map((session) => session.id) || [];

  const handleChange = (sessionId: number, priceModifier: string) => {
    const match = priceModifier.match(/\d+/);
    const price = match ? Number(match[0]) : 0;

    setSelectedSessionType(sessionId);
    setPriceModifier(price);
    setScheduleId(sessionTypes[0].courseScheduleId);
  };

  return (
    <div className="mt-12">
      <h3 className="heading-3 text-brand-800 mb-6.5">Session Type</h3>
      <div className="grid grid-cols-3 gap-3">
        {sessionData.map((session) => {
          const isDisabled = isDisabledSlot({
            uiId: session.id,
            dataIds: sessionIds as number[],
          });

          const isActive = selectedSessionType === session.id;
          return (
            <SlotCard
              key={`session-${session.id}`}
              variant="vartical"
              disabled={isDisabled}
              name="session"
              value={session.id}
              isActive={isActive}
              handleChange={() =>
                handleChange(session.id, session.priceModifier)
              }
              styles="gap-1.5"
            >
              <session.icon
                className={`text-2xl hover:text-brand-500 ${!isDisabled && !isActive ? "text-gray-600" : ""}`}
              />
              {/* <div
                    className={`flex flex-col hover:text-brand-500 ${!isDisabled && !isActive ? "text-gray-500" : ""}`}
                  > */}
              <h4>{session.label}</h4>
              <p className="text-xs">{session.location}</p>
              {/* </div> */}
              <p>{session.priceModifier}</p>
            </SlotCard>
          );
        })}
      </div>
    </div>
  );
};

export default SessionType;
