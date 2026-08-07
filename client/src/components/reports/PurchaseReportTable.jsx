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
    <div className="overflow-hidden rounded-xl bg-white shadow">

      {/* Header */}

      <div className="flex items-center justify-between border-b p-6">

        <h2 className="text-xl font-semibold">
          Purchase Report
        </h2>

        <div className="relative">

          <button
            onClick={() =>
              setShowExport(
                !showExport
              )
            }
            className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
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

              <th className="px-6 py-4 text-left">
                Invoice
              </th>

              <th className="px-6 py-4 text-left">
                Supplier
              </th>

              <th className="px-6 py-4 text-left">
                Purchase Date
              </th>

              <th className="px-6 py-4 text-center">
                Medicines
              </th>

              <th className="px-6 py-4 text-right">
                Total Amount
              </th>

              <th className="px-6 py-4 text-left">
                Created By
              </th>

            </tr>

          </thead>

          <tbody>

            {purchases.map(
              (purchase) => (
                <tr
                  key={purchase._id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium">
                    {
                      purchase.invoiceNumber
                    }
                  </td>

                  <td className="px-6 py-4">
                    {
                      purchase
                        .supplier
                        ?.supplierName
                    }
                  </td>

                  <td className="px-6 py-4">
                    {new Date(
                      purchase.purchaseDate
                    ).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 text-center">
                    {
                      purchase
                        .medicines
                        .length
                    }
                  </td>

                  <td className="px-6 py-4 text-right font-semibold text-blue-600">
                    ₹
                    {
                      purchase.totalAmount
                    }
                  </td>

                  <td className="px-6 py-4">
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