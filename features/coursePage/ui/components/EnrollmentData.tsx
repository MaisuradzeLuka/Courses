"use client";

import { SingleCourseType } from "@/types";
import { Dispatch, SetStateAction, useState } from "react";
import Week from "./slots/Week";
import TimeSlots from "./slots/TimeSlots";
import SessionType from "./slots/SessionType";
import Form from "./Form";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

type Props = {
  data: SingleCourseType;
};

const EnrollmentData = ({ data }: Props) => {
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const [selectedSession, setSelectedSession] = useState<number | null>(null);
  const [priceModifier, setPriceModifier] = useState<number>(0);
  const [scheduleId, setScheduleId] = useState<number | null>(null);

  const [weekOpen, setWeekOpen] = useState(true);
  const [timeOpen, setTimeOpen] = useState(false);
  const [sessionOpen, setSessionOpen] = useState(false);

  const handleWeekSelect: Dispatch<SetStateAction<number | null>> = (value) => {
    const weekId = typeof value === "function" ? value(selectedWeek) : value;
    setSelectedWeek(weekId);
    setSelectedTime(null);
    setSelectedSession(null);
    setPriceModifier(0);
    setScheduleId(null);
    setTimeOpen(true);
    setSessionOpen(false);
  };

  const handleTimeSelect: Dispatch<SetStateAction<number | null>> = (value) => {
    const timeId = typeof value === "function" ? value(selectedTime) : value;
    setSelectedTime(timeId);
    setSelectedSession(null);
    setSessionOpen(true);
  };

  const handleSessionSelect: Dispatch<SetStateAction<number | null>> = (
    value,
  ) => {
    const sessionId =
      typeof value === "function" ? value(selectedSession) : value;
    setSelectedSession(sessionId);
  };

  return (
    <section className="col-span-3 space-y-2">
      <Collapsible open={weekOpen} onOpenChange={setWeekOpen}>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-4 cursor-pointer">
          <div className="flex items-center gap-3">
            <span className="flex size-6 items-center justify-center rounded-full border border-brand-500 text-sm font-semibold text-brand-500">
              1
            </span>
            <span className="heading-4 text-brand-800">Weekly Schedule</span>
          </div>
          <ChevronDown
            className={`size-5 text-gray-400 transition-transform duration-250 ${weekOpen ? "rotate-180" : ""}`}
          />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="pb-4">
            <Week
              postId={data.data.id}
              selectedWeek={selectedWeek}
              setSelectedWeek={handleWeekSelect}
            />
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible
        open={timeOpen}
        onOpenChange={setTimeOpen}
        disabled={!selectedWeek}
      >
        <CollapsibleTrigger
          className={`flex w-full items-center justify-between py-4 transition ${
            selectedWeek ? "cursor-pointer" : "opacity-50 cursor-not-allowed"
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="flex size-6 items-center justify-center rounded-full border border-brand-500 text-sm font-semibold text-brand-500">
              2
            </span>
            <span className="heading-4 text-brand-800">Time Slot</span>
          </div>
          <ChevronDown
            className={`size-5 text-gray-400 transition-transform duration-250 ${timeOpen ? "rotate-180" : ""}`}
          />
        </CollapsibleTrigger>
        <CollapsibleContent>
          {selectedWeek && (
            <div className="pb-4">
              <TimeSlots
                postId={data.data.id}
                weekId={selectedWeek}
                selectedTimeSlot={selectedTime}
                setSelectedTimeSlot={handleTimeSelect}
              />
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>

      <Collapsible
        open={sessionOpen}
        onOpenChange={setSessionOpen}
        disabled={!selectedTime}
      >
        <CollapsibleTrigger
          className={`flex w-full items-center justify-between py-4 transition ${
            selectedTime ? "cursor-pointer" : "opacity-50 cursor-not-allowed"
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="flex size-6 items-center justify-center rounded-full border border-brand-500 text-sm font-semibold text-brand-500">
              3
            </span>
            <span className="heading-4 text-brand-800">Session Type</span>
          </div>
          <ChevronDown
            className={`size-5 text-gray-400 transition-transform duration-250 ${sessionOpen ? "rotate-180" : ""}`}
          />
        </CollapsibleTrigger>
        <CollapsibleContent>
          {selectedTime && selectedWeek && (
            <div className="pb-4">
              <SessionType
                postId={data.data.id}
                weekId={selectedWeek}
                timeSlotId={selectedTime}
                selectedSessionType={selectedSession}
                setSelectedSessionType={handleSessionSelect}
                setPriceModifier={setPriceModifier}
                setScheduleId={setScheduleId}
              />
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>

      <Form
        disabled={!selectedSession || !selectedTime || !selectedWeek}
        basePrice={Number(data.data.basePrice)}
        courseId={data.data.id}
        priceModifier={priceModifier}
        scheduleId={scheduleId}
      />
    </section>
  );
};

export default EnrollmentData;
