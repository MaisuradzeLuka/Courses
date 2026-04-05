import CategoryCard from "@/components/shared/CategoryCard";
import { CategoryType } from "@/types";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

type Props = {
  title: string;
  filterItems: CategoryType[];
  selectedFilterItems: CategoryType[];
  setSelectedFilterItems: Dispatch<SetStateAction<CategoryType[]>>;
};

const FilterLayout = ({
  title,
  filterItems,
  selectedFilterItems,
  setSelectedFilterItems,
}: Props) => {
  const router = useRouter();

  const findExistingItem = (id: number) => {
    return selectedFilterItems.some((item) => item.id === id);
  };

  const addSearchParams = (items: CategoryType[]) => {
    const searchParams = new URLSearchParams(window.location.search);

    searchParams.delete("category[]");

    const ids = items.map((item) => item.id).join("");

    searchParams.append("category[]", ids.toString());

    const newPath = `${window.location.pathname}?${searchParams.toString()}`;
    router.push(newPath, { scroll: false });
  };

  const handleClick = (id: number, label: string) => {
    const existingItem = findExistingItem(id);

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
                id={item.id}
                label={item.name}
                variant="light"
                active={findExistingItem(item.id)}
              />
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterLayout;
