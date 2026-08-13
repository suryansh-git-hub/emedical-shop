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
    return null;
  }

  // ==========================================
  // Customer Table
  // ==========================================

  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm

        dark:border-slate-800
        dark:bg-slate-900
      "
    >

      {/* ==========================
          Table Header
      ========================== */}

      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-slate-100
          px-5
          py-4
          sm:px-6

          dark:border-slate-800
        "
      >

        <div>

          <h2
            className="
              text-sm
              font-semibold
              text-slate-800

              dark:text-slate-100
            "
          >
            Customers
          </h2>

          <p
            className="
              mt-0.5
              text-xs
              text-slate-500

              dark:text-slate-400
            "
          >
            {customers.length} customer
            {customers.length !== 1 ? "s" : ""} found
          </p>

        </div>

        <div
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-xl
            bg-blue-50
            text-blue-600

            dark:bg-blue-950/40
            dark:text-blue-400
          "
        >
          <Users size={17} />
        </div>

      </div>

      {/* ==========================
          Responsive Table
      ========================== */}

      <div className="overflow-x-auto">

        <table className="w-full min-w-[950px]">

          {/* ==========================
              Head
          ========================== */}

          <thead
            className="
              bg-slate-50

              dark:bg-slate-800/70
            "
          >

            <tr>

              <th
                className="
                  px-5
                  py-3.5
                  text-left
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-500
                  sm:px-6

                  dark:text-slate-400
                "
              >
                Customer
              </th>

              <th
                className="
                  px-5
                  py-3.5
                  text-left
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-500

                  dark:text-slate-400
                "
              >
                Contact
              </th>

              <th
                className="
                  px-5
                  py-3.5
                  text-center
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-500

                  dark:text-slate-400
                "
              >
                Reward Points
              </th>

              <th
                className="
                  px-5
                  py-3.5
                  text-left
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-500

                  dark:text-slate-400
                "
              >
                Email
              </th>

              <th
                className="
                  px-5
                  py-3.5
                  text-left
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-500

                  dark:text-slate-400
                "
              >
                Address
              </th>

              <th
                className="
                  px-5
                  py-3.5
                  text-center
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-500

                  dark:text-slate-400
                "
              >
                Actions
              </th>

            </tr>

          </thead>

          {/* ==========================
              Body
          ========================== */}

          <tbody
            className="
              divide-y
              divide-slate-100

              dark:divide-slate-800
            "
          >

            {customers.map((customer) => (

              <tr
                key={customer._id}
                className="
                  group
                  transition-colors
                  hover:bg-slate-50/70

                  dark:hover:bg-slate-800/50
                "
              >

                {/* ==========================
                    Customer Name
                ========================== */}

                <td className="px-5 py-4 sm:px-6">

                  <div className="flex items-center gap-3">

                    {/* Avatar */}

                    <div
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-blue-50
                        text-sm
                        font-semibold
                        text-blue-600

                        dark:bg-blue-950/50
                        dark:text-blue-400
                      "
                    >
                      {customer.customerName
                        ?.charAt(0)
                        ?.toUpperCase() || "C"}
                    </div>

                    <div className="min-w-0">

                      <p
                        className="
                          truncate
                          font-medium
                          text-slate-800

                          dark:text-slate-100
                        "
                      >
                        {customer.customerName}
                      </p>

                    </div>

                  </div>

                </td>

                {/* ==========================
                    Contact
                ========================== */}

                <td
                  className="
                    px-5
                    py-4
                    text-sm
                    text-slate-600

                    dark:text-slate-300
                  "
                >
                  {customer.contactNumber || "—"}
                </td>

                {/* ==========================
                    Reward Points
                ========================== */}

                <td className="px-5 py-4 text-center">

                  <span
                    className={`
                      inline-flex
                      items-center
                      gap-1.5
                      rounded-full
                      px-3
                      py-1
                      text-xs
                      font-semibold

                      ${
                        (customer.rewardPoints || 0) > 0
                          ? `
                            bg-emerald-50
                            text-emerald-600

                            dark:bg-emerald-950/40
                            dark:text-emerald-400
                          `
                          : `
                            bg-slate-100
                            text-slate-500

                            dark:bg-slate-800
                            dark:text-slate-400
                          `
                      }
                    `}
                  >

                    <span>⭐</span>

                    {customer.rewardPoints || 0}

                  </span>

                </td>

                {/* ==========================
                    Email
                ========================== */}

                <td
                  className="
                    px-5
                    py-4
                    text-sm
                    text-slate-600

                    dark:text-slate-300
                  "
                >

                  <span className="block max-w-[220px] truncate">
                    {customer.email || "—"}
                  </span>

                </td>

                {/* ==========================
                    Address
                ========================== */}

                <td
                  className="
                    px-5
                    py-4
                    text-sm
                    text-slate-600

                    dark:text-slate-300
                  "
                >

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
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-xl
                        bg-emerald-50
                        text-emerald-600
                        transition

                        hover:bg-emerald-100

                        dark:bg-emerald-950/40
                        dark:text-emerald-400
                        dark:hover:bg-emerald-950/70
                      "
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
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-xl
                        bg-blue-50
                        text-blue-600
                        transition

                        hover:bg-blue-100

                        dark:bg-blue-950/40
                        dark:text-blue-400
                        dark:hover:bg-blue-950/70
                      "
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
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-xl
                        bg-red-50
                        text-red-600
                        transition

                        hover:bg-red-100

                        dark:bg-red-950/40
                        dark:text-red-400
                        dark:hover:bg-red-950/70
                      "
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