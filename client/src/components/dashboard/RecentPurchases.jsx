import { Link } from "react-router-dom";

function RecentPurchases({ purchases = [] }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Recent Purchases
        </h2>

        <Link
          to="/purchases"
          className="text-blue-600 hover:underline"
        >
          View All
        </Link>
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-b text-left">
            <th className="py-3">Invoice</th>
            <th>Supplier</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {purchases.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="py-6 text-center text-gray-500"
              >
                No recent purchases found.
              </td>
            </tr>
          ) : (
            purchases.map((purchase) => (
              <tr
                key={purchase._id}
                className="border-b hover:bg-gray-50"
              >
                <td className="py-3 font-medium">
                  {purchase.invoiceNumber}
                </td>

                <td>
                  {purchase.supplier?.supplierName}
                </td>

                <td className="font-semibold text-blue-600">
                  ₹
                  {Number(
                    purchase.totalAmount
                  ).toLocaleString()}
                </td>

                <td>
                  {new Date(
                    purchase.purchaseDate
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

export default RecentPurchases;