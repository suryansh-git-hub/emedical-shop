function RecentPurchases() {
  const purchases = [
    {
      id: "PO-1001",
      supplier: "ABC Pharma",
      amount: 8200,
      date: "30 Jul 2026",
    },
    {
      id: "PO-1002",
      supplier: "MediLife",
      amount: 5400,
      date: "29 Jul 2026",
    },
    {
      id: "PO-1003",
      supplier: "Sun Pharma",
      amount: 6700,
      date: "28 Jul 2026",
    },
  ];

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-semibold">
        Recent Purchases
      </h2>

      <table className="w-full">
        <thead>
          <tr className="border-b text-left">
            <th className="py-3">Purchase</th>
            <th>Supplier</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {purchases.map((purchase) => (
            <tr key={purchase.id} className="border-b hover:bg-gray-50">
              <td className="py-3">{purchase.id}</td>
              <td>{purchase.supplier}</td>
              <td className="font-semibold text-blue-600">
                ₹{purchase.amount}
              </td>
              <td>{purchase.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecentPurchases;