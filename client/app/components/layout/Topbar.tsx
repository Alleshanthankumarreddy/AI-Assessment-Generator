"use client";

import {
  Bell,
  Menu,
} from "lucide-react";

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

  const { teacher } =
    useAuthStore();

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

        {/* NOTIFICATION */}
        <button className="relative">

          <Bell size={22} />

          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>

        </button>


        {/* PROFILE */}
        <div className="hidden sm:flex items-center gap-3">

          <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold">

            {initial}

          </div>


          <div>

            <p className="font-medium text-sm">

              {
                teacher
                  ? teacher.name
                  : "Guest"
              }

            </p>

          </div>

        </div>


        {/* MOBILE MENU */}
        <button
          onClick={() =>
            setMobileOpen(true)
          }
          className="lg:hidden"
        >

          <Menu size={26} />

        </button>

      </div>

    </header>

  );

};

export default Topbar;

