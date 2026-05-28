"use client";

import {
  useState,
} from "react";

import Sidebar
from "./Sidebar";

import Topbar
from "./Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [
    mobileOpen,
    setMobileOpen,
  ] = useState(false);

  return (

    <div className="bg-[#f3f4f6] min-h-screen">

      {/* SIDEBAR */}
      <Sidebar
        mobileOpen={mobileOpen}
        setMobileOpen={
          setMobileOpen
        }
      />

      {/* MAIN */}
      <div className="lg:ml-[260px] p-4 lg:p-6">

        {/* TOPBAR */}
        <div className="sticky top-4 z-30 mb-6">

          <Topbar
            setMobileOpen={
              setMobileOpen
            }
          />

        </div>

        {/* CONTENT */}
        {children}

      </div>

    </div>

  );

}