import BreadCrumbs from "@/components/shared/BreadCrumbs";
import CoursePage from "@/features/coursePage/ui/views/CoursePage";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <div className="mb-40">
      <BreadCrumbs />
      <CoursePage id={id} />
    </div>
  );
};

export default page;
