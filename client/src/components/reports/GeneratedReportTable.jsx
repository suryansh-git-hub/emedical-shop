const GeneratedReportTable = ({
  title,
  reports,
  summary,
}) => {
  if (!reports || reports.length === 0) {
    return (
      <div
        className="
          rounded-2xl
          border border-slate-200
          bg-white
          p-12
          text-center
          shadow-sm
          dark:border-slate-800
          dark:bg-slate-900
          dark:shadow-black/20
        "
      >
        <h2 className="text-xl font-semibold text-slate-700 dark:text-white">
          No Report Generated
        </h2>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Select a report type and click Generate Report.
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

      <div className="border-b border-slate-200 p-6 dark:border-slate-800">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          {title}
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Generated sales report and performance summary.
        </p>
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

              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-600 dark:text-slate-300">
                Date
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-600 dark:text-slate-300">
                Medicines
              </th>

              <th className="px-6 py-4 text-right text-sm font-semibold text-slate-600 dark:text-slate-300">
                Revenue
              </th>

              <th className="px-6 py-4 text-right text-sm font-semibold text-slate-600 dark:text-slate-300">
                Profit
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-600 dark:text-slate-300">
                Created By
              </th>

            </tr>
          </thead>

          <tbody>

            {reports.map((report) => (
              <tr
                key={report._id}
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
                  {report.invoiceNumber}
                </td>

                <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                  {report.customer}
                </td>

                <td className="px-6 py-4 text-center text-slate-600 dark:text-slate-400">
                  {new Date(
                    report.saleDate
                  ).toLocaleDateString()}
                </td>

                <td className="px-6 py-4 text-center text-slate-700 dark:text-slate-300">
                  {report.totalMedicines}
                </td>

                <td className="px-6 py-4 text-right font-semibold text-slate-700 dark:text-slate-300">
                  ₹
                  {Number(
                    report.revenue
                  ).toLocaleString()}
                </td>

                <td className="px-6 py-4 text-right font-semibold text-green-600 dark:text-green-400">
                  ₹
                  {Number(
                    report.profit
                  ).toLocaleString()}
                </td>

                <td className="px-6 py-4 text-center text-slate-600 dark:text-slate-400">
                  {report.createdBy}
                </td>

              </tr>
            ))}

          </tbody>
        </table>
      </div>

      {/* Summary */}

      <div
        className="
          border-t
          border-slate-200
          bg-slate-50
          p-6
          dark:border-slate-800
          dark:bg-slate-950/40
        "
      >

        <div className="grid gap-6 md:grid-cols-3">

          {/* Orders */}

          <div
            className="
              rounded-xl
              border border-slate-200
              bg-white
              p-5
              shadow-sm
              dark:border-slate-800
              dark:bg-slate-900
            "
          >
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Total Orders
            </p>

            <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
              {summary.totalOrders}
            </h3>
          </div>

          {/* Revenue */}

          <div
            className="
              rounded-xl
              border border-blue-100
              bg-white
              p-5
              shadow-sm
              dark:border-blue-900/40
              dark:bg-slate-900
            "
          >
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Total Revenue
            </p>

            <h3 className="mt-2 text-2xl font-bold text-blue-600 dark:text-blue-400">
              ₹
              {Number(
                summary.totalRevenue
              ).toLocaleString()}
            </h3>
          </div>

          {/* Profit */}

          <div
            className="
              rounded-xl
              border border-green-100
              bg-white
              p-5
              shadow-sm
              dark:border-green-900/40
              dark:bg-slate-900
            "
          >
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Total Profit
            </p>

            <h3 className="mt-2 text-2xl font-bold text-green-600 dark:text-green-400">
              ₹
              {Number(
                summary.totalProfit
              ).toLocaleString()}
            </h3>
          </div>

        </div>

      </div>

    </div>
  );
};

export default GeneratedReportTable;