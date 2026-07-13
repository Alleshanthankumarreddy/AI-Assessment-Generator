"use client";

import {
  Bell,
  Menu,
} from "lucide-react";

import Link from "next/link";
import { LogOut } from "lucide-react";
import {logoutTeacher} from "../../../lib/auth";
import { useRouter } from "next/navigation";

import {
  usePathname,
} from "next/navigation";

import useAuthStore
from "../../../store/authStore";

interface Props {

  setMobileOpen: (
    value: boolean
  ) => void;

}

const Topbar = ({
  setMobileOpen,
}: Props) => {

  const {
  teacher,
  logout,
} = useAuthStore();

  const pathname =
    usePathname();

  const getPageTitle = () => {

    switch (pathname) {

      case "/assignments":
        return "Assignments";

      case "/generate-assignment":
        return "AI Generator";

      case "/profile":
        return "Profile";

      default:
        return teacher
          ? `Welcome, ${teacher.name}`
          : "Welcome";

    }

  };

  const pageTitle =
    getPageTitle();

  const initial =
    teacher?.name
      ?.charAt(0)
      .toUpperCase() || "W";

  const router =
  useRouter();


  const handleLogout =
  async () => {

    try {

      await logoutTeacher();

      logout();

      router.push(
        "/login"
      );

    } catch (error) {

      console.log(error);

    }

};

  return (

    <header className="h-20 bg-white border border-gray-200 flex items-center justify-between px-4 lg:px-8 rounded-2xl">

      {/* LEFT */}
      <div>

        <h2 className="text-lg lg:text-xl font-bold text-black">

          {pageTitle}

        </h2>

      </div>


      {/* RIGHT */}
      <div className="flex items-center gap-4 lg:gap-5">

        {/* LOGIN BUTTON */}
        {
          !teacher && (

            <Link
              href="/login"
              className="hidden sm:flex items-center justify-center bg-black text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:scale-105 transition"
            >

              Login

            </Link>

          )
        }

        {/* NOTIFICATION */}
        {
          teacher && (

            <button className="relative text-black hover:text-gray-600 transition">

              <Bell size={22} />

              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>

            </button>

          )
        }

        {/* PROFILE */}
        {
  teacher && (

    <div className="hidden sm:flex items-center gap-4">

      {/* PROFILE */}
      <div className="flex items-center gap-3">

        <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold">

          {initial}

        </div>

        <div>

          <p className="font-medium text-sm">

            {teacher.name}

          </p>

        </div>

      </div>

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-red-600 transition"
      >

        <LogOut size={16} />

        Logout

      </button>

    </div>

  )
}

        {/* MOBILE LOGIN */}
        {
          !teacher && (

            <Link
              href="/login"
              className="sm:hidden bg-black text-white px-4 py-2 rounded-xl text-sm font-medium"
            >

              Login

            </Link>

          )
        }
        {
  teacher && (

    <button
      onClick={handleLogout}
      className="sm:hidden bg-red-500 text-white px-4 py-2 rounded-xl text-sm font-medium"
    >

      Logout

    </button>

  )
}

        {/* MOBILE MENU */}
        <button
          onClick={() =>
            setMobileOpen(true)
          }
          className="lg:hidden text-black hover:text-gray-600 transition"
        >

          <Menu size={26} />

        </button>

      </div>

    </header>

  );

};

export default Topbar;