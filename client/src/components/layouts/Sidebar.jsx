import { NavLink } from "react-router-dom";
import { navigation } from "../../constants/navigation";
import { useAuth } from "../../context/AuthContext";

function Sidebar({ collapsed = false }) {
  const { user } = useAuth();

  const filteredNavigation = navigation.filter((item) => {
    // If no roles are specified, everyone can access it
    if (!item.roles) return true;

    // Show only if user's role is allowed
    return item.roles.includes(user?.role);
  });

  return (
    <aside
      className={`
        sticky top-0
        flex h-screen shrink-0
        flex-col

        border-r border-slate-800
        bg-slate-950
        text-white

        transition-all
        duration-300
        ease-in-out

        ${collapsed ? "w-20" : "w-64"}
      `}
    >

      {/* ==========================================
          LOGO
      ========================================== */}

      <div
        className={`
          flex h-16 shrink-0
          items-center
          border-b border-slate-800

          ${collapsed
            ? "justify-center px-2"
            : "px-5"
          }
        `}
      >

        <div
          className={`
            flex items-center

            ${collapsed
              ? "justify-center"
              : "gap-3"
            }
          `}
        >

          {/* Logo */}

          <div
            className="
              flex h-10 w-10
              shrink-0
              items-center
              justify-center

              rounded-xl
              bg-blue-600

              text-sm
              font-bold
              text-white

              shadow-lg
              shadow-blue-600/20

              transition-transform
              duration-200

              hover:scale-105
            "
          >
            eM
          </div>

          {/* Logo Text */}

          {!collapsed && (
            <div className="overflow-hidden">

              <h1
                className="
                  whitespace-nowrap
                  text-lg
                  font-bold
                  tracking-tight
                  text-white
                "
              >
                eMediShop
              </h1>

              <p
                className="
                  whitespace-nowrap
                  text-[10px]
                  text-slate-400
                "
              >
                Medical Management
              </p>

            </div>
          )}

        </div>

      </div>

      {/* ==========================================
          NAVIGATION
      ========================================== */}

      <nav
        className="
          flex-1
          overflow-y-auto
          px-3
          py-5

          scrollbar-thin
        "
      >

        {/* Main Menu */}

        {!collapsed && (
          <p
            className="
              mb-3
              px-3

              text-[11px]
              font-semibold
              uppercase
              tracking-wider
              text-slate-500
            "
          >
            Main Menu
          </p>
        )}

        {/* Navigation Items */}

        <div className="space-y-1">

          {filteredNavigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                title={
                  collapsed
                    ? item.name
                    : undefined
                }
                className={({ isActive }) =>
                  `
                    group
                    flex
                    items-center
                    rounded-xl

                    text-sm
                    font-medium

                    transition-all
                    duration-200

                    ${
                      collapsed
                        ? "justify-center px-2 py-3"
                        : "gap-3 px-3 py-2.5"
                    }

                    ${
                      isActive
                        ? `
                          bg-blue-600
                          text-white
                          shadow-md
                          shadow-blue-600/20
                        `
                        : `
                          text-slate-400

                          hover:bg-slate-900
                          hover:text-white
                        `
                    }
                  `
                }
              >
                {({ isActive }) => (
                  <>

                    {/* ==================================
                        Icon
                    ================================== */}

                    <div
                      className={`
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center

                        rounded-lg

                        transition-all
                        duration-200

                        ${
                          isActive
                            ? `
                              bg-white/15
                              text-white
                            `
                            : `
                              text-slate-500
                              group-hover:bg-slate-800
                              group-hover:text-blue-400
                            `
                        }
                      `}
                    >
                      <Icon
                        size={18}
                        strokeWidth={2}
                      />
                    </div>

                    {/* ==================================
                        Name
                    ================================== */}

                    {!collapsed && (
                      <span className="truncate">
                        {item.name}
                      </span>
                    )}

                    {/* ==================================
                        Active Indicator
                    ================================== */}

                    {!collapsed &&
                      isActive && (
                        <span
                          className="
                            ml-auto
                            h-2
                            w-2
                            shrink-0
                            rounded-full
                            bg-white
                          "
                        />
                      )}

                  </>
                )}
              </NavLink>
            );
          })}

        </div>

      </nav>

      {/* ==========================================
          FOOTER
      ========================================== */}

      {!collapsed && (
        <div
          className="
            shrink-0
            border-t
            border-slate-800
            p-4
          "
        >

          <div
            className="
              rounded-xl
              border
              border-slate-800
              bg-slate-900
              px-3
              py-3
            "
          >

            <p
              className="
                text-xs
                font-medium
                text-slate-300
              "
            >
              eMediShop
            </p>

            <p
              className="
                mt-1
                text-[11px]
                leading-relaxed
                text-slate-500
              "
            >
              Medical Shop Management System
            </p>

          </div>

        </div>
      )}

    </aside>
  );
}

export default Sidebar;