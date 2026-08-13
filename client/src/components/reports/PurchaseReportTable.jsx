import { useState } from "react";
import {
  Download,
  FileSpreadsheet,
  FileText,
  ChevronDown,
} from "lucide-react";

import { exportToExcel } from "../../utils/exportExcel";
import { exportToPDF } from "../../utils/exportToPDF";

const PurchaseReportTable = ({
  purchases,
}) => {
  const [showExport, setShowExport] =
    useState(false);

  // ==========================
  // Excel Export
  // ==========================

  const handleExcelExport = () => {
    const data = purchases.map(
      (purchase) => ({
        Invoice:
          purchase.invoiceNumber,

        Supplier:
          purchase.supplier
            ?.supplierName,

        Date: new Date(
          purchase.purchaseDate
        ).toLocaleDateString(),

        Medicines:
          purchase.medicines.length,

        Amount: `₹${purchase.totalAmount}`,

        "Created By":
          purchase.createdBy?.name,
      })
    );

    exportToExcel(
      data,
      "Purchase Report",
      "Purchase Report"
    );

    setShowExport(false);
  };

  // ==========================
  // PDF Export
  // ==========================

  const handlePDFExport = () => {
    exportToPDF({
      title: "Purchase Report",

      fileName: "Purchase Report",

      headers: [
        "Invoice",
        "Supplier",
        "Date",
        "Medicines",
        "Amount",
        "Created By",
      ],

      rows: purchases.map(
        (purchase) => [
          purchase.invoiceNumber,

          purchase.supplier
            ?.supplierName,

          new Date(
            purchase.purchaseDate
          ).toLocaleDateString(),

          purchase.medicines.length,

          `₹${purchase.totalAmount}`,

          purchase.createdBy?.name,
        ]
      ),
    });

    setShowExport(false);
  };

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
          p-6
          dark:border-slate-800
        "
      >

        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Purchase Report
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Overview of purchase transactions.
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
                Invoice
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">
                Supplier
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">
                Purchase Date
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-600 dark:text-slate-300">
                Medicines
              </th>

              <th className="px-6 py-4 text-right text-sm font-semibold text-slate-600 dark:text-slate-300">
                Total Amount
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">
                Created By
              </th>

            </tr>

          </thead>

          <tbody>

            {purchases.map(
              (purchase) => (
                <tr
                  key={purchase._id}
                  className="
                    border-t
                    border-slate-100
                    transition
                    hover:bg-slate-50
                    dark:border-slate-800
                    dark:hover:bg-slate-800/60
                  "
                >

                  <td className="px-6 py-4 font-medium text-slate-800 dark:text-slate-200">
                    {
                      purchase.invoiceNumber
                    }
                  </td>

                  <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                    {
                      purchase
                        .supplier
                        ?.supplierName
                    }
                  </td>

                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    {new Date(
                      purchase.purchaseDate
                    ).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 text-center text-slate-700 dark:text-slate-300">
                    {
                      purchase
                        .medicines
                        .length
                    }
                  </td>

                  <td className="px-6 py-4 text-right font-semibold text-blue-600 dark:text-blue-400">
                    ₹
                    {
                      purchase.totalAmount
                    }
                  </td>

                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    {
                      purchase
                        .createdBy
                        ?.name
                    }
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

export default PurchaseReportTable;