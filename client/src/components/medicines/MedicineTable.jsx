import {
  Pencil,
  Trash2,
  Package,
  CalendarClock,
} from "lucide-react";

const IMAGE_URL = import.meta.env.VITE_BASE_URL.replace(
  /\/api\/?$/,
  ""
);

// ==========================================
// Get proper image URL
// ==========================================

const getImageUrl = (image) => {
  if (!image) return null;

  // If backend already returns a complete URL
  if (
    image.startsWith("http://") ||
    image.startsWith("https://")
  ) {
    return image;
  }

  // Remove leading slash
  let imageName = image.replace(/^\/+/, "");

  // Avoid /uploads/uploads/filename
  imageName = imageName.replace(
    /^uploads\/+/i,
    ""
  );

  return `${IMAGE_URL}/uploads/${imageName}`;
};

// ==========================================
// Get expiry status
// ==========================================

const getExpiryStatus = (expiryDate) => {
  if (!expiryDate) {
    return {
      label: "Unknown",
      className: "bg-slate-100 text-slate-500",
      dotClass: "bg-slate-400",
    };
  }

  const today = new Date();
  const expiry = new Date(expiryDate);

  today.setHours(0, 0, 0, 0);
  expiry.setHours(0, 0, 0, 0);

  const difference =
    expiry.getTime() - today.getTime();

  const daysLeft = Math.ceil(
    difference / (1000 * 60 * 60 * 24)
  );

  if (daysLeft < 0) {
    return {
      label: "Expired",
      className: "bg-red-50 text-red-600",
      dotClass: "bg-red-500",
    };
  }

  if (daysLeft <= 30) {
    return {
      label: "Expiring Soon",
      className: "bg-orange-50 text-orange-600",
      dotClass: "bg-orange-500",
    };
  }

  return {
    label: "Valid",
    className: "bg-green-50 text-green-600",
    dotClass: "bg-green-500",
  };
};

// ==========================================
// Medicine Table
// ==========================================

