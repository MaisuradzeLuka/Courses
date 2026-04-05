import BreadCrumbs from "@/components/shared/BreadCrumbs";
import CourseCatalog from "@/features/courseCatalog/ui/views/CourseCatalog";
import SidebarFilter from "@/features/sidebarFilter/ui/views/SidebarFilter";

const page = () => {
  return (
    <div>
      <BreadCrumbs />

      <div className="grid grid-cols-12 gap-22 mb-40">
        <SidebarFilter />
        <CourseCatalog />
      </div>
    </div>
  );
};

export default page;
