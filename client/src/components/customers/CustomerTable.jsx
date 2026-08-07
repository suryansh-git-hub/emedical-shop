import { Pencil, Trash2, History } from "lucide-react";

const CustomerTable = ({
  customers,
  onEdit,
  onDelete,
  onHistory,
}) => {
  if (customers.length === 0) {
    return (
      <div className="rounded-xl bg-white p-10 text-center shadow">
        <h2 className="text-xl font-semibold text-gray-700">
          No Customers Found
        </h2>

        <p className="mt-2 text-gray-500">
          Add your first customer to get started.
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
                Customer Name
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Contact Number
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                Reward Points
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Email
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
            {customers.map((customer) => (
              <tr
                key={customer._id}
                className="border-t hover:bg-gray-50"
              >
                {/* Customer Name */}
                <td className="px-6 py-4 font-medium">
                  {customer.customerName}
                </td>

                {/* Contact */}
                <td className="px-6 py-4">
                  {customer.contactNumber}
                </td>

                {/* Reward Points */}
                <td className="px-6 py-4 text-center">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                      (customer.rewardPoints || 0) > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    ⭐ {customer.rewardPoints || 0}
                  </span>
                </td>

                {/* Email */}
                <td className="px-6 py-4">
                  {customer.email}
                </td>

                {/* Address */}
                <td className="max-w-xs break-words px-6 py-4">
                  {customer.address}
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => onHistory(customer)}
                      className="rounded-lg bg-green-100 p-2 text-green-600 transition hover:bg-green-200"
                      title="Purchase History"
                    >
                      <History size={18} />
                    </button>

                    <button
                      onClick={() => onEdit(customer)}
                      className="rounded-lg bg-blue-100 p-2 text-blue-600 transition hover:bg-blue-200"
                      title="Edit Customer"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => onDelete(customer._id)}
                      className="rounded-lg bg-red-100 p-2 text-red-600 transition hover:bg-red-200"
                      title="Delete Customer"
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

export default CustomerTable;