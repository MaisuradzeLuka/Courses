type Props = {
  label: string;
  id: number;
  variant: "dark" | "light";
  active: boolean;
};

const CategoryCard = ({ variant, label, active }: Props) => {
  return (
    <div
      className={`w-max flex items-center gap-2 py-2 px-3 rounded-xl  body-s ${variant === "dark" ? "bg-gray-100 text-gray-600" : "bg-gray-50 text-gray-500"} ${active ? "bg-brand-100! text-brand-700!" : ""}`}
    >
      {label}
    </div>
  );
};

export default CategoryCard;
