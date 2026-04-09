"use client";

import SignIn from "@/features/auth/ui/views/SignIn";
import SignUp from "@/features/auth/ui/views/SignUp";
import UserProfile from "@/features/userProfile/ui/views/UserProfile";
import Link from "next/link";
import { LuRocket } from "react-icons/lu";
import { useEffect, useState } from "react";
import EnrolledCourses from "@/features/sidebar/ui/views/EnrolledCourses";
import { useGetUser } from "../../api";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Navbar = () => {
  const pathname = usePathname();

  const [token, setToken] = useState<string>("");
  const { data } = useGetUser(token);

  useEffect(() => {
    const storedToken = localStorage.getItem("token") || "";
    setToken(storedToken);
  }, []);

  return (
    <div className="py-6 border-b border-gray-200">
      <nav className="flex items-center justify-between max-w-400 w-full mx-auto ">
        <Link href="/" className="flex w-min rounded-[14px] bg-brand-500 p-4 ">
          <LuRocket className="text-3xl text-white" />
        </Link>

        <div className="flex items-center gap-9">
          <Link
            href="/browse"
            className={`flex items-center gap-1 body-l ${pathname === "/browse" ? "text-brand-500" : "text-gray-600"} hover:text-brand-500 transition`}
          >
            <Image
              src="/sparkleIcon.svg"
              alt="sparkle icon"
              width={26}
              height={26}
              className="w-6.5 h-6.5 text-purple-500"
            />
            Browse Courses
          </Link>

          {!data && (
            <div className="flex items-center gap-2">
              <SignIn />
              <SignUp />
            </div>
          )}

          {data && (
            <div className="flex items-center gap-9">
              <EnrolledCourses token={token} />
              <UserProfile {...data} />
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
