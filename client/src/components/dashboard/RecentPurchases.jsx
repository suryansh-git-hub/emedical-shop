import { Link } from "react-router-dom";
import { ClipboardList, Truck } from "lucide-react";

function RecentPurchases({ purchases = [] }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50">
            <ClipboardList
              size={20}
              className="text-purple-600"
            />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Recent Purchases
            </h2>

            <p className="text-sm text-slate-500">
              Latest purchases from suppliers
            </p>
          </div>
        </div>

        <Link
          to="/purchases"
          className="rounded-lg px-3 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
        >
          View All →
        </Link>
      </div>

      {/* Empty State */}
      {purchases.length === 0 ? (
        <div className="flex min-h-[180px] flex-col items-center justify-center rounded-xl bg-slate-50">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-50">
            <Truck
              size={22}
              className="text-purple-600"
            />
          </div>

          <p className="font-medium text-slate-700">
            No recent purchases
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Your latest supplier purchases will appear here.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="border-b border-slate-200 text-left">
                <th className="px-3 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Invoice
                </th>

                <th className="px-3 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Supplier
                </th>

                <th className="px-3 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Amount
                </th>

                <th className="px-3 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              {purchases.map((purchase) => (
                <tr
                  key={purchase._id}
                  className="border-b border-slate-100 transition last:border-0 hover:bg-slate-50"
                >
                  {/* Invoice */}
                  <td className="px-3 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50">
                        <ClipboardList
                          size={17}
                          className="text-purple-600"
                        />
                      </div>

                      <div>
                        <p className="font-semibold text-slate-800">
                          {purchase.invoiceNumber}
                        </p>

                        <p className="text-xs text-slate-400">
                          Purchase invoice
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Supplier */}
                  <td className="px-3 py-4 text-sm text-slate-600">
                    {purchase.supplier?.supplierName ||
                      "Unknown Supplier"}
                  </td>

                  {/* Amount */}
                  <td className="px-3 py-4 text-center">
                    <span className="font-bold text-purple-600">
                      ₹
                      {Number(
                        purchase.totalAmount
                      ).toLocaleString("en-IN")}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="px-3 py-4 text-right text-sm text-slate-500">
                    {new Date(
                      purchase.purchaseDate
                    ).toLocaleDateString("en-IN")}
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

export default RecentPurchases;