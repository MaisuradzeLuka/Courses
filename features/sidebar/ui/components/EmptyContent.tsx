import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

const EmptyContent = ({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/browse");
    setIsOpen(false);
  };

  return (
    <div className="h-full flex flex-col justify-center">
      <div className="flex flex-col items-center gap-6">
        <Image
          src="/PackageOpen.png"
          alt="package icon"
          width={130}
          height={130}
          className="w-32 h-32"
        />

        <div className="text-center">
          <h3 className="heading-3 text-brand-800">No Enrolled Courses Yet</h3>
          <p className="max-w-65 body-xs text-brand-800 mt-2">
            Your learning journey starts here! Browse courses to get started.
          </p>
        </div>

        <button
          onClick={handleClick}
          className="text-[16px] py-4 px-6 rounded-lg bg-brand-500 text-gray-50 font-medium cursor-pointer"
        >
          Browse Courses
        </button>
      </div>
    </div>
  );
};

export default EmptyContent;
