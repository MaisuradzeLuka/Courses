import { Suspense } from "react";
import BreadCrumbs from "@/components/shared/BreadCrumbs";
import CourseCatalog from "@/features/courseCatalog/ui/views/CourseCatalog";
import SidebarFilter from "@/features/sidebarFilter/ui/views/SidebarFilter";

export const dynamic = "force-dynamic";

export default function BrowsePage() {
  return (
    <div>
      <BreadCrumbs />

      <Suspense>
        <div className="grid grid-cols-12 gap-22 mb-40">
          <SidebarFilter />
          <CourseCatalog />
        </div>
      </Suspense>
    </div>
  );
}
