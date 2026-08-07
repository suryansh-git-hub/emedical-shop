import { Pencil, UserCheck, UserX } from "lucide-react";

function UserTable({
  users,
  loading,
  onEdit,
  onStatus,
}) {
  if (loading) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center shadow-sm">
        Loading users...
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-10 text-center shadow-sm">
        <h2 className="text-xl font-semibold text-gray-700">
          No Users Found
        </h2>

        <p className="mt-2 text-gray-500">
          No users match your search.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Name
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Email
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Role
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Status
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Created
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-t hover:bg-gray-50"
              >
                {/* Name */}

                <td className="px-6 py-4 font-medium">
                  {user.name}
                </td>

                {/* Email */}

                <td className="px-6 py-4">
                  {user.email}
                </td>

                {/* Role */}

                <td className="px-6 py-4 text-center">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      user.role === "admin"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                {/* Status */}

                <td className="px-6 py-4 text-center">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      user.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.isActive
                      ? "Active"
                      : "Inactive"}
                  </span>
                </td>

                {/* Created */}

                <td className="px-6 py-4 text-center">
                  {new Date(
                    user.createdAt
                  ).toLocaleDateString("en-IN")}
                </td>

                {/* Actions */}

                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-3">
                    {/* Edit */}

                    <button
                      onClick={() =>
                        onEdit(user)
                      }
                      className="rounded-lg bg-blue-100 p-2 text-blue-600 transition hover:bg-blue-200"
                      title="Edit User"
                    >
                      <Pencil size={18} />
                    </button>

                    {/* Activate / Deactivate */}

                    <button
                      onClick={() =>
                        onStatus(
                          user._id,
                          user.isActive
                        )
                      }
                      className={`rounded-lg p-2 transition ${
                        user.isActive
                          ? "bg-red-100 text-red-600 hover:bg-red-200"
                          : "bg-green-100 text-green-600 hover:bg-green-200"
                      }`}
                      title={
                        user.isActive
                          ? "Deactivate User"
                          : "Activate User"
                      }
                    >
                      {user.isActive ? (
                        <UserX size={18} />
                      ) : (
                        <UserCheck size={18} />
                      )}
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
}

export default UserTable;