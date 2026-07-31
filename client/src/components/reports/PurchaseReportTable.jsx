const PurchaseReportTable = ({ purchases }) => {
  if (purchases.length === 0) {
    return (
      <div className="rounded-xl bg-white p-8 text-center shadow">
        <h2 className="text-xl font-semibold text-gray-700">
          Purchase Report
        </h2>

        <p className="mt-2 text-gray-500">
          No purchase report available.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white shadow">
      <div className="border-b px-6 py-4">
        <h2 className="text-xl font-semibold">
          Purchase Report
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Invoice
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Supplier
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Purchase Date
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                Medicines
              </th>

              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                Total Amount
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Created By
              </th>
            </tr>
          </thead>

          <tbody>
            {purchases.map((purchase) => (
              <tr
                key={purchase._id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-6 py-4 font-medium">
                  {purchase.invoiceNumber}
                </td>

                <td className="px-6 py-4">
                  {purchase.supplier?.supplierName}
                </td>

                <td className="px-6 py-4">
                  {new Date(
                    purchase.purchaseDate
                  ).toLocaleDateString()}
                </td>

                <td className="px-6 py-4 text-center">
                  {purchase.medicines?.length}
                </td>

                <td className="px-6 py-4 text-right font-semibold text-blue-600">
                  ₹
                  {Number(
                    purchase.totalAmount
                  ).toLocaleString()}
                </td>

                <td className="px-6 py-4">
                  {purchase.createdBy?.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchaseReportTable;