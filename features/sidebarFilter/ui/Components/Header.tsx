import { usePathname, useRouter } from "next/navigation";
import { IoCloseOutline } from "react-icons/io5";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    router.push(pathname);
  };

  return (
    <div className="flex justify-between items-center mb-8">
      <h2 className="heading-1  h-min!">Filters</h2>

      <button
        onClick={handleClick}
        className="flex items-center gap-1 font-medium text-gray-400 cursor-pointer mt-4"
      >
        <span>Clear All Filters</span> <IoCloseOutline className="text-xl" />
      </button>
    </div>
  );
};

export default Header;
