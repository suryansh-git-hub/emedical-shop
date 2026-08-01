const InventoryFilter = ({
  selectedFilter,
  setSelectedFilter,
}) => {
  const filters = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Low Stock",
      value: "low-stock",
    },
    {
      label: "Out Of Stock",
      value: "out-of-stock",
    },
    {
      label: "Near Expiry",
      value: "near-expiry",
    },
    {
  label: "Expired",
  value: "expired",
},
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() =>
            setSelectedFilter(filter.value)
          }
          className={`rounded-lg px-5 py-2 font-medium transition ${
            selectedFilter === filter.value
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 shadow hover:bg-gray-100"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default InventoryFilter;