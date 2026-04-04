"use client";

import SignIn from "@/features/auth/ui/views/SignIn";
import SignUp from "@/features/auth/ui/views/SignUp";
import UserProfile from "@/features/userProfile/ui/views/UserProfile";
import Link from "next/link";
import { LuRocket, LuBookOpen } from "react-icons/lu";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [token, setToken] = useState<string>("");

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
          <Link href="browse-courses" className="body-l text-gray-600">
            Browse Courses
          </Link>
          {!token && (
            <div className="flex items-center gap-2">
              <SignIn />
              <SignUp />
            </div>
          )}

          {token && (
            <div className="flex items-center gap-9">
              <Link
                href="/"
                className="flex items-center gap-2 body-l text-gray-600"
              >
                <LuBookOpen className="mt-1" /> <span>Enrolled Courses</span>
              </Link>

              <UserProfile />
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
