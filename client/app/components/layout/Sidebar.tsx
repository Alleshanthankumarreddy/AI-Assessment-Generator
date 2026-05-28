"use client";

import Image from "next/image";

import Link from "next/link";

import {
  Home,
  FileText,
  Sparkles,
  X,
} from "lucide-react";

import VedaAI from "../../assets/VedaAI.png";

interface Props {

  mobileOpen: boolean;

  setMobileOpen: (
    value: boolean
  ) => void;

}

const Sidebar = ({
  mobileOpen,
  setMobileOpen,
}: Props) => {

  return (

    <>

      {/* OVERLAY */}
      {
        mobileOpen && (

          <div
            onClick={() =>
              setMobileOpen(false)
            }
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          />

        )
      }

      {/* SIDEBAR */}
      <aside
        className={`

          fixed top-0 right-0 z-50
          w-[260px] h-screen
          bg-[#f8f8f8]
          border-l border-gray-200
          flex flex-col justify-between
          p-5
          transition-transform duration-300

          lg:left-0
          lg:border-r
          lg:border-l-0
          lg:translate-x-0

          ${
            mobileOpen

              ? "translate-x-0"

              : "translate-x-full"
          }

        `}
      >

        {/* TOP */}
        <div>

          {/* MOBILE CLOSE */}
          <div className="flex items-center justify-between lg:hidden mb-6">

            <h2 className="font-bold text-xl">
              Menu
            </h2>

            <button
              onClick={() =>
                setMobileOpen(false)
              }
            >

              <X size={24} />

            </button>

          </div>


          {/* LOGO */}
          <div className="flex items-center gap-3 mb-8">

            <Image
              src={VedaAI}
              alt="VedaAI"
              width={42}
              height={42}
              className="rounded-xl"
            />

            <h1 className="text-2xl font-bold text-gray-800">

              VedaAI

            </h1>

          </div>


          {/* CREATE */}
          <Link
            href="/generate-assignment"
            onClick={() =>
              setMobileOpen(false)
            }
            className="w-full flex items-center justify-center bg-black text-white py-3 rounded-2xl font-medium shadow-lg hover:scale-[1.02] transition mb-8"
          >

            <Sparkles size={18} />Create Assignment

          </Link>


          {/* MENU */}
          <div className="space-y-2">

            <Link
              href="/"
              onClick={() =>
                setMobileOpen(false)
              }
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-white transition"
            >

              <Home size={18} />

              Home

            </Link>


            <Link
              href="/assignments"
              onClick={() =>
                setMobileOpen(false)
              }
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-white transition"
            >

              <FileText size={18} />

              Assignments

            </Link>


            <Link
              href="/generate-assignment"
              onClick={() =>
                setMobileOpen(false)
              }
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-white transition"
            >

              <Sparkles size={18} />

              AI Generator

            </Link>

          </div>

        </div>

      </aside>

    </>

  );

};

export default Sidebar;
