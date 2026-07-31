import { Plus, ShoppingCart, Package } from "lucide-react";

function QuickActions() {
  const actions = [
    {
      title: "Add Medicine",
      icon: <Plus size={22} />,
      color: "bg-blue-500",
    },
    {
      title: "New Sale",
      icon: <ShoppingCart size={22} />,
      color: "bg-green-500",
    },
    {
      title: "New Purchase",
      icon: <Package size={22} />,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-semibold">Quick Actions</h2>

      <div className="grid gap-4 md:grid-cols-3">
        {actions.map((action) => (
          <button
            key={action.title}
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