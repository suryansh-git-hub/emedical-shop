import { useState } from "react";
import {
  Download,
  FileSpreadsheet,
  FileText,
  ChevronDown,
} from "lucide-react";
import toast from "react-hot-toast";

import { exportToExcel } from "../../utils/exportExcel";
import { exportToPDF } from "../../utils/exportToPDF";

const ExpiredMedicinesTable = ({
  medicines,
}) => {
  const [showExport, setShowExport] =
    useState(false);

  // ==========================
  // Excel Export
  // ==========================

  const handleExcelExport = () => {
    if (medicines.length === 0) {
      toast.error(
        "No expired medicines available."
      );
      return;
    }

    const excelData = medicines.map(
      (medicine) => ({
        Medicine:
          medicine.medicineName,

        Company:
          medicine.companyName,

        Category:
          medicine.category,

        Batch:
          medicine.batchNumber,

        Stock:
          medicine.stock,

        "Purchase Price":
          `₹${(
            medicine.purchasePrice ??
            0
          ).toLocaleString()}`,

        "Selling Price":
          `₹${(
            medicine.sellingPrice ??
            0
          ).toLocaleString()}`,

        "Expiry Date": new Date(
          medicine.expiryDate
        ).toLocaleDateString(),
      })
    );

    exportToExcel(
      excelData,
      "Expired Medicines",
      "Expired Medicines Report"
    );

    toast.success(
      "Expired medicines report exported successfully."
    );

    setShowExport(false);
  };

  // ==========================
  // PDF Export
  // ==========================

  const handlePDFExport = () => {
    if (medicines.length === 0) {
      toast.error(
        "No expired medicines available."
      );
      return;
    }

    exportToPDF({
      title: "Expired Medicines Report",

      fileName:
        "Expired Medicines Report",

      headers: [
        "Medicine",
        "Company",
        "Category",
        "Batch",
        "Stock",
        "Purchase Price",
        "Selling Price",
        "Expiry Date",
      ],

      rows: medicines.map(
        (medicine) => [
          medicine.medicineName,

          medicine.companyName,

          medicine.category,

          medicine.batchNumber,

          medicine.stock,

          `₹${(
            medicine.purchasePrice ??
            0
          ).toLocaleString()}`,

          `₹${(
            medicine.sellingPrice ??
            0
          ).toLocaleString()}`,

          new Date(
            medicine.expiryDate
          ).toLocaleDateString(),
        ]
      ),
    });

    toast.success(
      "Expired medicines report exported successfully."
    );

    setShowExport(false);
  };

  if (medicines.length === 0) {
    return (
      <div className="rounded-xl bg-white p-8 text-center shadow">

        <div className="mb-4 flex items-center justify-between">

          <h2 className="text-xl font-semibold text-gray-700">
            Expired Medicines
          </h2>

          <button
            disabled
            className="flex items-center gap-2 rounded-lg bg-gray-400 px-4 py-2 text-sm font-medium text-white"
          >
            <Download size={18} />
            Export
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

      {/* Header */}

      <div className="flex items-center justify-between border-b px-6 py-4">

        <h2 className="text-xl font-semibold">
          Expired Medicines
        </h2>

        <div className="relative">

          <button
            onClick={() =>
              setShowExport(
                !showExport
              )
            }
            className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
          >
            <Download size={18} />

            Export

            <ChevronDown
              size={18}
            />
          </button>

          {showExport && (
            <div className="absolute right-0 z-20 mt-2 w-48 overflow-hidden rounded-lg border bg-white shadow-lg">

              <button
                onClick={
                  handleExcelExport
                }
                className="flex w-full items-center gap-2 px-4 py-3 hover:bg-gray-100"
              >
                <FileSpreadsheet
                  size={18}
                />

                Excel
              </button>

              <button
                onClick={
                  handlePDFExport
                }
                className="flex w-full items-center gap-2 px-4 py-3 hover:bg-gray-100"
              >
                <FileText
                  size={18}
                />

                PDF
              </button>

            </div>
          )}

        </div>

      </div>

      {/* Table */}

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

              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                Purchase Price
              </th>

              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                Selling Price
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Expiry Date
              </th>

            </tr>

          </thead>

          <tbody>

            {medicines.map(
              (medicine) => (

                <tr
                  key={medicine._id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="px-6 py-4 font-medium">
                    {
                      medicine.medicineName
                    }
                  </td>

                  <td className="px-6 py-4">
                    {
                      medicine.companyName
                    }
                  </td>

                  <td className="px-6 py-4">
                    {
                      medicine.category
                    }
                  </td>

                  <td className="px-6 py-4">
                    {
                      medicine.batchNumber
                    }
                  </td>

                  <td className="px-6 py-4 text-center font-semibold text-red-600">
                    {medicine.stock}
                  </td>

                  <td className="px-6 py-4 text-right">
                    ₹
                    {(
                      medicine.purchasePrice ??
                      0
                    ).toLocaleString()}
                  </td>

                  <td className="px-6 py-4 text-right">
                    ₹
                    {(
                      medicine.sellingPrice ??
                      0
                    ).toLocaleString()}
                  </td>

                  <td className="px-6 py-4">
                    {new Date(
                      medicine.expiryDate
                    ).toLocaleDateString()}
                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default ExpiredMedicinesTable;