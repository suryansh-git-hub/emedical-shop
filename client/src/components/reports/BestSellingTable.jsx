const BestSellingTable = ({ medicines }) => {
  if (medicines.length === 0) {
    return (
      <div className="rounded-xl bg-white p-8 text-center shadow">
        <h2 className="text-xl font-semibold text-gray-700">
          Best Selling Medicines
        </h2>

        <p className="mt-2 text-gray-500">
          No sales data available.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white shadow">
      {/* Header */}

      <div className="border-b px-6 py-4">
        <h2 className="text-xl font-semibold">
          Best Selling Medicines
        </h2>
      </div>

      {/* Table */}

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Rank
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Medicine
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Category
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                Quantity Sold
              </th>

              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                Revenue
              </th>
            </tr>
          </thead>

          <tbody>
            {medicines.map((medicine, index) => (
              <tr
                key={medicine._id || index}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-6 py-4 font-semibold">
                  #{index + 1}
                </td>

                <td className="px-6 py-4 font-medium">
                  {medicine.medicineName}
                </td>

                <td className="px-6 py-4">
                  {medicine.category}
                </td>

                <td className="px-6 py-4 text-center">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                    {medicine.totalSold}
                  </span>
                </td>

                <td className="px-6 py-4 text-right font-semibold text-green-600">
                  ₹
                  {Number(
                    medicine.totalRevenue || 0
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

export default BestSellingTable;