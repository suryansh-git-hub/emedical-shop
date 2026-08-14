import {
  History,
  Package,
  Plus,
  Minus,
  AlertTriangle,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const InventoryTable = ({
  inventory,
  onIncreaseStock,
  onReduceStock,
  onViewHistory,
}) => {
  // ==========================================
  // Empty State
  // ==========================================

  if (!inventory || inventory.length === 0) {
    return (
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">

          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
            <Package size={30} />
          </div>

          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
            No Inventory Found
          </h2>

          <p className="mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
            No medicines are available for the selected filter.
            Try changing the filter or add medicine stock.
          </p>

        </div>
      </div>
    );
  }

  // ==========================================
  // Stock Status
  // ==========================================

  const getStockStatus = (item) => {
    const expiryDate = item.medicine?.expiryDate
      ? new Date(item.medicine.expiryDate)
      : null;

    const today = new Date();

    if (expiryDate && expiryDate < today) {
      return {
        label: "Expired",
        className:
          "bg-red-50 text-red-700 ring-1 ring-inset ring-red-200 dark:bg-red-950/40 dark:text-red-400 dark:ring-red-900",
        icon: XCircle,
      };
    }

    if (Number(item.currentStock) === 0) {
      return {
        label: "Out of Stock",
        className:
          "bg-red-50 text-red-700 ring-1 ring-inset ring-red-200 dark:bg-red-950/40 dark:text-red-400 dark:ring-red-900",
        icon: XCircle,
      };
    }

    if (
      Number(item.currentStock) <=
      Number(item.reorderLevel)
    ) {
      return {
        label: "Low Stock",
        className:
          "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:ring-amber-900",
        icon: AlertTriangle,
      };
    }

    return {
      label: "In Stock",
      className:
        "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:ring-emerald-900",
      icon: CheckCircle2,
    };
  };

  // ==========================================
  // Date Formatter
  // ==========================================

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // ==========================================
  // Stock Color
  // ==========================================

  const getStockColor = (item) => {
    const currentStock =
      Number(item.currentStock) || 0;

    const reorderLevel =
      Number(item.reorderLevel) || 0;

    if (currentStock === 0) {
      return "text-red-600 dark:text-red-400";
    }

    if (currentStock <= reorderLevel) {
      return "text-amber-600 dark:text-amber-400";
    }

    return "text-emerald-600 dark:text-emerald-400";
  };

  // ==========================================
  // Stock Progress
  // ==========================================

  const getStockPercentage = (item) => {
    const reorderLevel =
      Number(item.reorderLevel) || 1;

    const currentStock =
      Number(item.currentStock) || 0;

    return Math.min(
      (currentStock /
        (reorderLevel * 2)) *
        100,
      100
    );
  };

  // ==========================================
  // Table
  // ==========================================

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

      {/* ==========================================
          TABLE HEADER
      ========================================== */}

      <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-5 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
            <Package size={19} />
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
              Inventory Records
            </h2>

            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              Manage medicine stock and inventory levels
            </p>
          </div>

        </div>

        <div className="inline-flex w-fit items-center rounded-full bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-600 ring-1 ring-inset ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700">
          {inventory.length}{" "}
          {inventory.length === 1
            ? "record"
            : "records"}{" "}
          shown
        </div>

      </div>

      {/* ==========================================
          RESPONSIVE TABLE
      ========================================== */}

      <div className="overflow-x-auto">

        <table className="min-w-[1250px] w-full">

          {/* ==========================================
              TABLE HEAD
          ========================================== */}

          <thead className="bg-slate-50 dark:bg-slate-800/70">

            <tr>

              <th className="w-12 px-4 py-4 text-center text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                #
              </th>

              <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Medicine
              </th>

              <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Generic
              </th>

              <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Company
              </th>

              <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Category
              </th>

              <th className="px-5 py-4 text-center text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Stock
              </th>

              <th className="px-5 py-4 text-center text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Reorder
              </th>

              <th className="px-5 py-4 text-center text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Stock Level
              </th>

              <th className="px-5 py-4 text-center text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Expiry
              </th>

              <th className="px-5 py-4 text-center text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Status
              </th>

              <th className="px-5 py-4 text-center text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Actions
              </th>

            </tr>

          </thead>

          {/* ==========================================
              TABLE BODY
          ========================================== */}

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">

            {inventory.map((item, index) => {

              const status =
                getStockStatus(item);

              const StatusIcon =
                status.icon;

              const stockPercentage =
                getStockPercentage(item);

              return (
                <tr
                  key={item._id}
                  className="group transition-colors duration-150 hover:bg-slate-50/70 dark:hover:bg-slate-800/50"
                >

                  {/* # */}

                  <td className="px-4 py-5 text-center">
                    <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                      {index + 1}
                    </span>
                  </td>

                  {/* MEDICINE */}

                  <td className="px-5 py-5">

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                        <Package size={17} />
                      </div>

                      <div className="min-w-0">

                        <p className="truncate text-sm font-bold text-slate-800 dark:text-slate-100">
                          {item.medicine?.medicineName ||
                            "-"}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
                          Medicine
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* GENERIC */}

                  <td className="px-5 py-5">
                    <span className="text-sm text-slate-600 dark:text-slate-300">
                      {item.medicine?.genericName ||
                        "-"}
                    </span>
                  </td>

                  {/* COMPANY */}

                  <td className="px-5 py-5">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                      {item.medicine?.company ||
                        "-"}
                    </span>
                  </td>

                  {/* CATEGORY */}

                  <td className="px-5 py-5">
                    <span className="inline-flex rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      {item.medicine?.category ||
                        "-"}
                    </span>
                  </td>

                  {/* STOCK */}

                  <td className="px-5 py-5 text-center">

                    <span
                      className={`text-base font-bold ${getStockColor(
                        item
                      )}`}
                    >
                      {Number(
                        item.currentStock
                      ) || 0}
                    </span>

                  </td>

                  {/* REORDER */}

                  <td className="px-5 py-5 text-center">

                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                      {Number(
                        item.reorderLevel
                      ) || 0}
                    </span>

                  </td>

                  {/* STOCK LEVEL */}

                  <td className="px-5 py-5">

                    <div className="mx-auto w-28">

                      <div className="mb-1.5 flex items-center justify-between">

                        <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500">
                          Level
                        </span>

                        <span
                          className={`text-[10px] font-bold ${getStockColor(
                            item
                          )}`}
                        >
                          {Math.round(
                            stockPercentage
                          )}
                          %
                        </span>

                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">

                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            Number(
                              item.currentStock
                            ) === 0
                              ? "bg-red-500"
                              : Number(
                                  item.currentStock
                                ) <=
                                Number(
                                  item.reorderLevel
                                )
                              ? "bg-amber-500"
                              : "bg-emerald-500"
                          }`}
                          style={{
                            width: `${stockPercentage}%`,
                          }}
                        />

                      </div>

                    </div>

                  </td>

                  {/* EXPIRY */}

                  <td className="px-5 py-5 text-center">

                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                      {formatDate(
                        item.medicine
                          ?.expiryDate
                      )}
                    </span>

                  </td>

                  {/* STATUS */}

                  <td className="px-5 py-5 text-center">

                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[11px] font-bold ${status.className}`}
                    >
                      <StatusIcon size={13} />
                      {status.label}
                    </span>

                  </td>

                  {/* ACTIONS */}

                  <td className="px-5 py-5">

                    <div className="flex items-center justify-center gap-1.5">

                      {/* ==================================
                          INCREASE STOCK
                      ================================== */}

                      <button
                        type="button"
                        onClick={() =>
                          onIncreaseStock(
                            item
                          )
                        }
                        className="
                          inline-flex
                          h-9
                          items-center
                          gap-1.5
                          rounded-lg
                          bg-emerald-600
                          px-3
                          text-xs
                          font-semibold
                          text-white
                          shadow-sm
                          transition
                          hover:bg-emerald-700
                          hover:shadow
                          active:scale-95
                        "
                        title="Increase stock"
                      >
                        <Plus size={14} />
                        <span>Stock</span>
                      </button>

                      {/* ==================================
                          REDUCE STOCK
                      ================================== */}

                      <button
                        type="button"
                        onClick={() =>
                          onReduceStock(
                            item
                          )
                        }
                        className="
                          inline-flex
                          h-9
                          items-center
                          gap-1.5
                          rounded-lg
                          bg-orange-500
                          px-3
                          text-xs
                          font-semibold
                          text-white
                          shadow-sm
                          transition
                          hover:bg-orange-600
                          hover:shadow
                          active:scale-95
                        "
                        title="Reduce stock"
                      >
                        <Minus size={14} />
                        <span>Stock</span>
                      </button>

                      {/* ==================================
                          STOCK HISTORY
                      ================================== */}

                      <button
                        type="button"
                        onClick={() =>
                          onViewHistory(
                            item.medicine?._id
                          )
                        }
                        className="
                          inline-flex
                          h-9
                          items-center
                          gap-1.5
                          rounded-lg
                          bg-blue-600
                          px-3
                          text-xs
                          font-semibold
                          text-white
                          shadow-sm
                          transition
                          hover:bg-blue-700
                          hover:shadow
                          active:scale-95
                        "
                        title="View stock history"
                      >
                        <History size={14} />
                        <span>History</span>
                      </button>

                    </div>

                  </td>

                </tr>
              );
            })}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default InventoryTable;