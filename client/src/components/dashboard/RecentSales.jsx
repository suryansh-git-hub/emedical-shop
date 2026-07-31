function RecentSales() {
  const sales = [
    {
      id: "INV-1001",
      customer: "Rahul Sharma",
      amount: 850,
      date: "30 Jul 2026",
    },
    {
      id: "INV-1002",
      customer: "Priya Singh",
      amount: 1200,
      date: "30 Jul 2026",
    },
    {
      id: "INV-1003",
      customer: "Amit Verma",
      amount: 430,
      date: "29 Jul 2026",
    },
    {
      id: "INV-1004",
      customer: "Neha Gupta",
      amount: 960,
      date: "29 Jul 2026",
    },
  ];

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Recent Sales
        </h2>

        <button className="text-blue-600 hover:underline">
          View All
        </button>
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-b text-left">
            <th className="py-3">Invoice</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {sales.map((sale) => (
            <tr
              key={sale.id}
              className="border-b hover:bg-gray-50"
            >
              <td className="py-3 font-medium">
                {sale.id}
              </td>

              <td>{sale.customer}</td>

              <td className="font-semibold text-green-600">
                ₹{sale.amount}
              </td>

              <td>{sale.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecentSales;