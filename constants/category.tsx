import { BsCodeSlash } from "react-icons/bs";
import { PiPalette, PiChartLineUpLight, PiLightbulb } from "react-icons/pi";

export const categoryIcons = {
  development: BsCodeSlash,
  design: PiPalette,
  business: PiChartLineUpLight,
  marketing: BsCodeSlash,
  "data-science": PiLightbulb,
} as const;

export type CategoryIconKey = keyof typeof categoryIcons;
