import { Link } from "react-router-dom";

function ExpiringMedicines({ medicines = [] }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Expiring Medicines
        </h2>

        <Link
          to="/inventory"
          className="text-blue-600 hover:underline"
        >
          View All
        </Link>
      </div>

      {medicines.length === 0 ? (
        <div className="py-8 text-center text-gray-500">
          No medicines are nearing expiry.
        </div>
      ) : (
        medicines.map((medicine) => (
          <div
            key={medicine._id}
            className="mb-4 flex items-center justify-between rounded-lg border p-3 hover:bg-gray-50"
          >
            <div>
              <p className="font-medium">
                {medicine.medicineName}
              </p>

              <p className="text-sm text-gray-500">
                {medicine.company} • {medicine.category}
              </p>
            </div>

            <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-600">
              {new Date(
                medicine.expiryDate
              ).toLocaleDateString("en-IN")}
            </span>
          </div>
        ))
      )}
    </div>
  );
}

export default ExpiringMedicines;