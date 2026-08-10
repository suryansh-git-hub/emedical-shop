import { Link } from "react-router-dom";
import { AlertTriangle, CalendarDays, Package } from "lucide-react";

function ExpiringMedicines({ medicines = [] }) {
  // ==========================================
  // Calculate expiry information
  // ==========================================

  const getExpiryInfo = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);

    // Remove time from both dates
    today.setHours(0, 0, 0, 0);
    expiry.setHours(0, 0, 0, 0);

    const difference =
      expiry.getTime() - today.getTime();

    const daysLeft = Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    );

    if (daysLeft < 0) {
      return {
        daysLeft,
        label: "Expired",
        className:
          "bg-red-50 text-red-600",
        dotClassName: "bg-red-500",
      };
    }

    if (daysLeft <= 30) {
      return {
        daysLeft,
        label: "Expiring Soon",
        className:
          "bg-orange-50 text-orange-600",
        dotClassName: "bg-orange-500",
      };
    }

    return {
      daysLeft,
      label: "Monitor",
      className:
        "bg-yellow-50 text-yellow-600",
      dotClassName: "bg-yellow-500",
    };
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      {/* ==========================================
          Header
      ========================================== */}

      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50">
            <AlertTriangle
              size={20}
              className="text-orange-500"
            />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Expiring Medicines
            </h2>

            <p className="text-sm text-slate-500">
              Medicines approaching their expiry date
            </p>
          </div>

        </div>

        <Link
          to="/inventory"
          className="rounded-lg px-3 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
        >
          View All →
        </Link>
      </div>

      {/* ==========================================
          Empty State
      ========================================== */}

      {medicines.length === 0 ? (
        <div className="flex min-h-[220px] flex-col items-center justify-center rounded-xl bg-slate-50">

          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-50">
            <Package
              size={22}
              className="text-green-600"
            />
          </div>

          <p className="font-medium text-slate-700">
            No medicines nearing expiry
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Your inventory looks good.
          </p>

        </div>
      ) : (
        <div className="space-y-3">

          {medicines.map((medicine) => {
            const expiryInfo = getExpiryInfo(
              medicine.expiryDate
            );

            return (
              <div
                key={medicine._id}
                className="
                  flex
                  items-center
                  justify-between
                  gap-4
                  rounded-xl
                  border
                  border-slate-100
                  bg-slate-50/50
                  p-4
                  transition
                  hover:border-slate-200
                  hover:bg-slate-50
                "
              >

                {/* Medicine Information */}

                <div className="flex min-w-0 items-center gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
                    <CalendarDays
                      size={18}
                      className="text-slate-500"
                    />
                  </div>

                  <div className="min-w-0">

                    <p className="truncate font-semibold text-slate-800">
                      {medicine.medicineName}
                    </p>

                    <p className="mt-1 truncate text-xs text-slate-500">
                      {medicine.company || "Unknown Company"}
                      {" • "}
                      {medicine.category || "Uncategorized"}
                    </p>

                  </div>

                </div>

                {/* Expiry Information */}

                <div className="flex shrink-0 flex-col items-end gap-1">

                  <span
                    className={`
                      inline-flex
                      items-center
                      gap-1.5
                      rounded-full
                      px-3
                      py-1.5
                      text-xs
                      font-semibold
                      ${expiryInfo.className}
                    `}
                  >
                    <span
                      className={`
                        h-1.5
                        w-1.5
                        rounded-full
                        ${expiryInfo.dotClassName}
                      `}
                    />

                    {expiryInfo.label}
                  </span>

                  <span className="text-xs text-slate-500">
                    {expiryInfo.daysLeft < 0
                      ? `Expired ${Math.abs(
                          expiryInfo.daysLeft
                        )} days ago`
                      : expiryInfo.daysLeft === 0
                      ? "Expires today"
                      : `${expiryInfo.daysLeft} days left`}
                  </span>

                  <span className="text-xs font-medium text-slate-400">
                    {new Date(
                      medicine.expiryDate
                    ).toLocaleDateString("en-IN")}
                  </span>

                </div>

              </div>
            );
          })}

        </div>
      )}
    </div>
  );
}

export default ExpiringMedicines;