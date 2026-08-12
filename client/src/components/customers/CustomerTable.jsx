import {
  Pencil,
  Trash2,
  History,
  Users,
} from "lucide-react";

const CustomerTable = ({
  customers,
  onEdit,
  onDelete,
  onHistory,
}) => {
  // ==========================================
  // Empty State
  // ==========================================

  if (customers.length === 0) {
    // return (
    //   <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    //     <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
    //       <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
    //         <Users size={26} />
    //       </div>

    //       <h2 className="text-lg font-semibold text-slate-800">
    //         No Customers Found
    //       </h2>

    //       <p className="mt-1 max-w-sm text-sm text-slate-500">
    //         No customers match your search. Add a new
    //         customer to get started.
    //       </p>
    //     </div>
    //   </div>
    // );
    return null
  }

  // ==========================================
  // Customer Table
  // ==========================================

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* ==========================
          Table Header
      ========================== */}

      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
        <div>
          <h2 className="text-sm font-semibold text-slate-800">
            Customers
          </h2>

          <p className="mt-0.5 text-xs text-slate-500">
            {customers.length} customer
            {customers.length !== 1 ? "s" : ""} found
          </p>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Users size={17} />
        </div>
      </div>

      {/* ==========================
          Responsive Table
      ========================== */}

      <div className="overflow-x-auto">
        <table className="min-w-[950px] w-full">

          {/* ==========================
              Head
          ========================== */}

          <thead className="bg-slate-50">
            <tr>

              <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6">
                Customer
              </th>

              <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Contact
              </th>

              <th className="px-5 py-3.5 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                Reward Points
              </th>

              <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Email
              </th>

              <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Address
              </th>

              <th className="px-5 py-3.5 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                Actions
              </th>

            </tr>
          </thead>

          {/* ==========================
              Body
          ========================== */}

          <tbody className="divide-y divide-slate-100">

            {customers.map((customer) => (

              <tr
                key={customer._id}
                className="group transition-colors hover:bg-slate-50/70"
              >

                {/* ==========================
                    Customer Name
                ========================== */}

                <td className="px-5 py-4 sm:px-6">
                  <div className="flex items-center gap-3">

                    {/* Avatar */}

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-sm font-semibold text-blue-600">
                      {customer.customerName
                        ?.charAt(0)
                        ?.toUpperCase() || "C"}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-medium text-slate-800">
                        {customer.customerName}
                      </p>
                    </div>

                  </div>
                </td>

                {/* ==========================
                    Contact
                ========================== */}

                <td className="px-5 py-4 text-sm text-slate-600">
                  {customer.contactNumber || "—"}
                </td>

                {/* ==========================
                    Reward Points
                ========================== */}

                <td className="px-5 py-4 text-center">

                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                      (customer.rewardPoints || 0) > 0
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <span>⭐</span>

                    {customer.rewardPoints || 0}
                  </span>

                </td>

                {/* ==========================
                    Email
                ========================== */}

                <td className="px-5 py-4 text-sm text-slate-600">
                  <span className="block max-w-[220px] truncate">
                    {customer.email || "—"}
                  </span>
                </td>

                {/* ==========================
                    Address
                ========================== */}

                <td className="px-5 py-4 text-sm text-slate-600">
                  <span className="block max-w-[220px] truncate">
                    {customer.address || "—"}
                  </span>
                </td>

                {/* ==========================
                    Actions
                ========================== */}

                <td className="px-5 py-4">

                  <div className="flex items-center justify-center gap-2">

                    {/* History */}

                    <button
                      type="button"
                      onClick={() =>
                        onHistory(customer)
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition hover:bg-emerald-100"
                      title="Purchase History"
                    >
                      <History size={17} />
                    </button>

                    {/* Edit */}

                    <button
                      type="button"
                      onClick={() =>
                        onEdit(customer)
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition hover:bg-blue-100"
                      title="Edit Customer"
                    >
                      <Pencil size={17} />
                    </button>

                    {/* Delete */}

                    <button
                      type="button"
                      onClick={() =>
                        onDelete(customer._id)
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-600 transition hover:bg-red-100"
                      title="Delete Customer"
                    >
                      <Trash2 size={17} />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>
      </div>
    </div>
  );
};

export default CustomerTable;