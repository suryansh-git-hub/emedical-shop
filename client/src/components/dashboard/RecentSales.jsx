import { Link } from "react-router-dom";

function RecentSales({ sales = [] }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Recent Sales
        </h2>

        <Link
          to="/sales"
          className="text-blue-600 hover:underline"
        >
          View All
        </Link>
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-b text-left">
            <th className="py-3">Invoice</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {sales.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="py-6 text-center text-gray-500"
              >
                No recent sales found.
              </td>
            </tr>
          ) : (
            sales.map((sale) => (
              <tr
                key={sale._id}
                className="border-b hover:bg-gray-50"
              >
                <td className="py-3 font-medium">
                  {sale.invoiceNumber}
                </td>

                <td>
                  {sale.customer?.customerName ||
                    "Walk-in Customer"}
                </td>

                <td className="font-semibold text-green-600">
                  ₹
                  {Number(
                    sale.totalAmount
                  ).toLocaleString()}
                </td>

                <td>
                  {new Date(
                    sale.saleDate
                  ).toLocaleDateString("en-IN")}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default RecentSales;