import { NavLink } from "react-router-dom";
import { navigation } from "../../constants/navigation";
import { useAuth } from "../../context/AuthContext";

function Sidebar() {
  const { user } = useAuth();

  const filteredNavigation = navigation.filter((item) => {
    // If no roles are specified, everyone can access it
    if (!item.roles) return true;

    // Show only if the user's role is allowed
    return item.roles.includes(user?.role);
  });

  return (
    <aside className="w-64 bg-slate-900 text-white">
      <div className="border-b border-slate-700 p-6">
        <h1 className="text-2xl font-bold">MediCare</h1>
      </div>

      <nav className="mt-4 px-3">
        {filteredNavigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `mb-2 flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "hover:bg-slate-800"
                }`
              }
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;