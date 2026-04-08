import { PiCloudSunThin, PiSun, PiMoon, PiUsers } from "react-icons/pi";
import { FiMonitor, FiLink } from "react-icons/fi";
import { TbCirclesRelation } from "react-icons/tb";

export const weeksData = [
  { id: 1, label: "Mon - Wed" },
  { id: 2, label: "Tue - Thu" },
  { id: 3, label: "Wed - Fri" },
  { id: 4, label: "Weekend" },
];

export const timesData = [
  {
    id: 1,
    label: "Morning",
    time: "9:00 AM - 11:00 AM",
    icon: PiCloudSunThin,
  },
  {
    id: 2,
    label: "Afternoon",
    time: "2:00 PM - 4:00 PM",
    icon: PiSun,
  },
  {
    id: 3,
    label: "Evening",
    time: "6:00 PM - 8:00 PM",
    icon: PiMoon,
  },
];

export const sessionData = [
  {
    id: 1,
    icon: FiMonitor,
    label: "online",
    priceModifier: "Included",
    location: "Google Meet",
  },
  {
    id: 2,
    icon: PiUsers,
    label: "In-Person",
    priceModifier: "+ $150",
    location: "Chavchavadze St.34",
  },
  {
    id: 3,
    icon: TbCirclesRelation,
    label: "Hybrid",
    priceModifier: "+ $50",
    location: "Chavchavadze St.34",
  },
];
