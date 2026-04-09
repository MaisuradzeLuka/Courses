import { useSearchParams } from "next/navigation";

const Footer = () => {
  const searchParams = useSearchParams();
  const paramCount = searchParams.size;

  return (
    <div className="body-xs text-gray-400 mt-6 pt-4 border-t border-gray-300">
      <p>{paramCount} Filters Active</p>
    </div>
  );
};

export default Footer;
