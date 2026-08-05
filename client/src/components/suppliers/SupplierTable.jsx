import { Pencil, Trash2,History } from "lucide-react";

const SupplierTable = ({
  suppliers,
  onEdit,
  onDelete,onHistory
}) => {
  if (suppliers.length === 0) {
    return (
      <div className="rounded-xl bg-white p-10 text-center shadow">
        <h2 className="text-xl font-semibold text-gray-700">
          No Suppliers Found
        </h2>

        <p className="mt-2 text-gray-500">
          Add your first supplier to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Supplier Name
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Contact Number
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Email
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                GST Number
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Address
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {suppliers.map((supplier) => (

              <tr
                key={supplier._id}
                className="border-t hover:bg-gray-50"
              >

                <td className="px-6 py-4 font-medium">
                  {supplier.supplierName}
                </td>

                <td className="px-6 py-4">
                  {supplier.contactNumber}
                </td>

                <td className="px-6 py-4">
                  {supplier.email}
                </td>

                <td className="px-6 py-4">
                  {supplier.gstNumber}
                </td>

                <td className="px-6 py-4 max-w-xs break-words">
                  {supplier.address}
                </td>

               <td className="px-6 py-4">
  <div className="flex items-center justify-center gap-3">

    <button
      onClick={() => onHistory(supplier)}
      className="rounded-lg bg-green-100 p-2 text-green-600 transition hover:bg-green-200"
      title="Purchase History"
    >
      <History size={18} />
    </button>

    <button
      onClick={() => onEdit(supplier)}
      className="rounded-lg bg-blue-100 p-2 text-blue-600 transition hover:bg-blue-200"
      title="Edit Supplier"
    >
      <Pencil size={18} />
    </button>

    <button
      onClick={() => onDelete(supplier._id)}
      className="rounded-lg bg-red-100 p-2 text-red-600 transition hover:bg-red-200"
      title="Delete Supplier"
    >
      <Trash2 size={18} />
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