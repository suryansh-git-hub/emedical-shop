import { Search, X } from "lucide-react";

function MedicineSearch({
  search,
  setSearch,
  setPage,
}) {
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const clearSearch = () => {
    setSearch("");
    setPage(1);
  };

  return (
    <div className="relative w-full">
      {/* Search Icon */}
      <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
        <Search
          size={19}
          className="text-slate-400 dark:text-slate-500"
        />
      </div>

      {/* Input */}
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search by medicine or generic name..."
        className="
          w-full
          rounded-xl
          border
          border-slate-200
          bg-slate-50
          py-3
          pl-11
          pr-11
          text-sm
          text-slate-800
          placeholder:text-slate-400
          outline-none
          transition

          focus:border-blue-400
          focus:bg-white
          focus:ring-4
          focus:ring-blue-50

          dark:border-slate-700
          dark:bg-slate-800
          dark:text-slate-100
          dark:placeholder:text-slate-500

          dark:focus:border-blue-500
          dark:focus:bg-slate-800
          dark:focus:ring-blue-950
        "
      />

      {/* Clear Button */}
      {search && (
        <button
          type="button"
          onClick={clearSearch}
          title="Clear search"
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
            rounded-full
            text-slate-400
            transition

            hover:bg-slate-200
            hover:text-slate-600

            dark:text-slate-500
            dark:hover:bg-slate-700
            dark:hover:text-slate-200
          "
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

export default MedicineSearch;