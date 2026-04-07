"use client";

import { useState } from "react";
import Categories from "../Components/Categories";
import { CategoryType } from "@/types";
import Topics from "../Components/Topics";
import Instructors from "../Components/Instructors";

const SidebarFilter = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [topics, setTopics] = useState<CategoryType[]>([]);
  const [instructors, setInstructors] = useState<CategoryType[]>([]);

  return (
    <aside className="col-span-3">
      <div>
        <h2 className="heading-1 mb-8">Filters</h2>
      </div>

      <Categories filterItems={categories} setFilterItems={setCategories} />
      <Topics filterItems={topics} setFilterItems={setTopics} />
      <Instructors filterItems={instructors} setFilterItems={setInstructors} />
    </aside>
  );
};

export default SidebarFilter;
