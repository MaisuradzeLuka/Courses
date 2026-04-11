import BreadCrumbs from "@/components/shared/BreadCrumbs";
import CourseCatalog from "@/features/courseCatalog/ui/views/CourseCatalog";
import SidebarFilter from "@/features/sidebarFilter/ui/views/SidebarFilter";
import { Suspense } from "react";

export default function BrowsePage() {
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
          <CourseCatalog />
        </Suspense>
      </div>
    </div>
  );
}
