"use client";

import { useState } from "react";
import Categories from "../Components/Categories";
import { CategoryType } from "@/types";
import Topics from "../Components/Topics";
import Instructors from "../Components/Instructors";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const SidebarFilter = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [topics, setTopics] = useState<CategoryType[]>([]);
  const [instructors, setInstructors] = useState<CategoryType[]>([]);

  return (
    <aside className="col-span-3">
      <Header />

      <Categories filterItems={categories} setFilterItems={setCategories} />
      <Topics filterItems={topics} setFilterItems={setTopics} />
      <Instructors filterItems={instructors} setFilterItems={setInstructors} />

      <Footer />
    </aside>
  );
};

export default SidebarFilter;