function MedicineTable({
  medicines = [],
  loading,
  onEdit,
  onDelete,
  isAdmin,
}) {
  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
    return (
      <div className="flex min-h-[350px] flex-col items-center justify-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
          <Package
            size={24}
            className="animate-pulse text-blue-600"
          />
        </div>

        <p className="font-medium text-slate-700">
          Loading medicines...
        </p>

        <p className="mt-1 text-sm text-slate-400">
          Please wait while we fetch your inventory.
        </p>
      </div>
    );
  }

  // ==========================================
  // Empty State
  // ==========================================

  if (medicines.length === 0) {
    return (
      <div className="flex min-h-[350px] flex-col items-center justify-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
          <Package
            size={28}
            className="text-slate-400"
          />
        </div>

        <h3 className="font-semibold text-slate-800">
          No medicines found
        </h3>

        <p className="mt-1 max-w-sm text-center text-sm text-slate-500">
          Try changing your search or filters to
          find medicines in your inventory.
        </p>
      </div>
    );
  }

  return (
    <table className="w-full min-w-[1250px]">

      {/* ==========================================
          Header
      ========================================== */}

      <thead className="bg-slate-50">
        <tr className="border-b border-slate-200">

          <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            Medicine
          </th>

          <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            Generic
          </th>

          <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            Company
          </th>

          <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            Category
          </th>

          <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            Batch
          </th>

          <th className="px-4 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
            Stock
          </th>

          <th className="px-4 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
            Unit
          </th>

          <th className="px-4 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
            Purchase
          </th>

          <th className="px-4 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
            Selling
          </th>

          <th className="px-4 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
            GST
          </th>

          <th className="px-4 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
            Expiry
          </th>

          {isAdmin && (
            <th className="px-4 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
              Actions
            </th>
          )}

        </tr>
      </thead>

      {/* ==========================================
          Body
      ========================================== */}

      <tbody>

        {medicines.map((medicine) => {
          const expiryStatus = getExpiryStatus(
            medicine.expiryDate
          );

          const imageUrl = getImageUrl(
            medicine.medicineImage
          );

          return (
            <tr
              key={medicine._id}
              className="
                border-b
                border-slate-100
                transition
                hover:bg-slate-50
              "
            >

              {/* ==================================
                  Medicine
              ================================== */}

              <td className="px-4 py-4">

                <div className="flex items-center gap-3">

                  {/* Image */}

                  <div className="h-12 w-12 shrink-0">

                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={medicine.medicineName}
                        className="
                          h-12
                          w-12
                          rounded-xl
                          border
                          border-slate-200
                          bg-white
                          object-cover
                        "
                        onError={(e) => {
                          e.currentTarget.style.display =
                            "none";

                          const fallback =
                            e.currentTarget
                              .nextElementSibling;

                          if (fallback) {
                            fallback.classList.remove(
                              "hidden"
                            );
                            fallback.classList.add(
                              "flex"
                            );
                          }
                        }}
                      />
                    ) : null}

                    {/* Fallback */}

                    <div
                      className={`
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-xl
                        bg-blue-50
                        ${
                          imageUrl
                            ? "hidden"
                            : "flex"
                        }
                      `}
                    >
                      <Package
                        size={20}
                        className="text-blue-500"
                      />
                    </div>

                  </div>

                  {/* Medicine name */}

                  <div className="min-w-0">

                    <p className="font-semibold text-slate-800">
                      {medicine.medicineName}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Medicine
                    </p>

                  </div>

                </div>

              </td>

              {/* Generic */}

              <td className="px-4 py-4 text-sm text-slate-600">
                {medicine.genericName || "—"}
              </td>

              {/* Company */}

              <td className="px-4 py-4">
                <span className="text-sm font-medium text-slate-700">
                  {medicine.company || "—"}
                </span>
              </td>

              {/* Category */}

              <td className="px-4 py-4">

                <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                  {medicine.category || "—"}
                </span>

              </td>

              {/* Batch */}

              <td className="px-4 py-4">

                <span className="rounded-md bg-slate-100 px-2 py-1 font-mono text-xs font-medium text-slate-600">
                  {medicine.batchNumber || "—"}
                </span>

              </td>

              {/* Stock */}

              <td className="px-4 py-4 text-center">

                <div className="flex flex-col items-center gap-1">

                  <span
                    className={`font-bold ${
                      medicine.stock <= 10
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {medicine.stock}
                  </span>

                  <span
                    className={`
                      rounded-full
                      px-2
                      py-0.5
                      text-[10px]
                      font-semibold
                      ${
                        medicine.stock <= 10
                          ? "bg-red-50 text-red-600"
                          : "bg-green-50 text-green-600"
                      }
                    `}
                  >
                    {medicine.stock <= 10
                      ? "Low Stock"
                      : "In Stock"}
                  </span>

                </div>

              </td>

              {/* Unit */}

              <td className="px-4 py-4 text-center text-sm text-slate-600">
                {medicine.unit || "—"}
              </td>

              {/* Purchase */}

              <td className="px-4 py-4 text-center">

                <span className="font-medium text-slate-700">
                  ₹
                  {Number(
                    medicine.purchasePrice || 0
                  ).toLocaleString("en-IN")}
                </span>

              </td>

              {/* Selling */}

              <td className="px-4 py-4 text-center">

                <span className="font-semibold text-green-600">
                  ₹
                  {Number(
                    medicine.sellingPrice || 0
                  ).toLocaleString("en-IN")}
                </span>

              </td>

              {/* GST */}

              <td className="px-4 py-4 text-center">

                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                  {medicine.gst || 0}%
                </span>

              </td>

              {/* Expiry */}

              <td className="px-4 py-4">

                <div className="flex flex-col items-center gap-1">

                  <span
                    className={`
                      inline-flex
                      items-center
                      gap-1.5
                      rounded-full
                      px-2.5
                      py-1
                      text-xs
                      font-semibold
                      ${expiryStatus.className}
                    `}
                  >
                    <span
                      className={`
                        h-1.5
                        w-1.5
                        rounded-full
                        ${expiryStatus.dotClass}
                      `}
                    />

                    {expiryStatus.label}
                  </span>

                  <div className="flex items-center gap-1 text-xs text-slate-400">

                    <CalendarClock size={12} />

                    {medicine.expiryDate
                      ? new Date(
                          medicine.expiryDate
                        ).toLocaleDateString(
                          "en-IN"
                        )
                      : "—"}

                  </div>

                </div>

              </td>

              {/* Actions */}

              {isAdmin && (
                <td className="px-4 py-4">

                  <div className="flex justify-center gap-2">

                    <button
                      type="button"
                      onClick={() =>
                        onEdit(medicine)
                      }
                      title="Edit medicine"
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-lg
                        bg-amber-50
                        text-amber-600
                        transition
                        hover:bg-amber-100
                        hover:text-amber-700
                      "
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        onDelete(medicine._id)
                      }
                      title="Delete medicine"
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-lg
                        bg-red-50
                        text-red-600
                        transition
                        hover:bg-red-100
                        hover:text-red-700
                      "
                    >
                      <Trash2 size={16} />
                    </button>

                  </div>

                </td>
              )}

            </tr>
          );
        })}

      </tbody>

    </table>
  );
}

export default MedicineTable;