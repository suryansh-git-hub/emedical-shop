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

  // ==========================
  // Empty State
  // ==========================

  if (inventory.length === 0) {
    return (
      <div
        className="
          rounded-2xl
          border border-slate-200
          bg-white
          p-8
          text-center
          shadow-sm
          dark:border-slate-800
          dark:bg-slate-900
          dark:shadow-black/20
        "
      >

        <div className="mb-4 flex items-center justify-between">

          <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
            Inventory Report
          </h2>

          <button
            disabled
            className="
              flex
              items-center
              gap-2
              rounded-lg
              bg-slate-300
              px-4
              py-2
              text-sm
              font-medium
              text-white
              dark:bg-slate-700
              dark:text-slate-400
            "
          >
            <Download size={18} />
            Export
          </button>

        </div>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          No inventory report available.
        </p>

      </div>
    );
  }

  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        border border-slate-200
        bg-white
        shadow-sm
        dark:border-slate-800
        dark:bg-slate-900
        dark:shadow-black/20
      "
    >

      {/* Header */}

      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-slate-200
          px-6
          py-5
          dark:border-slate-800
        "
      >

        <div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Inventory Report
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Current stock, pricing and expiry information.
          </p>

        </div>

        <div className="relative">

          <button
            onClick={() =>
              setShowExport(
                !showExport
              )
            }
            className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-green-600
              px-4
              py-2.5
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-green-700
              hover:shadow-md
            "
          >
            <Download size={18} />

            Export

            <ChevronDown size={18} />
          </button>

          {showExport && (
            <div
              className="
                absolute
                right-0
                z-20
                mt-2
                w-48
                overflow-hidden
                rounded-xl
                border
                border-slate-200
                bg-white
                shadow-xl
                dark:border-slate-700
                dark:bg-slate-800
                dark:shadow-black/40
              "
            >

              <button
                onClick={
                  handleExcelExport
                }
                className="
                  flex
                  w-full
                  items-center
                  gap-2
                  px-4
                  py-3
                  text-left
                  text-sm
                  text-slate-700
                  transition
                  hover:bg-slate-100
                  dark:text-slate-200
                  dark:hover:bg-slate-700
                "
              >
                <FileSpreadsheet
                  size={18}
                  className="text-green-600"
                />

                Excel
              </button>

              <button
                onClick={
                  handlePDFExport
                }
                className="
                  flex
                  w-full
                  items-center
                  gap-2
                  px-4
                  py-3
                  text-left
                  text-sm
                  text-slate-700
                  transition
                  hover:bg-slate-100
                  dark:text-slate-200
                  dark:hover:bg-slate-700
                "
              >
                <FileText
                  size={18}
                  className="text-red-500"
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

          <thead
            className="
              bg-slate-50
              dark:bg-slate-800/70
            "
          >

            <tr>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">
                Medicine
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-600 dark:text-slate-300">
                Current Stock
              </th>

              <th className="px-6 py-4 text-right text-sm font-semibold text-slate-600 dark:text-slate-300">
                Purchase Price
              </th>

              <th className="px-6 py-4 text-right text-sm font-semibold text-slate-600 dark:text-slate-300">
                Selling Price
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">
                Expiry Date
              </th>

            </tr>

          </thead>

          <tbody>

            {inventory.map((item) => (

              <tr
                key={item._id}
                className="
                  border-t
                  border-slate-100
                  transition
                  hover:bg-slate-50
                  dark:border-slate-800
                  dark:hover:bg-slate-800/60
                "
              >

                <td className="px-6 py-4 font-semibold text-slate-800 dark:text-white">
                  {
                    item.medicine
                      ?.medicineName
                  }
                </td>

                <td
                  className={`px-6 py-4 text-center font-bold ${
                    item.currentStock <= 10
                      ? "text-red-600 dark:text-red-400"
                      : "text-green-600 dark:text-green-400"
                  }`}
                >
                  {item.currentStock}
                </td>

                <td className="px-6 py-4 text-right text-slate-700 dark:text-slate-300">
                  ₹
                  {(
                    item.medicine
                      ?.purchasePrice ??
                    0
                  ).toLocaleString()}
                </td>

                <td className="px-6 py-4 text-right font-medium text-slate-700 dark:text-slate-300">
                  ₹
                  {(
                    item.medicine
                      ?.sellingPrice ??
                    0
                  ).toLocaleString()}
                </td>

                <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
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