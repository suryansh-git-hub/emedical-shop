import { Link } from "react-router-dom";
import { AlertTriangle, Package } from "lucide-react";

function LowStockTable({ medicines = [] }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50">
            <AlertTriangle
              size={20}
              className="text-red-500"
            />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Low Stock Medicines
            </h2>

            <p className="text-sm text-slate-500">
              Medicines that need restocking
            </p>
          </div>
        </div>

        <Link
          to="/inventory"
          className="rounded-lg px-3 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
        >
          View All →
        </Link>
      </div>

      {/* Content */}
      {medicines.length === 0 ? (
        <div className="flex min-h-[180px] flex-col items-center justify-center rounded-xl bg-slate-50">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-50">
            <Package
              size={22}
              className="text-green-500"
            />
          </div>

          <p className="font-medium text-slate-700">
            Stock levels look good
          </p>

          <p className="mt-1 text-sm text-slate-500">
            No medicines need restocking right now.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="border-b border-slate-200 text-left">
                <th className="px-3 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Medicine
                </th>

                <th className="px-3 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Category
                </th>

                <th className="px-3 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Stock
                </th>

                <th className="px-3 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {medicines.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-slate-100 transition last:border-0 hover:bg-slate-50"
                >
                  {/* Medicine */}
                  <td className="px-3 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                        <Package
                          size={17}
                          className="text-blue-600"
                        />
                      </div>

                      <div>
                        <p className="font-semibold text-slate-800">
                          {item.medicine?.medicineName ||
                            "Unknown Medicine"}
                        </p>

                        <p className="text-xs text-slate-400">
                          Stock alert
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-3 py-4 text-sm text-slate-600">
                    {item.medicine?.category || "—"}
                  </td>

                  {/* Current Stock */}
                  <td className="px-3 py-4 text-center">
                    <span className="font-bold text-red-600">
                      {item.currentStock}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-3 py-4 text-center">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                      Low Stock
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default LowStockTable;