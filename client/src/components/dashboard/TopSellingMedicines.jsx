import { Link } from "react-router-dom";

function TopSellingMedicines({ medicines = [] }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Top Selling Medicines
        </h2>

        <Link
          to="/reports"
          className="text-blue-600 hover:underline"
        >
          View Report
        </Link>
      </div>

      {medicines.length === 0 ? (
        <div className="py-8 text-center text-gray-500">
          No sales data available.
        </div>
      ) : (
        medicines.map((medicine, index) => (
          <div
            key={index}
            className="mb-4 flex items-center justify-between rounded-lg border p-3 hover:bg-gray-50"
          >
            <div>
              <p className="font-medium">
                {medicine.medicineName}
              </p>

              <p className="text-sm text-gray-500">
                Rank #{index + 1}
              </p>
            </div>

            <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
              {medicine.quantitySold} Sold
            </span>
          </div>
        ))
      )}
    </div>
  );
}

export default TopSellingMedicines;