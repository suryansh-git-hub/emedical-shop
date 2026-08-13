import { useMemo } from "react";
import { Search, UserRound } from "lucide-react";

const CustomerSearch = ({
  customers = [],
  selectedCustomer,
  onSelectCustomer,
  search,
  setSearch,
}) => {
  const filteredCustomers = useMemo(() => {
    if (!search?.trim()) return [];

    const keyword = search
      .toLowerCase()
      .trim();

    return customers.filter((customer) => {
      return (
        customer.customerName
          ?.toLowerCase()
          .includes(keyword) ||
        customer.contactNumber
          ?.toLowerCase()
          .includes(keyword) ||
        customer.email
          ?.toLowerCase()
          .includes(keyword)
      );
    });
  }, [customers, search]);

  return (
    <div className="relative">

      <label
        className="
          mb-2
          block
          text-sm
          font-semibold
          text-slate-700

          dark:text-slate-300
        "
      >
        Customer
      </label>

      <div className="relative">

        <Search
          size={18}
          className="
            pointer-events-none
            absolute
            left-3
            top-1/2
            -translate-y-1/2
            text-slate-400
          "
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
          className="
            w-full
            rounded-xl
            border
            border-slate-200
            bg-slate-50
            py-3
            pl-10
            pr-4
            text-sm
            text-slate-700
            outline-none
            transition
            placeholder:text-slate-400
            focus:border-blue-500
            focus:bg-white
            focus:ring-4
            focus:ring-blue-100

            dark:border-slate-700
            dark:bg-slate-800
            dark:text-slate-200
            dark:placeholder:text-slate-500
            dark:focus:border-blue-500
            dark:focus:bg-slate-800
            dark:focus:ring-blue-950
          "
        />

      </div>

      {/* Search Results */}

      {filteredCustomers.length > 0 &&
        !selectedCustomer && (

          <div
            className="
              absolute
              z-20
              mt-2
              max-h-72
              w-full
              overflow-y-auto
              rounded-xl
              border
              border-slate-200
              bg-white
              shadow-xl

              dark:border-slate-700
              dark:bg-slate-900
              dark:shadow-black/30
            "
          >

            {filteredCustomers.map(
              (customer) => (

                <button
                  key={customer._id}
                  type="button"
                  onClick={() => {
                    onSelectCustomer(
                      customer
                    );

                    setSearch("");
                  }}
                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    border-b
                    border-slate-100
                    px-4
                    py-3
                    text-left
                    transition
                    hover:bg-slate-50

                    dark:border-slate-800
                    dark:hover:bg-slate-800
                  "
                >

                  <div
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      bg-blue-50
                      text-blue-600

                      dark:bg-blue-950/50
                      dark:text-blue-400
                    "
                  >
                    <UserRound size={16} />
                  </div>

                  <div className="min-w-0">

                    <span
                      className="
                        block
                        truncate
                        text-sm
                        font-semibold
                        text-slate-800

                        dark:text-slate-100
                      "
                    >
                      {customer.customerName}
                    </span>

                    <span
                      className="
                        mt-0.5
                        block
                        text-xs
                        text-slate-500

                        dark:text-slate-400
                      "
                    >
                      {customer.contactNumber ||
                        customer.phone ||
                        customer.email ||
                        "No contact information"}
                    </span>

                  </div>

                </button>

              )
            )}

          </div>

        )}

      {/* No Results */}

      {search?.trim() &&
        filteredCustomers.length === 0 &&
        !selectedCustomer && (

          <div
            className="
              absolute
              z-20
              mt-2
              w-full
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              py-4
              text-center
              text-sm
              text-slate-500
              shadow-xl

              dark:border-slate-700
              dark:bg-slate-900
              dark:text-slate-400
            "
          >
            No customers found.
          </div>

        )}

    </div>
  );
};

export default CustomerSearch;