const GeneratedReportTable = ({
  title,
  reports,
  summary,
}) => {
  if (!reports || reports.length === 0) {
    return (
      <div className="rounded-xl bg-white p-12 text-center shadow">
        <h2 className="text-xl font-semibold text-gray-700">
          No Report Generated
        </h2>

        <p className="mt-2 text-gray-500">
          Select a report type and click
          Generate Report.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white shadow">

      {/* Header */}

      <div className="border-b p-6">

        <h2 className="text-xl font-semibold">
          {title}
        </h2>

      </div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Invoice
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Customer
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Date
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Medicines
              </th>

              <th className="px-6 py-4 text-right text-sm font-semibold">
                Revenue
              </th>

              <th className="px-6 py-4 text-right text-sm font-semibold">
                Profit
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Created By
              </th>

            </tr>

          </thead>

          <tbody>

            {reports.map((report) => (

              <tr
                key={report._id}
                className="border-t hover:bg-gray-50"
              >

                <td className="px-6 py-4">
                  {report.invoiceNumber}
                </td>

                <td className="px-6 py-4">
                  {report.customer}
                </td>

                <td className="px-6 py-4 text-center">
                  {new Date(
                    report.saleDate
                  ).toLocaleDateString()}
                </td>

                <td className="px-6 py-4 text-center">
                  {report.totalMedicines}
                </td>

                <td className="px-6 py-4 text-right font-medium">
                  ₹
                  {Number(
                    report.revenue
                  ).toLocaleString()}
                </td>

                <td className="px-6 py-4 text-right font-medium text-green-600">
                  ₹
                  {Number(
                    report.profit
                  ).toLocaleString()}
                </td>

                <td className="px-6 py-4 text-center">
                  {report.createdBy}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Summary */}

      <div className="border-t bg-gray-50 p-6">

        <div className="grid gap-6 md:grid-cols-3">

          <div className="rounded-lg bg-white p-5 shadow-sm">

            <p className="text-sm text-gray-500">
              Total Orders
            </p>

            <h3 className="mt-2 text-2xl font-bold">
              {summary.totalOrders}
            </h3>

          </div>

          <div className="rounded-lg bg-white p-5 shadow-sm">

            <p className="text-sm text-gray-500">
              Total Revenue
            </p>

            <h3 className="mt-2 text-2xl font-bold text-blue-600">
              ₹
              {Number(
                summary.totalRevenue
              ).toLocaleString()}
            </h3>

          </div>

          <div className="rounded-lg bg-white p-5 shadow-sm">

            <p className="text-sm text-gray-500">
              Total Profit
            </p>

            <h3 className="mt-2 text-2xl font-bold text-green-600">
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