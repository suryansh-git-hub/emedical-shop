import { Download } from "lucide-react";
import toast from "react-hot-toast";
import { exportToExcel } from "../../utils/exportExcel";

const SalesReportTable = ({ sales }) => {
  const handleExport = () => {
    if (sales.length === 0) {
      return toast.error("No sales report available.");
    }

    const excelData = sales.map((sale) => ({
      Invoice: sale.invoiceNumber,
      Customer: sale.customer?.customerName || "-",
      "Sale Date": new Date(sale.saleDate).toLocaleDateString(),
      Medicines: sale.medicines?.length || 0,
      "Total Amount": sale.totalAmount,
      "Created By": sale.createdBy?.name || "-",
    }));

    exportToExcel(excelData, "Sales Report");
    toast.success("Sales report exported successfully.");
  };

  if (sales.length === 0) {
    return (
      <div className="rounded-xl bg-white p-8 text-center shadow">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-700">
            Sales Report
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
          No sales report available.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white shadow">
      <div className="flex items-center justify-between border-b px-6 py-4">
        <h2 className="text-xl font-semibold">
          Sales Report
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
                  {new Date(sale.saleDate).toLocaleDateString()}
                </td>

                <td className="px-6 py-4 text-center">
                  {sale.medicines?.length}
                </td>

                <td className="px-6 py-4 text-right font-semibold text-green-600">
                  ₹{Number(sale.totalAmount).toLocaleString()}
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

export default SalesReportTable;