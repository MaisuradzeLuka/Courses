"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TfiAngleRight } from "react-icons/tfi";

const BreadCrumbs = () => {
  const path = usePathname();

  const segments = path.split("/");

  const breadCrumbs = segments.map((segment, index) => {
    const href = segments.slice(0, index - 1).join("/");

    const label = segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

    return { href, label };
  });

  return (
    <nav className="flex items-center text-sm text-gray-500 body-m mb-8 my-16">
      <Link href="/" className="hover:text-gray-900">
        Home
      </Link>

      {breadCrumbs.slice(1).map((crumb, index) => (
        <span key={index} className="flex items-center">
          <span className="mx-2">
            <TfiAngleRight />
          </span>

          {index === breadCrumbs.length - 2 ? (
            <span className="text-brand-400 font-medium">{crumb.label}</span>
          ) : (
            <Link href={crumb.href} className="hover:text-gray-900">
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
};

export default BreadCrumbs;
