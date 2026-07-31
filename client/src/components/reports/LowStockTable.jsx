const LowStockTable = ({ medicines }) => {
  if (medicines.length === 0) {
    return (
      <div className="rounded-xl bg-white p-8 text-center shadow">
        <h2 className="text-xl font-semibold text-gray-700">
          Low Stock Medicines
        </h2>

        <p className="mt-2 text-gray-500">
          No medicines are currently low in stock.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white shadow">
      {/* Header */}

      <div className="border-b px-6 py-4">
        <h2 className="text-xl font-semibold">
          Low Stock Medicines
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

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Category
              </th>

              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                Selling Price
              </th>

            </tr>
          </thead>

          <tbody>
            {medicines.map((medicine) => (
              <tr
                key={medicine._id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-6 py-4 font-medium">
                  {medicine.medicine?.medicineName}
                </td>

                <td className="px-6 py-4 text-center">
                  <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-600">
                    {medicine.currentStock}
                  </span>
                </td>

                <td className="px-6 py-4">
                  {medicine.medicine?.category}
                </td>

                <td className="px-6 py-4 text-right">
                  ₹
                  {Number(
                    medicine.medicine?.sellingPrice
                  ).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default LowStockTable;