import { Menu, X, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function Navbar({
  onToggleSidebar,
  sidebarCollapsed,
}) {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">

      <div className="flex h-16 items-center justify-between px-4 sm:px-6">

        {/* ================= Left ================= */}
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
            className="
              flex h-10 w-10 items-center justify-center
              rounded-lg
              border border-slate-200
              bg-white
              text-slate-600
              transition-all
              hover:border-blue-200
              hover:bg-blue-50
              hover:text-blue-600
              active:scale-95
            "
          >
            {sidebarCollapsed ? (
              <Menu size={21} />
            ) : (
              <X size={20} />
            )}
          </button>

          {/* Page system title */}
          <div className="hidden sm:block">

            <p className="text-sm font-semibold text-slate-800">
              Medical Shop Management
            </p>

            <p className="text-xs text-slate-400">
              Manage your pharmacy efficiently
            </p>

          </div>

        </div>

        {/* ================= Right ================= */}
        <div className="flex items-center gap-3">

          {/* User Avatar */}
          <div
            className="
              flex h-10 w-10 items-center justify-center
              rounded-full
              bg-blue-600
              text-sm font-bold
              text-white
              shadow-sm
              shadow-blue-200
            "
          >
            {(user?.name || "Admin")
              .charAt(0)
              .toUpperCase()}
          </div>

          {/* User Information */}
          <div className="hidden text-right sm:block">

            <p className="text-sm font-semibold text-slate-800">
              {user?.name || "Admin"}
            </p>

            <p className="text-xs capitalize text-slate-500">
              {user?.role || "Administrator"}
            </p>

          </div>

          {/* Logout */}
          <button
            type="button"
            onClick={logout}
            title="Logout"
            className="
              flex h-10 w-10 items-center justify-center
              rounded-lg
              bg-red-50
              text-red-500
              transition-all
              hover:bg-red-100
              hover:text-red-600
              active:scale-95
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