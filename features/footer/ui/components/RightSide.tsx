import { navLinks } from "@/constants/footer";
import Link from "next/link";

const RightSide = () => {
  return (
    <div className="flex gap-30">
      {navLinks.map((navLink) => (
        <div key={navLink.id}>
          <h4 className="heading-4 text-brand-800 mb-4">{navLink.title}</h4>

          <ul className="flex flex-col gap-2.5">
            {navLink.links.map((link) => (
              <li className="flex items-center gap-1 body-m font-normal! text-gray-500">
                {link.icon && <link.icon />}
                <Link href={link.link} key={link.id}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default RightSide;
