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
    <div className="flex min-h-screen bg-[#F5F7FB] text-slate-900">

      {/* ================= Sidebar ================= */}

      <Sidebar collapsed={sidebarCollapsed} />

      {/* ================= Main Area ================= */}

      <div className="flex min-w-0 flex-1 flex-col bg-[#F5F7FB]">

        {/* ================= Navbar ================= */}

        <Navbar
          onToggleSidebar={toggleSidebar}
          sidebarCollapsed={sidebarCollapsed}
        />

        {/* ================= Page Content ================= */}

        <main className="min-h-0 flex-1 overflow-y-auto bg-[#F5F7FB]">

          <div className="mx-auto w-full max-w-[1800px] p-4 sm:p-5 lg:p-6">

            <Outlet />

          </div>

        </main>

      </div>
    </div>
  );
}

export default DashboardLayout;