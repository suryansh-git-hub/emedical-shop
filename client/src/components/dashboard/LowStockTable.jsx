
function LowStockTable() {
  const medicines = [
    {
      id: 1,
      name: "Paracetamol",
      stock: 5,
      category: "Tablet",
    },
    {
      id: 2,
      name: "Crocin",
      stock: 3,
      category: "Tablet",
    },
    {
      id: 3,
      name: "Vitamin C",
      stock: 2,
      category: "Capsule",
    },
    {
      id: 4,
      name: "Dolo 650",
      stock: 4,
      category: "Tablet",
    },
  ];

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Low Stock Medicines
        </h2>

        <button className="text-blue-600 hover:underline">
          View All
        </button>
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-b text-left">
            <th className="py-3">Medicine</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {medicines.map((medicine) => (
            <tr
              key={medicine.id}
              className="border-b hover:bg-gray-50"
            >
              <td className="py-3">{medicine.name}</td>

              <td>{medicine.category}</td>

              <td>{medicine.stock}</td>

              <td>
                <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-600">
                  Low Stock
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LowStockTable;