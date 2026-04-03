"use client";

import SignIn from "@/features/auth/ui/views/SignIn";
import SignUp from "@/features/auth/ui/views/SignUp";
import Image from "next/image";
import Link from "next/link";
import { LuRocket, LuBookOpen } from "react-icons/lu";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user") || "");

  return (
    <div className="py-6 border-b border-gray-200">
      <nav className="flex items-center justify-between max-w-400 w-full mx-auto ">
        <Link href="/" className="flex w-min rounded-[14px] bg-brand-500 p-4 ">
          <LuRocket className="text-3xl text-white" />
        </Link>

        <div className="flex items-center gap-9">
          <button className="body-l text-gray-600">Browse Courses</button>
          {!user && (
            <div className="flex items-center gap-2">
              <SignIn />
              <SignUp />
            </div>
          )}

          {user && (
            <div className="flex items-center gap-9">
              <Link
                href="/"
                className="flex items-center gap-2 body-l text-gray-600"
              >
                <LuBookOpen className="mt-1" /> <span>Enrolled Courses</span>
              </Link>

              <div className="relative bg-brand-50 rounded-full p-2">
                <Image
                  src={user.avatar || "/User.png"}
                  width={38}
                  height={38}
                  alt="user avatar"
                />

                <Image
                  src="/ping.png"
                  width={15}
                  height={15}
                  alt="avatar ping"
                  className="absolute bottom-0 right-0"
                />
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
