import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function DashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] =
    useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  return (
    <div
      className="
        flex min-h-screen
        bg-[#f5f7fb]
        text-slate-900
        transition-colors duration-200

        dark:bg-slate-950
        dark:text-slate-100
      "
    >

      {/* ================= Sidebar ================= */}

      <Sidebar collapsed={sidebarCollapsed} />

      {/* ================= Main Area ================= */}

      <div
        className="
          flex min-w-0 flex-1 flex-col
          bg-[#f5f7fb]
          transition-colors duration-200

          dark:bg-slate-950
        "
      >

        {/* ================= Navbar ================= */}

        <Navbar
          onToggleSidebar={toggleSidebar}
          sidebarCollapsed={sidebarCollapsed}
        />

        {/* ================= Page Content ================= */}

        <main
          className="
            min-h-0
            flex-1
            overflow-y-auto
            bg-[#f5f7fb]
            transition-colors duration-200

            dark:bg-slate-950
          "
        >

          <div
            className="
              mx-auto
              w-full
              max-w-[1800px]
              p-4
              sm:p-5
              lg:p-6
            "
          >
            <Outlet />
          </div>

        </main>

      </div>
    </div>
  );
}

export default DashboardLayout;