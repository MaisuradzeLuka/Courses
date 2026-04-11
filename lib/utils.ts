import { CategoryType } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const findExistingItem = (
  id: number,
  selectedFilterItems: CategoryType[],
) => {
  return selectedFilterItems.some((item) => item.id === id);
};

const SIBLING_COUNT = 1;

export function getPageRange(
  current: number,
  last: number,
): (number | "...")[] {
  const delta = SIBLING_COUNT;

  const rangeStart = Math.max(2, current - delta);
  const rangeEnd = Math.min(last - 1, current + delta);

  const pages: (number | "...")[] = [];

  pages.push(1);

  if (rangeStart > 2) pages.push("...");

  for (let i = rangeStart; i <= rangeEnd; i++) {
    pages.push(i);
  }

  if (rangeEnd < last - 1) pages.push("...");

  if (last > 1) pages.push(last);

  return pages;
}

export function isDisabledSlot({
  uiId,
  dataIds,
}: {
  uiId: number;
  dataIds: number[];
}) {
  const isDisabled = !dataIds.includes(uiId);

  return isDisabled;
}

export function formatFileSizeMB(bytes: number, decimals = 2) {
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(decimals)} MB`;
}
