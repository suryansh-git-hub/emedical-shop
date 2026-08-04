import { Download } from "lucide-react";
import toast from "react-hot-toast";
import { exportToExcel } from "../../utils/exportExcel";

const BestSellingTable = ({ medicines }) => {
  const handleExport = () => {
    if (medicines.length === 0) {
      return toast.error("No sales data available.");
    }

    const excelData = medicines.map((medicine, index) => ({
      Rank: index + 1,
      Medicine: medicine.medicineName,
      Category: medicine.category,
      "Quantity Sold": medicine.totalSold,
      Revenue: medicine.totalRevenue || 0,
    }));

    exportToExcel(excelData, "Best Selling Medicines Report");
    toast.success("Best selling medicines report exported successfully.");
  };

  if (medicines.length === 0) {
    return (
      <div className="rounded-xl bg-white p-8 text-center shadow">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-700">
            Best Selling Medicines
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
          No sales data available.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white shadow">
      {/* Header */}

      <div className="flex items-center justify-between border-b px-6 py-4">
        <h2 className="text-xl font-semibold">
          Best Selling Medicines
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
                Rank
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Medicine
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Category
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                Quantity Sold
              </th>

              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                Revenue
              </th>
            </tr>
          </thead>

          <tbody>
            {medicines.map((medicine, index) => (
              <tr
                key={medicine._id || index}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-6 py-4 font-semibold">
                  #{index + 1}
                </td>

                <td className="px-6 py-4 font-medium">
                  {medicine.medicineName}
                </td>

                <td className="px-6 py-4">
                  {medicine.category}
                </td>

                <td className="px-6 py-4 text-center">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                    {medicine.totalSold}
                  </span>
                </td>

                <td className="px-6 py-4 text-right font-semibold text-green-600">
                  ₹
                  {Number(
                    medicine.totalRevenue || 0
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

export default BestSellingTable;