"use client";

import Categories from "../Components/Categories";
import Topics from "../Components/Topics";
import Instructors from "../Components/Instructors";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const SidebarFilter = () => {
  return (
    <aside className="col-span-3">
      <Header />

      <Categories />
      <Topics />
      <Instructors />

      <Footer />
    </aside>
  );
};

export default SidebarFilter;
