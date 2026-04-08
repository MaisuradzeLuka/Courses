"use client";

import { SingleCourseType } from "@/types";
import { useState } from "react";
import Week from "./Week";
import TimeSlots from "./TimeSlots";
import SessionType from "./SessionType";
import Form from "./Form";

type Props = {
  data: SingleCourseType;
  token: string | null;
};

const EnrollmentData = ({ data, token }: Props) => {
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const [selectedSession, setSelectedSession] = useState<number | null>(null);
  const [priceModifier, setPriceModifier] = useState<number>(0);
  const [scheduleId, setScheduleId] = useState<number | null>(null);

  console.log(scheduleId);

  return (
    <section className="col-span-3">
      <Week
        postId={data.data.id}
        selectedWeek={selectedWeek}
        setSelectedWeek={setSelectedWeek}
      />

      {selectedWeek && (
        <TimeSlots
          postId={data.data.id}
          weekId={selectedWeek}
          selectedTimeSlot={selectedTime}
          setSelectedTimeSlot={setSelectedTime}
        />
      )}

      {selectedTime && selectedWeek && (
        <SessionType
          postId={data.data.id}
          weekId={selectedWeek}
          timeSlotId={selectedTime}
          selectedSessionType={selectedSession}
          setSelectedSessionType={setSelectedSession}
          setPriceModifier={setPriceModifier}
          setScheduleId={setScheduleId}
        />
      )}

      <Form
        basePrice={Number(data.data.basePrice)}
        courseId={data.data.id}
        priceModifier={priceModifier}
        token={token}
        scheduleId={scheduleId}
      />
    </section>
  );
};

export default EnrollmentData;
