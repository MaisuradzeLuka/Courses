import CategoryCard from "@/components/shared/CategoryCard";
import { CategoryIconKey } from "@/constants/category";
import { findExistingItem } from "@/lib/utils";
import { CategoryType } from "@/types";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

type Props = {
  paramKey: string;
  title: string;
  filterItems: CategoryType[];
  selectedFilterItems: CategoryType[];
  setSelectedFilterItems: Dispatch<SetStateAction<CategoryType[]>>;
};

const FilterLayout = ({
  paramKey,
  title,
  filterItems,
  selectedFilterItems,
  setSelectedFilterItems,
}: Props) => {
  const router = useRouter();

  const addSearchParams = (items: CategoryType[]) => {
    const params = new URLSearchParams(window.location.search);

    params.delete(paramKey);
    params.delete("topics[]");

    items.forEach((item) => {
      params.append(paramKey, item.id.toString());
    });

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleClick = (id: number, label: string) => {
    const existingItem = findExistingItem(id, selectedFilterItems);

    let newSelectedItems;

    if (existingItem) {
      newSelectedItems = selectedFilterItems.filter(
        (category) => category.id !== id,
      );
    } else {
      newSelectedItems = [...selectedFilterItems, { id, name: label }];
    }

    setSelectedFilterItems(newSelectedItems);
    addSearchParams(newSelectedItems);
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
                onClick={() => handleClick(item.id, item.name)}
              />
              <CategoryCard
                avatar={item.avatar}
                icon={item.icon as CategoryIconKey}
                id={item.id}
                label={item.name}
                variant="light"
                active={findExistingItem(item.id, selectedFilterItems)}
              />
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterLayout;
