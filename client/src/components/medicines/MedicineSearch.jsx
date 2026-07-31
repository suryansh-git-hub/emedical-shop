import { Search } from "lucide-react";

function MedicineSearch({
  search,
  setSearch,
  setPage,
}) {
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page whenever search changes
  };

  return (
    <div className="relative w-full">
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
      />

      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search by medicine or generic name..."
        className="w-full rounded-lg border py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default MedicineSearch;