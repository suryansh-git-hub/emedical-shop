import {
  X,
  Download,
} from "lucide-react";

import { generateSupplierHistoryPDF } from "../../utils/generateSupplierHistoryPDF";

const SupplierHistoryModal = ({
  isOpen,
  onClose,
  history,
}) => {
  if (!isOpen || !history) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-xl bg-white shadow-xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b p-6">

          <div>
            <h2 className="text-2xl font-bold">
              Supplier Purchase History
            </h2>

            <p className="text-gray-500">
              {history.supplier.supplierName}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <X />
          </button>

        </div>

        {/* Summary */}

        <div className="grid grid-cols-2 gap-6 p-6">

          <div className="rounded-lg bg-blue-50 p-4">
            <h3 className="text-sm text-gray-500">
              Total Purchases
            </h3>

            <p className="mt-2 text-3xl font-bold">
              {history.totalPurchases}
            </p>
          </div>

          <div className="rounded-lg bg-green-50 p-4">
            <h3 className="text-sm text-gray-500">
              Total Amount
            </h3>

            <p className="mt-2 text-3xl font-bold text-green-600">
              ₹
              {history.totalSpent.toLocaleString()}
            </p>
          </div>

        </div>

        {/* Purchase Table */}

        <div className="px-6 pb-6">

          <table className="min-w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="px-4 py-3 text-left">
                  Invoice
                </th>

                <th className="px-4 py-3 text-left">
                  Date
                </th>

                <th className="px-4 py-3 text-center">
                  Medicines
                </th>

                <th className="px-4 py-3 text-right">
                  Amount
                </th>

              </tr>

            </thead>

            <tbody>

              {history.purchases.length === 0 ? (

                <tr>

                  <td
                    colSpan={4}
                    className="py-8 text-center text-gray-500"
                  >
                    No purchases found.
                  </td>

                </tr>

              ) : (

                history.purchases.map(
                  (purchase) => (

                    <tr
                      key={purchase._id}
                      className="border-t"
                    >

                      <td className="px-4 py-4">
                        {purchase.invoiceNumber}
                      </td>

                      <td className="px-4 py-4">
                        {new Date(
                          purchase.purchaseDate
                        ).toLocaleDateString()}
                      </td>

       
                <td className="px-4 py-4">
  <div className="space-y-2">
    {purchase.medicines.map((item, index) => (
      <div
        key={index}
        className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2"
      >
        <span className="font-medium text-slate-800">
          💊 {item.medicine?.medicineName}
        </span>

        <span className="rounded bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
          Qty: {item.quantity}
        </span>
      </div>
    ))}
  </div>
</td>

                      <td className="px-4 py-4 text-right font-semibold">
                        ₹
                        {purchase.totalAmount.toLocaleString()}
                      </td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t p-6">

          <button
            onClick={() =>
              generateSupplierHistoryPDF(
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

export default SupplierHistoryModal;