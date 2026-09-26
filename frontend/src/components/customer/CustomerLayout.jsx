import { useState } from "react";
import { Outlet } from "react-router-dom";

import CustomerSidebar from "./CustomerSidebar";
import CustomerNavbar from "./CustomerNavbar";
import MobileCustomerSidebar from "./MobileCustomerSidebar";

const CustomerLayout = () => {
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
        text-slate-900
        dark:bg-slate-950
        dark:text-white
      "
    >
      {/* Desktop Sidebar */}
      <div className="fixed inset-y-0 left-0 z-40 hidden lg:block">
        <CustomerSidebar />
      </div>

      {/* Mobile Sidebar */}
      <MobileCustomerSidebar
        isOpen={isMobileSidebarOpen}
        onClose={closeMobileSidebar}
      />

      {/* Main Content */}
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
        <CustomerNavbar
          onMenuClick={openMobileSidebar}
        />

        <main
          className="
            flex-1
            bg-slate-50
            p-4
            sm:p-6
            lg:p-8
            dark:bg-slate-950
          "
        >
          <div className="mx-auto w-full max-w-[1600px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default CustomerLayout;