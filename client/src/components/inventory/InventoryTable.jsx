import { History } from "lucide-react";

const InventoryTable = ({
  inventory,
  onIncreaseStock,
  onReduceStock,
  onViewHistory,
}) => {
  if (!inventory || inventory.length === 0) {
    return (
      <div className="rounded-xl bg-white p-10 text-center shadow">
        <h2 className="text-2xl font-semibold text-gray-700">
          No Inventory Found
        </h2>

        <p className="mt-2 text-gray-500">
          No medicines available for the selected filter.
        </p>
      </div>
    );
  }

  const getStockStatus = (item) => {
    const expiryDate = item.medicine?.expiryDate
      ? new Date(item.medicine.expiryDate)
      : null;

    const today = new Date();

    if (expiryDate && expiryDate < today) {
      return {
        label: "Expired",
        className: "bg-red-100 text-red-700",
      };
    }

    if (item.currentStock === 0) {
      return {
        label: "Out Of Stock",
        className: "bg-red-100 text-red-700",
      };
    }

    if (item.currentStock <= item.reorderLevel) {
      return {
        label: "Low Stock",
        className: "bg-yellow-100 text-yellow-700",
      };
    }

    return {
      label: "In Stock",
      className: "bg-green-100 text-green-700",
    };
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-4 text-center text-sm font-semibold">
                #
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Medicine
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Generic
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Company
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Category
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Stock
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Reorder
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Stock Level
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Expiry
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Status
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {inventory.map((item, index) => {
              const status = getStockStatus(item);

              const stockPercentage = Math.min(
                (item.currentStock / (item.reorderLevel * 2 || 1)) * 100,
                100
              );

              return (
                <tr
                  key={item._id}
                  className="border-t transition hover:bg-gray-50"
                >
                  <td className="px-4 py-4 text-center font-medium">
                    {index + 1}
                  </td>

                  <td className="px-6 py-4 font-semibold text-gray-800">
                    {item.medicine?.medicineName || "-"}
                  </td>

                  <td className="px-6 py-4">
                    {item.medicine?.genericName || "-"}
                  </td>

                  <td className="px-6 py-4">
                    {item.medicine?.company || "-"}
                  </td>

                  <td className="px-6 py-4">
                    {item.medicine?.category || "-"}
                  </td>

                  <td
                    className={`px-6 py-4 text-center font-bold ${
                      item.currentStock === 0
                        ? "text-red-600"
                        : item.currentStock <= item.reorderLevel
                        ? "text-yellow-600"
                        : "text-green-600"
                    }`}
                  >
                    {item.currentStock}
                  </td>

                  <td className="px-6 py-4 text-center">
                    {item.reorderLevel}
                  </td>

                  <td className="px-6 py-4">
                    <div className="mx-auto w-28">
                      <div className="h-2 rounded-full bg-gray-200">
                        <div
                          className={`h-2 rounded-full ${
                            item.currentStock === 0
                              ? "bg-red-500"
                              : item.currentStock <= item.reorderLevel
                              ? "bg-yellow-500"
                              : "bg-green-500"
                          }`}
                          style={{
                            width: `${stockPercentage}%`,
                          }}
                        />
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-center">
                    {formatDate(item.medicine?.expiryDate)}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${status.className}`}
                    >
                      {status.label}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() =>
                          onIncreaseStock(item.medicine)
                        }
                        className="rounded-lg bg-green-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-green-700"
                      >
                        + Stock
                      </button>

                      <button
                        onClick={() =>
                          onReduceStock(item.medicine)
                        }
                        className="rounded-lg bg-orange-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-orange-700"
                      >
                        - Stock
                      </button>

                      <button
                        onClick={() =>
                          onViewHistory(item.medicine?._id)
                        }
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-blue-700"
                      >
                        <History size={15} />
                        History
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