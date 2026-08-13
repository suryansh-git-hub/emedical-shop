import {
  Menu,
  X,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";

import { useEffect, useState } from "react";

import { useAuth } from "../../context/AuthContext";

function Navbar({
  onToggleSidebar,
  sidebarCollapsed,
}) {
  const { user, logout } = useAuth();

  // ==========================================
  // DARK MODE
  // ==========================================

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // ==========================================
  // APPLY THEME
  // ==========================================

  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // ==========================================
  // TOGGLE THEME
  // ==========================================

  const handleThemeToggle = () => {
    setDarkMode((previous) => !previous);
  };

  return (
    <header
      className="
        sticky top-0 z-30
        h-16
        border-b
        border-slate-200
        bg-white

        transition-colors
        duration-200

        dark:border-slate-800
        dark:bg-slate-900
      "
    >
      <div
        className="
          flex h-full
          items-center
          justify-between
          px-4
          sm:px-6
        "
      >

        {/* ==========================================
            LEFT SECTION
        ========================================== */}

        <div className="flex items-center gap-4">

          {/* Sidebar Toggle */}

          <button
            type="button"
            onClick={onToggleSidebar}
            title={
              sidebarCollapsed
                ? "Expand sidebar"
                : "Collapse sidebar"
            }
            aria-label={
              sidebarCollapsed
                ? "Expand sidebar"
                : "Collapse sidebar"
            }
            className="
              flex h-10 w-10
              items-center
              justify-center

              rounded-xl
              border
              border-slate-200
              bg-white
              text-slate-600

              transition-all
              duration-200

              hover:border-blue-200
              hover:bg-blue-50
              hover:text-blue-600

              active:scale-95

              dark:border-slate-700
              dark:bg-slate-800
              dark:text-slate-300

              dark:hover:border-slate-600
              dark:hover:bg-slate-700
              dark:hover:text-blue-400
            "
          >
            {sidebarCollapsed ? (
              <Menu size={21} />
            ) : (
              <X size={20} />
            )}
          </button>

          {/* System Title */}

          <div className="hidden sm:block">

            <p
              className="
                text-sm
                font-semibold
                text-slate-800

                dark:text-slate-100
              "
            >
              Medical Shop Management
            </p>

            <p
              className="
                mt-0.5
                text-xs
                text-slate-400

                dark:text-slate-500
              "
            >
              Manage your pharmacy efficiently
            </p>

          </div>

        </div>

        {/* ==========================================
            RIGHT SECTION
        ========================================== */}

        <div className="flex items-center gap-2 sm:gap-3">

          {/* ==========================================
              DARK MODE
          ========================================== */}

          <button
            type="button"
            onClick={handleThemeToggle}
            title={
              darkMode
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
            aria-label={
              darkMode
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
            className="
              flex h-10 w-10
              items-center
              justify-center

              rounded-xl
              border
              border-slate-200
              bg-white
              text-slate-600

              transition-all
              duration-200

              hover:border-blue-200
              hover:bg-blue-50
              hover:text-blue-600

              active:scale-95

              dark:border-slate-700
              dark:bg-slate-800
              dark:text-yellow-400

              dark:hover:border-slate-600
              dark:hover:bg-slate-700
            "
          >
            {darkMode ? (
              <Sun size={19} />
            ) : (
              <Moon size={19} />
            )}
          </button>

          {/* ==========================================
              USER AVATAR
          ========================================== */}

          <div
            className="
              flex h-10 w-10
              shrink-0
              items-center
              justify-center

              rounded-full
              bg-blue-600

              text-sm
              font-bold
              text-white

              shadow-sm
              shadow-blue-200

              dark:bg-blue-500
              dark:shadow-none
            "
          >
            {(user?.name || "Admin")
              .charAt(0)
              .toUpperCase()}
          </div>

          {/* ==========================================
              USER INFORMATION
          ========================================== */}

          <div className="hidden text-right sm:block">

            <p
              className="
                max-w-[150px]
                truncate

                text-sm
                font-semibold
                text-slate-800

                dark:text-slate-100
              "
            >
              {user?.name || "Admin"}
            </p>

            <p
              className="
                text-xs
                capitalize
                text-slate-500

                dark:text-slate-400
              "
            >
              {user?.role || "Administrator"}
            </p>

          </div>

          {/* ==========================================
              LOGOUT
          ========================================== */}

          <button
            type="button"
            onClick={logout}
            title="Logout"
            aria-label="Logout"
            className="
              flex h-10 w-10
              shrink-0
              items-center
              justify-center

              rounded-xl

              bg-red-50
              text-red-500

              transition-all
              duration-200

              hover:bg-red-100
              hover:text-red-600

              active:scale-95

              dark:bg-red-950
              dark:text-red-400

              dark:hover:bg-red-900
              dark:hover:text-red-300
            "
          >
            <LogOut size={18} />
          </button>

        </div>

      </div>
    </header>
  );
}

export default Navbar;