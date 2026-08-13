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

  // ==========================
  // Empty State
  // ==========================

  if (medicines.length === 0) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-red-100
          bg-white
          p-8
          text-center
          shadow-sm

          dark:border-red-900/40
          dark:bg-slate-900
          dark:shadow-black/20
        "
      >

        <div className="mb-4 flex items-center justify-between">

          <h2
            className="
              text-xl
              font-semibold
              text-slate-800

              dark:text-white
            "
          >
            Expired Medicines
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

        <p
          className="
            mt-2
            text-slate-500

            dark:text-slate-400
          "
        >
          No expired medicines available.
        </p>

      </div>
    );
  }

  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        border
        border-red-100
        bg-white
        shadow-sm

        dark:border-red-900/40
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
          border-red-100
          bg-red-50/50
          px-6
          py-5

          dark:border-red-900/40
          dark:bg-red-950/20
        "
      >

        <div>

          <h2
            className="
              text-xl
              font-bold
              text-slate-900

              dark:text-white
            "
          >
            Expired Medicines
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-slate-500

              dark:text-slate-400
            "
          >
            Medicines that require immediate attention.
          </p>

        </div>

        <div className="relative">

          <button
            onClick={() =>
              setShowExport(!showExport)
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
                onClick={handleExcelExport}
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
                onClick={handlePDFExport}
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

              <th
                className="
                  px-6
                  py-4
                  text-left
                  text-sm
                  font-semibold
                  text-slate-600

                  dark:text-slate-300
                "
              >
                Medicine
              </th>

              <th
                className="
                  px-6
                  py-4
                  text-left
                  text-sm
                  font-semibold
                  text-slate-600

                  dark:text-slate-300
                "
              >
                Company
              </th>

              <th
                className="
                  px-6
                  py-4
                  text-left
                  text-sm
                  font-semibold
                  text-slate-600

                  dark:text-slate-300
                "
              >
                Category
              </th>

              <th
                className="
                  px-6
                  py-4
                  text-left
                  text-sm
                  font-semibold
                  text-slate-600

                  dark:text-slate-300
                "
              >
                Batch
              </th>

              <th
                className="
                  px-6
                  py-4
                  text-center
                  text-sm
                  font-semibold
                  text-slate-600

                  dark:text-slate-300
                "
              >
                Stock
              </th>

              <th
                className="
                  px-6
                  py-4
                  text-right
                  text-sm
                  font-semibold
                  text-slate-600

                  dark:text-slate-300
                "
              >
                Purchase Price
              </th>

              <th
                className="
                  px-6
                  py-4
                  text-right
                  text-sm
                  font-semibold
                  text-slate-600

                  dark:text-slate-300
                "
              >
                Selling Price
              </th>

              <th
                className="
                  px-6
                  py-4
                  text-left
                  text-sm
                  font-semibold
                  text-slate-600

                  dark:text-slate-300
                "
              >
                Expiry Date
              </th>

            </tr>

          </thead>

          <tbody>

            {medicines.map(
              (medicine) => (

                <tr
                  key={medicine._id}
                  className="
                    border-t
                    border-slate-100
                    transition
                    hover:bg-slate-50

                    dark:border-slate-800
                    dark:hover:bg-slate-800/60
                  "
                >

                  <td
                    className="
                      px-6
                      py-4
                      font-semibold
                      text-slate-800

                      dark:text-white
                    "
                  >
                    {medicine.medicineName}
                  </td>

                  <td
                    className="
                      px-6
                      py-4
                      text-slate-600

                      dark:text-slate-400
                    "
                  >
                    {medicine.companyName}
                  </td>

                  <td
                    className="
                      px-6
                      py-4
                      text-slate-600

                      dark:text-slate-400
                    "
                  >
                    {medicine.category}
                  </td>

                  <td
                    className="
                      px-6
                      py-4
                      font-mono
                      text-sm
                      text-slate-600

                      dark:text-slate-400
                    "
                  >
                    {medicine.batchNumber}
                  </td>

                  <td
                    className="
                      px-6
                      py-4
                      text-center
                      font-bold
                      text-red-600

                      dark:text-red-400
                    "
                  >
                    {medicine.stock}
                  </td>

                  <td
                    className="
                      px-6
                      py-4
                      text-right
                      text-slate-700

                      dark:text-slate-300
                    "
                  >
                    ₹
                    {(
                      medicine.purchasePrice ??
                      0
                    ).toLocaleString()}
                  </td>

                  <td
                    className="
                      px-6
                      py-4
                      text-right
                      font-medium
                      text-slate-700

                      dark:text-slate-300
                    "
                  >
                    ₹
                    {(
                      medicine.sellingPrice ??
                      0
                    ).toLocaleString()}
                  </td>

                  <td
                    className="
                      px-6
                      py-4
                      font-medium
                      text-red-600

                      dark:text-red-400
                    "
                  >
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