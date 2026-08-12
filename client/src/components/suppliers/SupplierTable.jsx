import {
  Pencil,
  Trash2,
  History,
  Building2,
} from "lucide-react";

const SupplierTable = ({
  suppliers,
  onEdit,
  onDelete,
  onHistory,
}) => {
  // ==========================================
  // Empty State
  // ==========================================

  if (suppliers.length === 0) {
    return (
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
          
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <Building2 size={26} />
          </div>

          <h2 className="text-lg font-semibold text-slate-800">
            No Suppliers Found
          </h2>

          <p className="mt-1 max-w-sm text-sm text-slate-500">
            No suppliers match your search. Add a new
            supplier to get started.
          </p>

        </div>
      </div>
    );
  }

  // ==========================================
  // Supplier Table
  // ==========================================

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* ==========================================
          Table Header
      ========================================== */}

      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">

        <div>
          <h2 className="text-sm font-semibold text-slate-800">
            Suppliers
          </h2>

          <p className="mt-0.5 text-xs text-slate-500">
            {suppliers.length} supplier
            {suppliers.length !== 1 ? "s" : ""} found
          </p>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Building2 size={17} />
        </div>

      </div>

      {/* ==========================================
          Responsive Table
      ========================================== */}

      <div className="overflow-x-auto">

        <table className="min-w-[1050px] w-full">

          {/* ==========================================
              Table Head
          ========================================== */}

          <thead className="bg-slate-50">

            <tr>

              <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6">
                Supplier
              </th>

              <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Contact
              </th>

              <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Email
              </th>

              <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                GST Number
              </th>

              <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Address
              </th>

              <th className="px-5 py-3.5 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                Actions
              </th>

            </tr>

          </thead>

          {/* ==========================================
              Table Body
          ========================================== */}

          <tbody className="divide-y divide-slate-100">

            {suppliers.map((supplier) => (

              <tr
                key={supplier._id}
                className="group transition-colors hover:bg-slate-50/70"
              >

                {/* ==================================
                    Supplier
                ================================== */}

                <td className="px-5 py-4 sm:px-6">

                  <div className="flex items-center gap-3">

                    {/* Avatar */}

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-sm font-semibold text-blue-600">
                      {supplier.supplierName
                        ?.charAt(0)
                        ?.toUpperCase() || "S"}
                    </div>

                    {/* Name */}

                    <div className="min-w-0">

                      <p className="truncate font-semibold text-slate-800">
                        {supplier.supplierName || "—"}
                      </p>

                      <p className="mt-0.5 text-xs text-slate-400">
                        Supplier
                      </p>

                    </div>

                  </div>

                </td>

                {/* ==================================
                    Contact
                ================================== */}

                <td className="px-5 py-4">

                  <span className="text-sm font-medium text-slate-600">
                    {supplier.contactNumber || "—"}
                  </span>

                </td>

                {/* ==================================
                    Email
                ================================== */}

                <td className="px-5 py-4">

                  <span className="block max-w-[230px] truncate text-sm text-slate-600">
                    {supplier.email || "—"}
                  </span>

                </td>

                {/* ==================================
                    GST
                ================================== */}

                <td className="px-5 py-4">

                  <span className="inline-flex rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold tracking-wide text-slate-600">
                    {supplier.gstNumber || "—"}
                  </span>

                </td>

                {/* ==================================
                    Address
                ================================== */}

                <td className="px-5 py-4">

                  <span className="block max-w-[230px] truncate text-sm text-slate-600">
                    {supplier.address || "—"}
                  </span>

                </td>

                {/* ==================================
                    Actions
                ================================== */}

                <td className="px-5 py-4">

                  <div className="flex items-center justify-center gap-2">

                    {/* Purchase History */}

                    <button
                      type="button"
                      onClick={() =>
                        onHistory(supplier)
                      }
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-xl
                        bg-emerald-50
                        text-emerald-600
                        transition
                        hover:bg-emerald-100
                        hover:text-emerald-700
                      "
                      title="Purchase History"
                    >
                      <History size={17} />
                    </button>

                    {/* Edit */}

                    <button
                      type="button"
                      onClick={() =>
                        onEdit(supplier)
                      }
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-xl
                        bg-blue-50
                        text-blue-600
                        transition
                        hover:bg-blue-100
                        hover:text-blue-700
                      "
                      title="Edit Supplier"
                    >
                      <Pencil size={17} />
                    </button>

                    {/* Delete */}

                    <button
                      type="button"
                      onClick={() =>
                        onDelete(supplier._id)
                      }
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-xl
                        bg-red-50
                        text-red-600
                        transition
                        hover:bg-red-100
                        hover:text-red-700
                      "
                      title="Delete Supplier"
                    >
                      <Trash2 size={17} />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default SupplierTable;