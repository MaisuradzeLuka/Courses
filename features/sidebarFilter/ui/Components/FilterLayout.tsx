import CategoryCard from "@/components/shared/CategoryCard";
import { CategoryIconKey } from "@/constants/category";
import { CategoryType } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  paramKey: string;
  title: string;
  filterItems: CategoryType[];
};

const FilterLayout = ({ paramKey, title, filterItems }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedIds = searchParams.getAll(paramKey).map(Number);

  const handleClick = (id: number) => {
    const params = new URLSearchParams(searchParams.toString());

    const isSelected = selectedIds.includes(id);

    params.delete(paramKey);
    params.delete("page");

    if (paramKey === "categories[]") {
      params.delete("topics[]");
    }

    const newIds = isSelected
      ? selectedIds.filter((sid) => sid !== id)
      : [...selectedIds, id];

    newIds.forEach((sid) => {
      params.append(paramKey, sid.toString());
    });

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div>
      <h4 className="body-m text-gray-500 mb-6">{title}</h4>

      <ul className="flex flex-wrap gap-2 mb-14">
        {filterItems.map((item) => (
          <li key={item.id} className="cursor-pointer">
            <label className="cursor-pointer">
              <input
                type="checkbox"
                className="hidden"
                checked={selectedIds.includes(item.id)}
                onChange={() => handleClick(item.id)}
              />
              <CategoryCard
                avatar={item.avatar}
                icon={item.icon as CategoryIconKey}
                id={item.id}
                label={item.name}
                variant="light"
                active={selectedIds.includes(item.id)}
              />
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterLayout;
