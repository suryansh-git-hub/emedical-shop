import { Search } from "lucide-react";

function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
}) {
  return (
    <div className="relative">
      <Search
        className="absolute left-3 top-3"
        size={18}
      />

      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-80 rounded-lg border py-2 pl-10 pr-4"
      />
    </div>
  );
}

export default SearchInput;