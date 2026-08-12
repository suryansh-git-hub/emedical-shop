import {
  History,
  ArrowDownLeft,
  ArrowUpRight,
  FileText,
  Package,
} from "lucide-react";

const StockHistoryTable = ({ history }) => {
  // ==========================================
  // Empty State
  // ==========================================

  if (!history || history.length === 0) {
    return (
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
          
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
            <History size={30} />
          </div>

          <h2 className="text-xl font-bold text-slate-800">
            No Stock History Found
          </h2>

          <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
            No purchase or sale records are available for
            this medicine yet.
          </p>

        </div>
      </div>
    );
  }

  // ==========================================
  // Date Formatter
  // ==========================================

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ==========================================
  // Time Formatter
  // ==========================================

  const formatTime = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ==========================================
  // Table
  // ==========================================

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <History size={19} />
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-800">
              Stock History
            </h2>

            <p className="mt-0.5 text-xs text-slate-500">
              Track all stock movements for this medicine
            </p>
          </div>

        </div>

        {/* Record Count */}

        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-600 ring-1 ring-inset ring-slate-200">

          <FileText size={13} />

          {history.length}{" "}
          {history.length === 1
            ? "record"
            : "records"}

        </div>

      </div>

      {/* ==========================================
          TABLE
      ========================================== */}

      <div className="overflow-x-auto">

        <table className="min-w-[750px] w-full">

          {/* ==========================================
              TABLE HEAD
          ========================================== */}

          <thead className="bg-slate-50">

            <tr>

              <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Date
              </th>

              <th className="px-5 py-4 text-center text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Movement
              </th>

              <th className="px-5 py-4 text-center text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Quantity
              </th>

              <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Invoice Number
              </th>

            </tr>

          </thead>

          {/* ==========================================
              TABLE BODY
          ========================================== */}

          <tbody className="divide-y divide-slate-100">

            {history.map((item, index) => {

              const isPurchase =
                item.type === "PURCHASE";

              const MovementIcon = isPurchase
                ? ArrowDownLeft
                : ArrowUpRight;

              return (
                <tr
                  key={`${item.date}-${item.invoiceNumber}-${index}`}
                  className="group transition-colors duration-150 hover:bg-slate-50/70"
                >

                  {/* ==================================
                      DATE
                  ================================== */}

                  <td className="px-5 py-5">

                    <div className="flex items-center gap-3">

                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                          isPurchase
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        <MovementIcon size={17} />
                      </div>

                      <div>

                        <p className="text-sm font-semibold text-slate-700">
                          {formatDate(item.date)}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-400">
                          {formatTime(item.date)}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* ==================================
                      MOVEMENT
                  ================================== */}

                  <td className="px-5 py-5 text-center">

                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold ring-1 ring-inset ${
                        isPurchase
                          ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                          : "bg-red-50 text-red-700 ring-red-200"
                      }`}
                    >

                      <MovementIcon size={13} />

                      {isPurchase
                        ? "Purchase"
                        : "Sale"}

                    </span>

                  </td>

                  {/* ==================================
                      QUANTITY
                  ================================== */}

                  <td className="px-5 py-5 text-center">

                    <div className="inline-flex items-center gap-2">

                      <span
                        className={`text-base font-bold ${
                          isPurchase
                            ? "text-emerald-600"
                            : "text-red-600"
                        }`}
                      >
                        {isPurchase ? "+" : "-"}
                        {item.quantity}
                      </span>

                      <span className="text-xs text-slate-400">
                        units
                      </span>

                    </div>

                  </td>

                  {/* ==================================
                      INVOICE
                  ================================== */}

                  <td className="px-5 py-5">

                    <div className="flex items-center gap-2.5">

                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                        <Package size={16} />
                      </div>

                      <div>

                        <p className="text-sm font-semibold text-slate-700">
                          {item.invoiceNumber ||
                            "—"}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-400">
                          Invoice
                        </p>

                      </div>

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

export default StockHistoryTable;