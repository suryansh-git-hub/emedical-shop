import { Download } from "lucide-react";
import toast from "react-hot-toast";
import { exportToExcel } from "../../utils/exportExcel";

const ExpiredMedicinesTable = ({ medicines }) => {
  const handleExport = () => {
    if (medicines.length === 0) {
      return toast.error("No expired medicines available.");
    }

    const excelData = medicines.map((medicine) => ({
      Medicine: medicine.medicineName,
      Company: medicine.companyName,
      Category: medicine.category,
      Batch: medicine.batchNumber,
      Stock: medicine.stock,
      "Purchase Price": medicine.purchasePrice,
      "Selling Price": medicine.sellingPrice,
      "Expiry Date": new Date(
        medicine.expiryDate
      ).toLocaleDateString(),
    }));

    exportToExcel(excelData, "Expired Medicines Report");
    toast.success("Expired medicines report exported successfully.");
  };

  if (medicines.length === 0) {
    return (
      <div className="rounded-xl bg-white p-8 text-center shadow">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-700">
            Expired Medicines
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
          No expired medicines available.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white shadow">
      <div className="flex items-center justify-between border-b px-6 py-4">
        <h2 className="text-xl font-semibold">
          Expired Medicines
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
                Medicine
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Company
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Category
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Batch
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                Stock
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Expiry Date
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
                  {medicine.medicineName}
                </td>

                <td className="px-6 py-4">
                  {medicine.companyName}
                </td>

                <td className="px-6 py-4">
                  {medicine.category}
                </td>

                <td className="px-6 py-4">
                  {medicine.batchNumber}
                </td>

                <td className="px-6 py-4 text-center font-semibold text-red-600">
                  {medicine.stock}
                </td>

                <td className="px-6 py-4">
                  {new Date(
                    medicine.expiryDate
                  ).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpiredMedicinesTable;