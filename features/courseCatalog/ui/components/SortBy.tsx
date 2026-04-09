import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { sortByData } from "@/constants/filter";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SortBy = () => {
  const router = useRouter();
  const [value, setValue] = useState("");

  const selectedItem = sortByData.find((item) => item.value === value);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sort = params.get("sort");

    if (sort) setValue(sort);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }

    const newPath = `${window.location.pathname}?${params.toString()}`;
    router.replace(newPath);
  }, [value]);

  return (
    <Select value={value} onValueChange={(v) => setValue(v ?? "")}>
      <SelectTrigger className="w-60 bg-gray-50 border-none px-5 py-5 text-[16px] font-medium text-gray-500">
        <span>Sort By: </span>
        <span className="body-s text-brand-500 ml-2">
          {selectedItem?.label ?? "Sort By"}
        </span>
      </SelectTrigger>

      <SelectContent
        side="bottom"
        align="start"
        sideOffset={4}
        alignItemWithTrigger={false}
        className="bg-gray-50 ring-0 shadow-none"
      >
        <SelectGroup className="p-0 h-full">
          {sortByData.map((item) => (
            <SelectItem
              key={item.id}
              value={item.value}
              className={`body-s px-5 py-2.5 text-gray-500 hover:text-brand-500 hover:bg-brand-100 cursor-pointer rounded-none ${selectedItem?.id === item.id ? "bg-brand-100 text-brand-500" : ""}`}
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
export default SortBy;
