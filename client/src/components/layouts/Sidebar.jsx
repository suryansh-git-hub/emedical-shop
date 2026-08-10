import { NavLink } from "react-router-dom";
import { navigation } from "../../constants/navigation";
import { useAuth } from "../../context/AuthContext";

function Sidebar() {
  const { user } = useAuth();

  const filteredNavigation = navigation.filter((item) => {
    // If no roles are specified, everyone can access it
    if (!item.roles) return true;

    // Show only if user's role is allowed
    return item.roles.includes(user?.role);
  });

  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col border-r border-slate-800 bg-slate-950 text-white">

      {/* ================= Logo ================= */}
      <div className="flex h-16 items-center border-b border-slate-800 px-6">

        <div className="flex items-center gap-3">

          {/* Logo Icon */}
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold shadow-lg shadow-blue-600/20">
            eM
          </div>

          {/* Logo Text */}
          <div>
            <h1 className="text-lg font-bold tracking-tight">
              eMediShop
            </h1>

            <p className="text-[10px] text-slate-400">
              Medical Management
            </p>
          </div>

        </div>

      </div>

      {/* ================= User Info ================= */}
      <div className="border-b border-slate-800 px-4 py-4">

        <div className="flex items-center gap-3 rounded-xl bg-slate-900 px-3 py-3">

          {/* Avatar */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold">
            {(user?.name || "Admin")
              .charAt(0)
              .toUpperCase()}
          </div>

          {/* User Details */}
          <div className="min-w-0">

            <p className="truncate text-sm font-semibold text-white">
              {user?.name || "Admin"}
            </p>

            <p className="text-xs capitalize text-slate-400">
              {user?.role || "Administrator"}
            </p>

          </div>

        </div>

      </div>

      {/* ================= Navigation ================= */}
      <nav className="flex-1 overflow-y-auto px-3 py-5">

        <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          Main Menu
        </p>

        <div className="space-y-1">

          {filteredNavigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                      : "text-slate-400 hover:bg-slate-900 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Icon */}
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition ${
                        isActive
                          ? "bg-white/15 text-white"
                          : "text-slate-500 group-hover:text-blue-400"
                      }`}
                    >
                      <Icon size={18} strokeWidth={2} />
                    </div>

                    {/* Name */}
                    <span className="truncate">
                      {item.name}
                    </span>

                    {/* Active indicator */}
                    {isActive && (
                      <span className="ml-auto h-2 w-2 rounded-full bg-white" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}

        </div>

      </nav>

      {/* ================= Footer ================= */}
      <div className="border-t border-slate-800 p-4">

        <div className="rounded-xl bg-slate-900 px-3 py-3">

          <p className="text-xs font-medium text-slate-300">
            eMediShop
          </p>

          <p className="mt-1 text-[11px] text-slate-500">
            Medical Shop Management System
          </p>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;