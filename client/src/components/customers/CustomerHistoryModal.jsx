import { X, Download } from "lucide-react";
import { generateCustomerHistoryPDF } from "../../utils/generateCustomerHistoryPDF";

const CustomerHistoryModal = ({
  isOpen,
  onClose,
  history,
}) => {
  if (!isOpen || !history) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-xl bg-white shadow-xl">

        {/* ================= Header ================= */}

        <div className="flex items-center justify-between border-b p-6">
          <div>
            <h2 className="text-2xl font-bold">
              Customer Purchase History
            </h2>

            <p className="text-gray-500">
              Purchase details of{" "}
              <span className="font-semibold">
                {history.customer.customerName}
              </span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <X />
          </button>
        </div>

        {/* ================= Customer Details ================= */}

        <div className="grid gap-6 p-6 md:grid-cols-2">

          <div className="rounded-xl border bg-slate-50 p-5">
            <h3 className="mb-4 text-lg font-semibold">
              Customer Details
            </h3>

            <div className="space-y-2 text-sm">
              <p>
                <span className="font-semibold">
                  Name :
                </span>{" "}
                {history.customer.customerName}
              </p>

              <p>
                <span className="font-semibold">
                  Contact :
                </span>{" "}
                {history.customer.contactNumber}
              </p>

              <p>
                <span className="font-semibold">
                  Email :
                </span>{" "}
                {history.customer.email}
              </p>

              <p>
                <span className="font-semibold">
                  Address :
                </span>{" "}
                {history.customer.address}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">

            <div className="rounded-xl bg-blue-50 p-5">
              <h3 className="text-sm text-gray-500">
                Total Orders
              </h3>

              <p className="mt-2 text-3xl font-bold">
                {history.totalOrders}
              </p>
            </div>

            <div className="rounded-xl bg-green-50 p-5">
              <h3 className="text-sm text-gray-500">
                Total Spent
              </h3>

              <p className="mt-2 text-3xl font-bold text-green-600">
                ₹{history.totalSpent.toLocaleString()}
              </p>
            </div>

            <div className="rounded-xl bg-yellow-50 p-5">
              <h3 className="text-sm text-gray-500">
                Reward Points
              </h3>

              <p className="mt-2 text-3xl font-bold text-yellow-600">
                ⭐ {history.customer.rewardPoints || 0}
              </p>
            </div>

          </div>

        </div>

        {/* ================= Purchase History ================= */}

        <div className="px-6 pb-6">

          <h3 className="mb-4 text-xl font-semibold">
            Purchase History
          </h3>

          <table className="min-w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="px-4 py-3 text-left">
                  Invoice
                </th>

                <th className="px-4 py-3 text-left">
                  Date
                </th>

                <th className="px-4 py-3 text-left">
                  Medicines
                </th>

                <th className="px-4 py-3 text-right">
                  Amount
                </th>

              </tr>

            </thead>

            <tbody>

              {history.sales.length === 0 ? (

                <tr>

                  <td
                    colSpan={4}
                    className="py-10 text-center text-gray-500"
                  >
                    No purchase history available.
                  </td>

                </tr>

              ) : (

                history.sales.map((sale) => (

                  <tr
                    key={sale._id}
                    className="border-t hover:bg-gray-50"
                  >

                    <td className="px-4 py-4 font-medium">
                      {sale.invoiceNumber}
                    </td>

                    <td className="px-4 py-4">
                      {new Date(
                        sale.saleDate
                      ).toLocaleDateString()}
                    </td>

                    <td className="px-4 py-4">

                      <div className="space-y-2">

                        {sale.medicines.map(
                          (item, index) => (

                            <div
                              key={index}
                              className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2"
                            >

                              <span className="font-medium">
                                💊{" "}
                                {
                                  item.medicine
                                    ?.medicineName
                                }
                              </span>

                              <span className="rounded bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
                                Qty : {item.quantity}
                              </span>

                            </div>

                          )
                        )}

                      </div>

                    </td>

                    <td className="px-4 py-4 text-right font-semibold text-green-600">
                      ₹
                      {sale.totalAmount.toLocaleString()}
                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

        {/* ================= Footer ================= */}

        <div className="flex justify-end gap-3 border-t p-6">

          <button
            onClick={() =>
              generateCustomerHistoryPDF(
                history
              )
            }
            className="flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700"
          >
            <Download size={18} />
            Download PDF
          </button>

          <button
            onClick={onClose}
            className="rounded-lg bg-gray-200 px-5 py-2 hover:bg-gray-300"
          >
            Close
          </button>

        </div>

      </div>
    </div>
  );
};

export default CustomerHistoryModal;