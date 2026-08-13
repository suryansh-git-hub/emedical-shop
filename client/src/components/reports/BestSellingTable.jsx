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

const BestSellingTable = ({
  medicines,
}) => {
  const [showExport, setShowExport] =
    useState(false);

  // ==========================
  // Excel Export
  // ==========================

  const handleExcelExport = () => {
    if (medicines.length === 0) {
      toast.error("No sales data available.");
      return;
    }

    const excelData = medicines.map(
      (medicine, index) => ({
        Rank: index + 1,

        Medicine:
          medicine.medicineName,

        Category:
          medicine.category,

        "Quantity Sold":
          medicine.totalQuantitySold,

        Revenue: `₹${Number(
          medicine.totalRevenue || 0
        ).toLocaleString()}`,
      })
    );

    exportToExcel(
      excelData,
      "Best Selling Medicines",
      "Best Selling Medicines Report"
    );

    toast.success(
      "Best selling medicines exported successfully."
    );

    setShowExport(false);
  };

  // ==========================
  // PDF Export
  // ==========================

  const handlePDFExport = () => {
    if (medicines.length === 0) {
      toast.error("No sales data available.");
      return;
    }

    exportToPDF({
      title:
        "Best Selling Medicines Report",

      fileName:
        "Best Selling Medicines Report",

      headers: [
        "Rank",
        "Medicine",
        "Category",
        "Quantity Sold",
        "Revenue",
      ],

      rows: medicines.map(
        (medicine, index) => [
          index + 1,

          medicine.medicineName,

          medicine.category,

          medicine.totalQuantitySold,

          `₹${Number(
            medicine.totalRevenue || 0
          ).toLocaleString()}`,
        ]
      ),
    });

    toast.success(
      "Best selling medicines exported successfully."
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
          border-slate-200
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

          <h2
            className="
              text-xl
              font-semibold
              text-slate-800

              dark:text-white
            "
          >
            Best Selling Medicines
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
          No sales data available.
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
        border-slate-200
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

          <h2
            className="
              text-xl
              font-bold
              text-slate-900

              dark:text-white
            "
          >
            Best Selling Medicines
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-slate-500

              dark:text-slate-400
            "
          >
            Top performing medicines by sales volume.
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
                Rank
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
                Category
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
                Quantity Sold
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
                Revenue
              </th>

            </tr>

          </thead>

          <tbody>

            {medicines.map(
              (medicine, index) => (
                <tr
                  key={
                    medicine._id ||
                    index
                  }
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
                      text-slate-700

                      dark:text-slate-200
                    "
                  >
                    #{index + 1}
                  </td>

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
                    {medicine.category}
                  </td>

                  <td className="px-6 py-4 text-center">

                    <span
                      className="
                        rounded-full
                        bg-green-100
                        px-3
                        py-1
                        text-sm
                        font-semibold
                        text-green-700

                        dark:bg-green-500/10
                        dark:text-green-400
                      "
                    >
                      {medicine.totalQuantitySold}
                    </span>

                  </td>

                  <td
                    className="
                      px-6
                      py-4
                      text-right
                      font-semibold
                      text-green-600

                      dark:text-green-400
                    "
                  >
                    ₹
                    {Number(
                      medicine.totalRevenue || 0
                    ).toLocaleString()}
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

export default BestSellingTable;