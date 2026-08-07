import { useMemo, useState } from "react";
import { Search } from "lucide-react";

const CustomerSearch = ({
  customers,
  selectedCustomer,
  onSelectCustomer,
}) => {
  const [search, setSearch] = useState("");

  const filteredCustomers = useMemo(() => {
    if (!search.trim()) return [];

    return customers.filter((customer) => {
      const keyword = search.toLowerCase();

      return (
        customer.customerName
          ?.toLowerCase()
          .includes(keyword) ||
        customer.contactNumber
          ?.toLowerCase()
          .includes(keyword)
      );
    });
  }, [customers, search]);

  return (
    <div className="relative">

      <label className="mb-2 block text-sm font-semibold">
        Customer
      </label>

      <div className="relative">

        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search customer by name or phone..."
          value={
            selectedCustomer
              ? selectedCustomer.customerName
              : search
          }
          onChange={(e) => {
            setSearch(e.target.value);

            if (selectedCustomer) {
              onSelectCustomer(null);
            }
          }}
          className="w-full rounded-lg border py-3 pl-10 pr-4 focus:border-blue-500 focus:outline-none"
        />
      </div>

      {filteredCustomers.length > 0 &&
        !selectedCustomer && (
          <div className="absolute z-20 mt-2 max-h-72 w-full overflow-y-auto rounded-lg border bg-white shadow-lg">

            {filteredCustomers.map((customer) => (
              <button
                key={customer._id}
                type="button"
                onClick={() => {
                  onSelectCustomer(customer);
                  setSearch("");
                }}
                className="flex w-full flex-col border-b px-4 py-3 text-left hover:bg-gray-100"
              >
                <span className="font-medium">
                  {customer.customerName}
                </span>

                <span className="text-sm text-gray-500">
                  {customer.contactNumber}
                </span>
              </button>
            ))}

          </div>
        )}
    </div>
  );
};

export default CustomerSearch;