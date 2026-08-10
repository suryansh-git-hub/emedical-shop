import { Search, LogOut, Bell } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">

      <div className="flex h-16 items-center justify-between px-4 sm:px-6">

        {/* ================= Left Section ================= */}
        <div className="flex items-center gap-4">

          {/* Search */}
          <div className="relative hidden sm:block">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search..."
              className="
                h-10 w-64 rounded-lg
                border border-slate-200
                bg-slate-50
                pl-10 pr-4
                text-sm text-slate-700
                placeholder:text-slate-400
                outline-none
                transition
                focus:border-blue-500
                focus:bg-white
                focus:ring-2
                focus:ring-blue-100
              "
            />

          </div>

        </div>

        {/* ================= Right Section ================= */}
        <div className="flex items-center gap-3">

          {/* Notification */}
          <button
            type="button"
            className="
              relative
              flex h-10 w-10
              items-center justify-center
              rounded-lg
              border border-slate-200
              bg-white
              text-slate-500
              transition
              hover:bg-slate-50
              hover:text-slate-700
            "
          >
            <Bell size={18} />

            {/* Notification dot */}
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          </button>

          {/* Divider */}
          <div className="hidden h-8 w-px bg-slate-200 sm:block" />

          {/* User */}
          <div className="flex items-center gap-3">

            {/* Avatar */}
            <div
              className="
                flex h-10 w-10
                items-center justify-center
                rounded-full
                bg-blue-600
                text-sm font-bold
                text-white
                shadow-sm
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

          </div>

          {/* Logout */}
          <button
            type="button"
            onClick={logout}
            title="Logout"
            className="
              flex h-10 w-10
              items-center justify-center
              rounded-lg
              bg-red-50
              text-red-500
              transition
              hover:bg-red-100
              hover:text-red-600
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