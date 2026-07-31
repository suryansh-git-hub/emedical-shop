//import { Eye } from "lucide-react";

const PurchaseTable = ({
  purchases,
  //onView,
}) => {
  if (purchases.length === 0) {
    return (
      <div className="rounded-xl bg-white p-10 text-center shadow">
        <h2 className="text-xl font-semibold text-gray-700">
          No Purchases Found
        </h2>

        <p className="mt-2 text-gray-500">
          Create your first purchase to get started.
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

              {/* <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                Action
              </th> */}

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

                <td className="px-6 py-4 text-right font-semibold">
                  ₹
                  {purchase.totalAmount?.toLocaleString()}
                </td>

                <td className="px-6 py-4">
                  {purchase.createdBy?.name}
                </td>

                {/* <td className="px-6 py-4">

                  <div className="flex justify-center">

                    <button
                      onClick={() =>
                        onView &&
                        onView(purchase)
                      }
                      className="rounded-lg bg-blue-100 p-2 text-blue-600 transition hover:bg-blue-200"
                      title="View Purchase"
                    >
                      <Eye size={18} />
                    </button>

                  </div>

                </td> */}

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default PurchaseTable;