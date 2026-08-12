import {
  Search,
  X,
} from "lucide-react";

function UserSearch({
  search,
  setSearch,
}) {
  const handleClear = () => {
    setSearch("");
  };

  return (
    <div className="relative w-full">

      {/* Search Icon */}

      <Search
        size={18}
        className="
          pointer-events-none
          absolute
          left-4
          top-1/2
          z-10
          -translate-y-1/2
          text-slate-400
        "
      />

      {/* Input */}

      <input
        type="text"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        placeholder="Search by name or email..."
        className="
          h-12
          w-full
          rounded-xl
          border
          border-slate-200
          bg-slate-50
          pl-11
          pr-11
          text-sm
          text-slate-700
          outline-none
          transition

          placeholder:text-slate-400

          hover:border-slate-300

          focus:border-blue-500
          focus:bg-white
          focus:ring-4
          focus:ring-blue-100
        "
      />

      {/* Clear Button */}

      {search && (
        <button
          type="button"
          onClick={handleClear}
          className="
            absolute
            right-3
            top-1/2
            flex
            h-7
            w-7
            -translate-y-1/2
            items-center
            justify-center
            rounded-lg
            text-slate-400
            transition
            hover:bg-slate-200
            hover:text-slate-700
          "
          title="Clear search"
        >
          <X size={15} />
        </button>
      )}

    </div>
  );
}

export default UserSearch;