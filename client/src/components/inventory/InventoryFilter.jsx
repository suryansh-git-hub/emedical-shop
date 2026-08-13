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
          type="button"
          onClick={() =>
            setSelectedFilter(filter.value)
          }
          className={`
            rounded-xl
            px-5
            py-2.5
            text-sm
            font-medium
            transition
            focus:outline-none
            focus:ring-4
            focus:ring-blue-100
            dark:focus:ring-blue-950

            ${
              selectedFilter === filter.value
                ? "bg-blue-600 text-white shadow-sm hover:bg-blue-700"
                : "border border-slate-200 bg-white text-slate-600 shadow-sm hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-800 dark:hover:bg-blue-950/40 dark:hover:text-blue-400"
            }
          `}
        >
          {filter.label}
        </button>

      ))}

    </div>
  );
};

export default InventoryFilter;