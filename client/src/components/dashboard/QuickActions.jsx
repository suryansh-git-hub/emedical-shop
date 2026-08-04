import { Plus, ShoppingCart, Package, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

function QuickActions({ isAdmin }) {
  const navigate = useNavigate();

  const actions = [
    ...(isAdmin
      ? [
          {
            title: "Add Medicine",
            icon: <Plus size={22} />,
            color: "bg-blue-500",
            path: "/medicines",
          },
        ]
      : []),

    {
      title: "New Sale",
      icon: <ShoppingCart size={22} />,
      color: "bg-green-500",
      path: "/sales",
    },

    {
      title: "Customers",
      icon: <Users size={22} />,
      color: "bg-orange-500",
      path: "/customers",
    },

    ...(isAdmin
      ? [
          {
            title: "New Purchase",
            icon: <Package size={22} />,
            color: "bg-purple-500",
            path: "/purchases",
          },
        ]
      : []),
  ];

  return (
    <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-semibold">
        Quick Actions
      </h2>

      <div
        className={`grid gap-4 ${
          actions.length === 2
            ? "md:grid-cols-2"
            : actions.length === 3
            ? "md:grid-cols-3"
            : "md:grid-cols-4"
        }`}
      >
        {actions.map((action) => (
          <button
            key={action.title}
            onClick={() => navigate(action.path)}
            className={`${action.color} flex items-center justify-center gap-3 rounded-lg p-5 text-white transition hover:opacity-90`}
          >
            {action.icon}
            <span>{action.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuickActions;