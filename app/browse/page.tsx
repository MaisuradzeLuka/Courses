import BreadCrumbs from "@/components/shared/BreadCrumbs";
import CourseCatalog from "@/features/courseCatalog/ui/views/CourseCatalog";
import SidebarFilter from "@/features/sidebarFilter/ui/views/SidebarFilter";
import { SearchParamsType } from "@/types";
import { Suspense } from "react";

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<SearchParamsType>;
}) {
  const { categories, topics, instructors, page, sort } = await searchParams;
  return (
    <div>
      <BreadCrumbs />

      <div className="grid grid-cols-12 gap-22 mb-40">
        <Suspense
          fallback={
            <div className="col-span-12 py-16 text-center body-s text-gray-600">
              Loading courses…
            </div>
          }
        >
          <SidebarFilter />
          <CourseCatalog categories={categories || []} />
        </Suspense>
      </div>
    </div>
  );
}
