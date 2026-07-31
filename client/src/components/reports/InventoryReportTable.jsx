const InventoryReportTable = ({ inventory }) => {
  if (inventory.length === 0) {
    return (
      <div className="rounded-xl bg-white p-8 text-center shadow">
        <h2 className="text-xl font-semibold text-gray-700">
          Inventory Report
        </h2>

        <p className="mt-2 text-gray-500">
          No inventory report available.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white shadow">
      {/* Header */}

      <div className="border-b px-6 py-4">
        <h2 className="text-xl font-semibold">
          Inventory Report
        </h2>
      </div>

      {/* Table */}

      <div className="overflow-x-auto">
        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Medicine
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                Current Stock
              </th>

              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                Purchase Price
              </th>

              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                Selling Price
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Expiry Date
              </th>

            </tr>

          </thead>

          <tbody>

            {inventory.map((item) => (
              <tr
                key={item._id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-6 py-4 font-medium">
                  {item.medicine?.medicineName}
                </td>

                <td
                  className={`px-6 py-4 text-center font-semibold ${
                    item.currentStock <= 10
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {item.currentStock}
                </td>

                <td className="px-6 py-4 text-right">
                  ₹
                  {Number(
                    item.medicine?.purchasePrice
                  ).toLocaleString()}
                </td>

                <td className="px-6 py-4 text-right">
                  ₹
                  {Number(
                    item.medicine?.sellingPrice
                  ).toLocaleString()}
                </td>

                <td className="px-6 py-4">
                  {item.medicine?.expiryDate
                    ? new Date(
                        item.medicine.expiryDate
                      ).toLocaleDateString()
                    : "-"}
                </td>

              </tr>
            ))}

          </tbody>

        </table>
      </div>
    </div>
  );
};

export default InventoryReportTable;