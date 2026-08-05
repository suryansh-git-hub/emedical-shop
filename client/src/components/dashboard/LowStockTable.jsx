import { Link } from "react-router-dom";

function LowStockTable({ medicines = [] }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Low Stock Medicines
        </h2>

        <Link
          to="/inventory"
          className="text-blue-600 hover:underline"
        >
          View All
        </Link>
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-b text-left">
            <th className="py-3">Medicine</th>
            <th>Category</th>
            <th>Current Stock</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {medicines.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="py-6 text-center text-gray-500"
              >
                No low stock medicines found.
              </td>
            </tr>
          ) : (
            medicines.map((item) => (
              <tr
                key={item._id}
                className="border-b hover:bg-gray-50"
              >
                <td className="py-3 font-medium">
                  {item.medicine?.medicineName}
                </td>

                <td>
                  {item.medicine?.category}
                </td>

                <td>{item.currentStock}</td>

                <td>
                  <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-600">
                    Low Stock
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default LowStockTable;