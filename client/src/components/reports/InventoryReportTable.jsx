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

const InventoryReportTable = ({
  inventory,
}) => {
  const [showExport, setShowExport] =
    useState(false);

  // ==========================
  // Excel Export
  // ==========================

  const handleExcelExport = () => {
    if (inventory.length === 0) {
      toast.error(
        "No inventory report available."
      );
      return;
    }

    const excelData = inventory.map(
      (item) => ({
        Medicine:
          item.medicine?.medicineName ||
          "-",

        "Current Stock":
          item.currentStock,

        "Purchase Price":
          `₹${(
            item.medicine
              ?.purchasePrice ?? 0
          ).toLocaleString()}`,

        "Selling Price":
          `₹${(
            item.medicine
              ?.sellingPrice ?? 0
          ).toLocaleString()}`,

        "Expiry Date":
          item.medicine?.expiryDate
            ? new Date(
                item.medicine.expiryDate
              ).toLocaleDateString()
            : "-",
      })
    );

    exportToExcel(
      excelData,
      "Inventory Report",
      "Inventory Report"
    );

    toast.success(
      "Inventory report exported successfully."
    );

    setShowExport(false);
  };

  // ==========================
  // PDF Export
  // ==========================

  const handlePDFExport = () => {
    if (inventory.length === 0) {
      toast.error(
        "No inventory report available."
      );
      return;
    }

    exportToPDF({
      title: "Inventory Report",

      fileName:
        "Inventory Report",

      headers: [
        "Medicine",
        "Current Stock",
        "Purchase Price",
        "Selling Price",
        "Expiry Date",
      ],

      rows: inventory.map(
        (item) => [
          item.medicine
            ?.medicineName || "-",

          item.currentStock,

          `₹${(
            item.medicine
              ?.purchasePrice ?? 0
          ).toLocaleString()}`,

          `₹${(
            item.medicine
              ?.sellingPrice ?? 0
          ).toLocaleString()}`,

          item.medicine
            ?.expiryDate
            ? new Date(
                item.medicine.expiryDate
              ).toLocaleDateString()
            : "-",
        ]
      ),
    });

    toast.success(
      "Inventory report exported successfully."
    );

    setShowExport(false);
  };

  if (inventory.length === 0) {
    return (
      <div className="rounded-xl bg-white p-8 text-center shadow">

        <div className="mb-4 flex items-center justify-between">

          <h2 className="text-xl font-semibold text-gray-700">
            Inventory Report
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
          No inventory report available.
        </p>

      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white shadow">

      {/* Header */}

      <div className="flex items-center justify-between border-b px-6 py-4">

        <h2 className="text-xl font-semibold">
          Inventory Report
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

              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                Current Stock
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

            {inventory.map((item) => (

              <tr
                key={item._id}
                className="border-t hover:bg-gray-50"
              >

                <td className="px-6 py-4 font-medium">
                  {
                    item.medicine
                      ?.medicineName
                  }
                </td>

                <td
                  className={`px-6 py-4 text-center font-semibold ${
                    item.currentStock <=
                    10
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {item.currentStock}
                </td>

                <td className="px-6 py-4 text-right">
                  ₹
                  {(
                    item.medicine
                      ?.purchasePrice ??
                    0
                  ).toLocaleString()}
                </td>

                <td className="px-6 py-4 text-right">
                  ₹
                  {(
                    item.medicine
                      ?.sellingPrice ??
                    0
                  ).toLocaleString()}
                </td>

                <td className="px-6 py-4">
                  {item.medicine
                    ?.expiryDate
                    ? new Date(
                        item.medicine.expiryDate
                      ).toLocaleDateString()
                    : "-"}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default InventoryReportTable;