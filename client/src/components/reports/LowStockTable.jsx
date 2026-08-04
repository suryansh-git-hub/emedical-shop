import { Download } from "lucide-react";
import toast from "react-hot-toast";
import { exportToExcel } from "../../utils/exportExcel";

const LowStockTable = ({ medicines }) => {
  const handleExport = () => {
    if (medicines.length === 0) {
      return toast.error("No low stock medicines available.");
    }

    const excelData = medicines.map((medicine) => ({
      Medicine: medicine.medicine?.medicineName || "-",
      Category: medicine.medicine?.category || "-",
      "Current Stock": medicine.currentStock,
      "Selling Price": medicine.medicine?.sellingPrice || 0,
    }));

    exportToExcel(excelData, "Low Stock Report");
    toast.success("Low stock report exported successfully.");
  };

  if (medicines.length === 0) {
    return (
      <div className="rounded-xl bg-white p-8 text-center shadow">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-700">
            Low Stock Medicines
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
          No medicines are currently low in stock.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white shadow">
      {/* Header */}

      <div className="flex items-center justify-between border-b px-6 py-4">
        <h2 className="text-xl font-semibold">
          Low Stock Medicines
        </h2>

        <button
          onClick={handleExport}
          className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
        >
          <Download size={18} />
          Export Excel
        </button>
      </div>

      {/* Table */}

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Medicine
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                Current Stock
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Category
              </th>

              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                Selling Price
              </th>
            </tr>
          </thead>

          <tbody>
            {medicines.map((medicine) => (
              <tr
                key={medicine._id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-6 py-4 font-medium">
                  {medicine.medicine?.medicineName}
                </td>

                <td className="px-6 py-4 text-center">
                  <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-600">
                    {medicine.currentStock}
                  </span>
                </td>

                <td className="px-6 py-4">
                  {medicine.medicine?.category}
                </td>

                <td className="px-6 py-4 text-right">
                  ₹
                  {Number(
                    medicine.medicine?.sellingPrice
                  ).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LowStockTable;