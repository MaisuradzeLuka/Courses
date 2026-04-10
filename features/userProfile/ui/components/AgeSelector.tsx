import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ageData } from "@/constants/userProfile";

type Props = {
  value: number | undefined;
  onChange: (value: number) => void;
};

const AgeSelector = ({ value, onChange }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <Label className="body-xs text-gray-700">Age</Label>

      <Select
        value={value ? String(value) : undefined}
        onValueChange={(val) => onChange(Number(val))}
      >
        <SelectTrigger className="body-xs w-21 bg-gray-50 px-3 py-3.5 text-gray-300 border rounded-lg h-12! border-gray-200">
          <SelectValue placeholder="Age" />
        </SelectTrigger>

        <SelectContent className="bg-gray-50 ring-0 shadow-none">
          <SelectGroup>
            {ageData.map((age) => (
              <SelectItem
                key={age.id}
                value={String(age.value)}
                className="body-s px-5 py-2.5 text-gray-500 hover:text-brand-500 hover:bg-brand-100 cursor-pointer rounded-none"
              >
                {age.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default AgeSelector;
