import { sessionData } from "@/constants/EnrollementSlots";
import { Dispatch, SetStateAction } from "react";
import SlotCard from "./SlotCard";
import { useGetSessionType } from "../../api";
import { IoWarningOutline } from "react-icons/io5";
import { RiErrorWarningLine } from "react-icons/ri";

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
          const correspondingSession = sessionTypes.find(
            (sessionType) => sessionType.id === session.id,
          );

          const isActive = selectedSessionType === session.id;
          const seatCount = correspondingSession?.availableSeats || 0;

          const isDisabled = seatCount > 0;

          return (
            <div
              key={`session-${session.id}`}
              className="flex flex-col items-center gap-2"
            >
              <SlotCard
                variant="vartical"
                disabled={!isDisabled}
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

                <h4>{session.label}</h4>
                <p className="text-xs">{session.location}</p>
                <p>{session.priceModifier}</p>
              </SlotCard>

              {seatCount === 0 ? (
                <p className="flex items-center gap-1 text-xs text-error">
                  <RiErrorWarningLine className="text-sm" />
                  Fully Booked
                </p>
              ) : seatCount <= 5 ? (
                <p className="flex items-center gap-1 text-xs text-warning">
                  <IoWarningOutline className="text-sm" /> Only {seatCount}{" "}
                  Remaining
                </p>
              ) : (
                <p className="text-xs text-gray-700">
                  {seatCount} Seats Available
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SessionType;
