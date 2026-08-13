import {
  Plus,
  ShoppingCart,
  Package,
  Users,
} from "lucide-react";
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
    <div
      className="
        mt-8
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        transition-all
        hover:shadow-md

        dark:border-slate-700
        dark:bg-slate-900
        dark:shadow-none
        dark:hover:border-slate-600
      "
    >
      {/* Header */}

      <div className="mb-5">

        <h2
          className="
            text-xl
            font-semibold
            text-slate-900
            dark:text-white
          "
        >
          Quick Actions
        </h2>

        <p
          className="
            mt-1
            text-sm
            text-slate-500
            dark:text-slate-400
          "
        >
          Quickly access common tasks
        </p>

      </div>

      {/* Actions */}

      <div
        className={`
          grid
          gap-4
          ${
            actions.length === 2
              ? "md:grid-cols-2"
              : actions.length === 3
              ? "md:grid-cols-3"
              : "md:grid-cols-4"
          }
        `}
      >
        {actions.map((action) => (
          <button
            key={action.title}
            type="button"
            onClick={() => navigate(action.path)}
            className={`
              ${action.color}

              flex
              items-center
              justify-center
              gap-3
              rounded-xl
              p-5
              text-white

              font-medium
              shadow-sm

              transition-all
              duration-200

              hover:-translate-y-0.5
              hover:opacity-90
              hover:shadow-md

              active:scale-[0.98]
            `}
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