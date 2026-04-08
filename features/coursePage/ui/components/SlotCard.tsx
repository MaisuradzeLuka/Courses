import { Dispatch, ReactNode, SetStateAction } from "react";

type Props = {
  disabled: boolean;
  variant: "vartical" | "horizontal";
  name: string;
  value: number;

  styles?: string;
  handleChange: Dispatch<SetStateAction<number | null>>;
  isActive: boolean;
  children?: ReactNode;
};

const SlotCard = ({
  disabled,
  variant,
  name,
  value,
  styles,

  isActive,
  children,
  handleChange,
}: Props) => {
  const colors = disabled
    ? "bg-gray-100 text-gray-200 "
    : isActive
      ? "bg-brand-100 border-brand-500! text-brand-500"
      : "bg-gray-50 text-gray-800";

  const layout =
    variant === "horizontal"
      ? "justify-center items-center"
      : "flex-col items-center";

  return (
    <label
      className={`w-full h-full flex ${layout} rounded-xl border border-gray-200 text-[16px] font-semibold p-2.5 ${colors}  hover:bg-brand-100 hover:border-brand-400! hover:text-brand-400 cursor-pointer transition ${styles}`}
    >
      <input
        type="radio"
        className="hidden"
        name={name}
        value={value}
        onChange={() => handleChange(value)}
        disabled={disabled}
      />

      {children}
    </label>
  );
};

export default SlotCard;
