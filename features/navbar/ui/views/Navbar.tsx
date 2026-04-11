"use client";

import SignIn from "@/features/auth/ui/views/SignIn";
import SignUp from "@/features/auth/ui/views/SignUp";
import UserProfile from "@/features/userProfile/ui/views/UserProfile";
import Link from "next/link";
import { LuRocket } from "react-icons/lu";
import EnrolledCourses from "@/features/sidebar/ui/views/EnrolledCourses";
import { useGetUser } from "../../api";
import { usePathname } from "next/navigation";
import { useAuthModal } from "@/hooks/useAuthModal";
import SparkleIcon from "../components/SparkleIcon";

const Navbar = () => {
  const pathname = usePathname();
  const { token } = useAuthModal();
  const { data } = useGetUser(token);

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
            <SparkleIcon className="size-[26px] shrink-0 text-current" />
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
              <EnrolledCourses />
              <UserProfile {...data} />
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
