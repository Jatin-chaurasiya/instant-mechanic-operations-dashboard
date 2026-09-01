import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import MobileSidebar from "./MobileSidebar";

const DashboardLayout = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] =
    useState(false);

  const openMobileSidebar = () => {
    setIsMobileSidebarOpen(true);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  return (
    <div
      className="
        flex
        min-h-screen
        bg-slate-50
        transition-colors
        duration-200
        dark:bg-slate-950
      "
    >
      {/* =================================
          Desktop Sidebar
      ================================== */}

      <div
        className="
          fixed
          inset-y-0
          left-0
          z-40
          hidden
          lg:block
        "
      >
        <Sidebar />
      </div>

      {/* =================================
          Mobile Sidebar
      ================================== */}

      <MobileSidebar
        isOpen={isMobileSidebarOpen}
        onClose={closeMobileSidebar}
      />

      {/* =================================
          Main Area
      ================================== */}

      <div
        className="
          flex
          min-h-screen
          min-w-0
          flex-1
          flex-col
          lg:pl-64
        "
      >
        {/* Navbar */}
        <Navbar
          onMenuClick={openMobileSidebar}
        />

        {/* =================================
            Page Content
        ================================== */}

        <main
          className="
            flex-1
            bg-slate-50
            p-4
            transition-colors
            duration-200
            dark:bg-slate-950
            sm:p-6
            lg:p-8
          "
        >
          <div
            className="
              mx-auto
              w-full
              max-w-[1600px]
            "
          >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;