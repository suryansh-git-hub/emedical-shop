const SalesTable = ({ sales }) => {
  if (sales.length === 0) {
    return (
      <div className="rounded-xl bg-white p-10 text-center shadow">
        <h2 className="text-xl font-semibold text-gray-700">
          No Sales Found
        </h2>

        <p className="mt-2 text-gray-500">
          Create your first bill to get started.
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
                Invoice Number
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Customer
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Sale Date
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

            {sales.map((sale) => (
              <tr
                key={sale._id}
                className="border-t hover:bg-gray-50"
              >

                <td className="px-6 py-4 font-medium">
                  {sale.invoiceNumber}
                </td>

                <td className="px-6 py-4">
                  {sale.customer?.customerName}
                </td>

                <td className="px-6 py-4">
                  {new Date(
                    sale.saleDate
                  ).toLocaleDateString()}
                </td>

                <td className="px-6 py-4 text-center">
                  {sale.medicines?.length}
                </td>

                <td className="px-6 py-4 text-right font-semibold">
                  ₹
                  {sale.totalAmount?.toLocaleString()}
                </td>

                <td className="px-6 py-4">
                  {sale.createdBy?.name}
                </td>

              </tr>
            ))}

          </tbody>

        </table>
      </div>
    </div>
  );
};

export default SalesTable;