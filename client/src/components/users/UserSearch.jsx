import { Search } from "lucide-react";

function UserSearch({
  search,
  setSearch,
}) {
  return (
    <div className="relative w-full max-w-md">
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 transition focus:border-blue-500 focus:outline-none"
      />
    </div>
  );
}

export default UserSearch;