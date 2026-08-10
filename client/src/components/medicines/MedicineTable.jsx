import { Pencil, Trash2 } from "lucide-react";

const IMAGE_URL = import.meta.env.VITE_BASE_URL.replace(
  /\/api\/?$/,
  ""
);

function MedicineTable({
  medicines,
  loading,
  onEdit,
  onDelete,
  isAdmin,
}) {
  if (loading) {
    return (
      <div className="rounded-lg border bg-white p-8 text-center">
        Loading medicines...
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
      <table className="min-w-full text-sm">
        {/* ================= Header ================= */}

        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Image</th>
            <th className="p-3 text-left">Medicine</th>
            <th className="p-3 text-left">Generic</th>
            <th className="p-3 text-left">Company</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-left">Batch</th>
            <th className="p-3 text-center">Stock</th>
            <th className="p-3 text-center">Unit</th>
            <th className="p-3 text-center">Purchase</th>
            <th className="p-3 text-center">Selling</th>
            <th className="p-3 text-center">GST</th>
            <th className="p-3 text-center">Expiry</th>

            {isAdmin && (
              <th className="p-3 text-center">
                Actions
              </th>
            )}
          </tr>
        </thead>

        {/* ================= Body ================= */}

        <tbody>
          {medicines.length === 0 ? (
            <tr>
              <td
                colSpan={isAdmin ? 13 : 12}
                className="p-6 text-center text-gray-500"
              >
                No medicines found.
              </td>
            </tr>
          ) : (
            medicines.map((medicine) => (
              <tr
                key={medicine._id}
                className="border-t hover:bg-gray-50"
              >
                {/* Image */}

                <td className="p-3">
                  {medicine.medicineImage ? (
                    <img
                      src={`${IMAGE_URL}/uploads/${medicine.medicineImage}`}
                      alt={medicine.medicineName}
                      className="h-12 w-12 rounded-lg border object-cover"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg border bg-gray-100 text-xs text-gray-400">
                      No Image
                    </div>
                  )}
                </td>

                {/* Medicine */}

                <td className="p-3 font-medium">
                  {medicine.medicineName}
                </td>

                {/* Generic */}

                <td className="p-3">
                  {medicine.genericName}
                </td>

                {/* Company */}

                <td className="p-3">
                  {medicine.company}
                </td>

                {/* Category */}

                <td className="p-3">
                  {medicine.category}
                </td>

                {/* Batch */}

                <td className="p-3">
                  {medicine.batchNumber}
                </td>

                {/* Stock */}

                <td
                  className={`p-3 text-center font-semibold ${
                    medicine.stock <= 10
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {medicine.stock}
                </td>

                {/* Unit */}

                <td className="p-3 text-center">
                  {medicine.unit}
                </td>

                {/* Purchase */}

                <td className="p-3 text-center">
                  ₹{medicine.purchasePrice}
                </td>

                {/* Selling */}

                <td className="p-3 text-center">
                  ₹{medicine.sellingPrice}
                </td>

                {/* GST */}

                <td className="p-3 text-center">
                  {medicine.gst}%
                </td>

                {/* Expiry */}

                <td className="p-3 text-center">
                  {new Date(
                    medicine.expiryDate
                  ).toLocaleDateString("en-IN")}
                </td>

                {/* Admin Actions */}

                {isAdmin && (
                  <td className="p-3">
                    <div className="flex justify-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          onEdit(medicine)
                        }
                        className="rounded-lg bg-yellow-500 p-2 text-white transition hover:bg-yellow-600"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          onDelete(medicine._id)
                        }
                        className="rounded-lg bg-red-500 p-2 text-white transition hover:bg-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default MedicineTable;