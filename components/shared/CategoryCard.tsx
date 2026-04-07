import { CategoryIconKey, categoryIcons } from "@/constants/category";
import Image from "next/image";

type Props = {
  label: string;
  id: number;
  variant: "dark" | "light";
  active: boolean;
  avatar?: string;
  icon?: CategoryIconKey;
};

const CategoryCard = ({ variant, label, active, avatar, icon }: Props) => {
  const CatIcon = icon ? categoryIcons[icon] : "";

  return (
    <div
      className={`w-max flex items-center gap-2 py-2 px-3 rounded-xl  body-s ${variant === "dark" ? "bg-gray-100 text-gray-600" : "bg-gray-50 text-gray-500"} ${active ? "bg-brand-100! text-brand-700!" : ""}`}
    >
      {CatIcon && <CatIcon className="w-6 h-6" />}
      {avatar && (
        <Image
          width={30}
          height={30}
          src={avatar}
          alt={avatar}
          className="w-7.5 h-7.5 rounded-sm object-cover "
        />
      )}
      {label}
    </div>
  );
};

export default CategoryCard;
