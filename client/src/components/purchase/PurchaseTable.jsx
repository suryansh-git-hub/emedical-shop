import { ShoppingCart, Package } from "lucide-react";

const PurchaseTable = ({
  purchases,
  totalPurchases,
}) => {
  const displayCount =
    typeof totalPurchases === "number"
      ? totalPurchases
      : purchases.length;

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

      {/* ==========================================
          Table Header
      ========================================== */}

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
          <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
            Purchase Records
          </h2>

          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            {displayCount} purchase
            {displayCount !== 1 ? "s" : ""} found
          </p>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
          <ShoppingCart size={17} />
        </div>

      </div>

      {/* ==========================================
          Responsive Table
      ========================================== */}

      <div className="overflow-x-auto">

        <table className="min-w-[1050px] w-full">

          {/* ==========================================
              Table Head
          ========================================== */}

          <thead className="bg-slate-50 dark:bg-slate-800/70">

            <tr>

              <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6 dark:text-slate-400">
                Invoice
              </th>

              <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Supplier
              </th>

              <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Purchase Date
              </th>

              <th className="px-5 py-3.5 text-center text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Medicines
              </th>

              <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Total Amount
              </th>

              <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Created By
              </th>

            </tr>

          </thead>

          {/* ==========================================
              Table Body
          ========================================== */}

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">

            {purchases.map((purchase) => (

              <tr
                key={purchase._id}
                className="
                  group
                  transition-colors
                  hover:bg-slate-50/70

                  dark:hover:bg-slate-800/50
                "
              >

                {/* ==========================================
                    Invoice
                ========================================== */}

                <td className="px-5 py-4 sm:px-6">

                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                      <ShoppingCart size={16} />
                    </div>

                    <div className="min-w-0">

                      <p className="font-semibold text-slate-800 dark:text-slate-100">
                        {purchase.invoiceNumber}
                      </p>

                      <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
                        Purchase Invoice
                      </p>

                    </div>

                  </div>

                </td>

                {/* ==========================================
                    Supplier
                ========================================== */}

                <td className="px-5 py-4">

                  <div>

                    <p className="font-medium text-slate-800 dark:text-slate-200">
                      {purchase.supplier?.supplierName || "—"}
                    </p>

                    {purchase.supplier?.contactNumber && (
                      <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
                        {purchase.supplier.contactNumber}
                      </p>
                    )}

                  </div>

                </td>

                {/* ==========================================
                    Purchase Date
                ========================================== */}

                <td className="px-5 py-4">

                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {purchase.purchaseDate
                      ? new Date(
                          purchase.purchaseDate
                        ).toLocaleDateString()
                      : "—"}
                  </p>

                </td>

                {/* ==========================================
                    Medicines
                ========================================== */}

                <td className="px-5 py-4 text-center">

                  <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">

                    <Package size={13} />

                    {purchase.medicines?.length || 0}

                  </span>

                </td>

                {/* ==========================================
                    Total Amount
                ========================================== */}

                <td className="px-5 py-4 text-right">

                  <span className="font-bold text-slate-800 dark:text-slate-100">

                    ₹
                    {(purchase.totalAmount || 0).toLocaleString(
                      "en-IN"
                    )}

                  </span>

                </td>

                {/* ==========================================
                    Created By
                ========================================== */}

                <td className="px-5 py-4">

                  <div className="flex items-center gap-2.5">

                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">

                      {purchase.createdBy?.name
                        ?.charAt(0)
                        ?.toUpperCase() || "U"}

                    </div>

                    <div className="min-w-0">

                      <p className="truncate text-sm font-medium text-slate-700 dark:text-slate-200">
                        {purchase.createdBy?.name || "Unknown"}
                      </p>

                      {purchase.createdBy?.role && (
                        <p className="text-xs capitalize text-slate-400 dark:text-slate-500">
                          {purchase.createdBy.role}
                        </p>
                      )}

                    </div>

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

export default PurchaseTable;