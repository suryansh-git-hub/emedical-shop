import { Download } from "lucide-react";
import toast from "react-hot-toast";
import { exportToExcel } from "../../utils/exportExcel";

const PurchaseReportTable = ({ purchases }) => {
  const handleExport = () => {
    if (purchases.length === 0) {
      return toast.error("No purchase report available.");
    }

    const excelData = purchases.map((purchase) => ({
      Invoice: purchase.invoiceNumber,
      Supplier: purchase.supplier?.supplierName || "-",
      "Purchase Date": new Date(
        purchase.purchaseDate
      ).toLocaleDateString(),
      Medicines: purchase.medicines?.length || 0,
      "Total Amount": purchase.totalAmount,
      "Created By": purchase.createdBy?.name || "-",
    }));

    exportToExcel(excelData, "Purchase Report");
    toast.success("Purchase report exported successfully.");
  };

  if (purchases.length === 0) {
    return (
      <div className="rounded-xl bg-white p-8 text-center shadow">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-700">
            Purchase Report
          </h2>

          <button
            onClick={handleExport}
            className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
          >
            <Download size={18} />
            Export Excel
          </button>
        </div>

        <p className="mt-2 text-gray-500">
          No purchase report available.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white shadow">
      <div className="flex items-center justify-between border-b px-6 py-4">
        <h2 className="text-xl font-semibold">
          Purchase Report
        </h2>

        <button
          onClick={handleExport}
          className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
        >
          <Download size={18} />
          Export Excel
        </button>
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