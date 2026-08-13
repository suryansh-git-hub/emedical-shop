import { Download } from "lucide-react";
import toast from "react-hot-toast";
import { exportToExcel } from "../../utils/exportExcel";

const SalesReportTable = ({ sales }) => {
  const handleExport = () => {
    if (sales.length === 0) {
      return toast.error(
        "No sales report available."
      );
    }

    const excelData = sales.map((sale) => ({
      Invoice: sale.invoiceNumber,
      Customer:
        sale.customer?.customerName || "-",
      "Sale Date": new Date(
        sale.saleDate
      ).toLocaleDateString(),
      Medicines:
        sale.medicines?.length || 0,
      "Total Amount":
        sale.totalAmount,
      "Created By":
        sale.createdBy?.name || "-",
    }));

    exportToExcel(
      excelData,
      "Sales Report"
    );

    toast.success(
      "Sales report exported successfully."
    );
  };

  if (sales.length === 0) {
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

          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Sales Report
          </h2>

          <button
            onClick={handleExport}
            className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-green-600
              px-4
              py-2
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-green-700
            "
          >
            <Download size={18} />
            Export Excel
          </button>

        </div>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          No sales report available.
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
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Sales Report
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Overview of sales transactions.
          </p>
        </div>

        <button
          onClick={handleExport}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-green-600
            px-4
            py-2
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-green-700
            hover:shadow-md
          "
        >
          <Download size={18} />
          Export Excel
        </button>

      </div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-slate-50 dark:bg-slate-800/70">

            <tr>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">
                Invoice
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">
                Customer
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">
                Sale Date
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

            {sales.map((sale) => (

              <tr
                key={sale._id}
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
                  {sale.invoiceNumber}
                </td>

                <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                  {sale.customer?.customerName}
                </td>

                <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                  {new Date(
                    sale.saleDate
                  ).toLocaleDateString()}
                </td>

                <td className="px-6 py-4 text-center text-slate-700 dark:text-slate-300">
                  {sale.medicines?.length}
                </td>

                <td className="px-6 py-4 text-right font-semibold text-green-600 dark:text-green-400">
                  ₹
                  {Number(
                    sale.totalAmount
                  ).toLocaleString()}
                </td>

                <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                  {sale.createdBy?.name}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default SalesReportTable;