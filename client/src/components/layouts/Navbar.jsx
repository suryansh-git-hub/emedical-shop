import { Search,  LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      {/* Left */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-72 rounded-lg border py-2 pl-10 pr-4 outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">
      

        <div className="text-right">
          <p className="font-semibold">
            {user?.name || "Admin"}
          </p>

          <p className="text-sm text-gray-500">
            {user?.role || "Administrator"}
          </p>
        </div>

        <button
          onClick={logout}
          className="rounded-lg bg-red-500 p-2 text-white hover:bg-red-600"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
}

export default Navbar;