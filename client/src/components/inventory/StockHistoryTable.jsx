const StockHistoryTable = ({ history }) => {
  if (history.length === 0) {
    return (
      <div className="rounded-xl bg-white p-8 text-center">
        <h2 className="text-xl font-semibold text-gray-700">
          No Stock History Found
        </h2>

        <p className="mt-2 text-gray-500">
          No purchase or sale records available for this medicine.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow">
      <div className="overflow-x-auto">
        <table className="min-w-full">

          <thead className="bg-gray-100">
            <tr>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Date
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                Movement
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                Quantity
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Invoice Number
              </th>

            </tr>
          </thead>

          <tbody>

            {history.map((item, index) => (
              <tr
                key={index}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-6 py-4">
                  {new Date(
                    item.date
                  ).toLocaleDateString()}
                </td>

                <td className="px-6 py-4 text-center">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                      item.type === "PURCHASE"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.type}
                  </span>
                </td>

                <td className="px-6 py-4 text-center font-semibold">
                  {item.quantity}
                </td>

                <td className="px-6 py-4">
                  {item.invoiceNumber}
                </td>

              </tr>
            ))}

          </tbody>

        </table>
      </div>
    </div>
  );
};

export default StockHistoryTable;