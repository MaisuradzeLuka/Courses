import { socLinks } from "@/constants/footer";
import Link from "next/link";
import { LuRocket } from "react-icons/lu";

const LeftSide = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Link href="/" className="flex w-min rounded-[14px] bg-brand-500 p-4 ">
          <LuRocket className="text-3xl text-white" />
        </Link>

        <p className="body-xl text-brand-800">Bootcamp</p>
      </div>

      <p className="max-w-60 body-xs text-brand-800">
        Your learning journey starts here! Browse courses to get started.
      </p>

      <div className="flex items-center gap-5.5 mt-2">
        {socLinks.map((socLink) => (
          <Link href={socLink.link} key={socLink.id}>
            <socLink.icon className="text-brand-400 text-[19px]" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LeftSide;
