import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { sortByData } from "@/constants/filter";
import { useRouter, useSearchParams } from "next/navigation";

const SortBy = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const value = searchParams.get("sort") || "";
  const selectedItem = sortByData.find((item) => item.value === value);

  const handleChange = (newValue: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newValue) {
      params.set("sort", newValue);
    } else {
      params.delete("sort");
    }

    router.replace(`?${params.toString()}`);
  };

  return (
    <Select value={value} onValueChange={(v) => handleChange(v ?? "")}>
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
