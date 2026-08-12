import {
  Pencil,
  UserCheck,
  UserX,
  Users,
} from "lucide-react";

function UserTable({
  users,
  loading,
  onEdit,
  onStatus,
}) {
  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
    return (
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex min-h-[300px] flex-col items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
            <Users
              size={22}
              className="animate-pulse text-blue-600"
            />
          </div>

          <p className="mt-4 text-sm font-semibold text-slate-700">
            Loading users...
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Fetching system users.
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // Empty State
  // ==========================================

  if (!users || users.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
          <Users
            size={25}
            className="text-slate-400"
          />
        </div>

        <h2 className="mt-4 text-lg font-bold text-slate-800">
          No Users Found
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          No users match your search.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* ==========================================
          TABLE HEADER
      ========================================== */}

      <div className="border-b border-slate-200 px-5 py-4">
        <div className="flex items-center justify-between">

          <div>
            <h2 className="text-base font-bold text-slate-900">
              System Users
            </h2>

            <p className="mt-0.5 text-xs text-slate-500">
              {users.length} user
              {users.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50">
            <Users
              size={17}
              className="text-blue-600"
            />
          </div>

        </div>
      </div>

      {/* ==========================================
          TABLE
      ========================================== */}

      <div className="overflow-x-auto">

        <table className="min-w-[900px] w-full">

          {/* ==========================
              HEAD
          ========================== */}

          <thead className="bg-slate-50">

            <tr>

              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                Name
              </th>

              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                Email
              </th>

              <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wide text-slate-500">
                Role
              </th>

              <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wide text-slate-500">
                Status
              </th>

              <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wide text-slate-500">
                Created
              </th>

              <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wide text-slate-500">
                Actions
              </th>

            </tr>

          </thead>

          {/* ==========================
              BODY
          ========================== */}

          <tbody className="divide-y divide-slate-200">

            {users.map((user) => (

              <tr
                key={user._id}
                className="group transition hover:bg-slate-50/80"
              >

                {/* ==========================
                    NAME
                ========================== */}

                <td className="px-6 py-4">

                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-blue-600">
                      {user.name
                        ?.charAt(0)
                        ?.toUpperCase() || "U"}
                    </div>

                    <div className="min-w-0">

                      <p className="truncate font-semibold text-slate-800">
                        {user.name || "-"}
                      </p>

                    </div>

                  </div>

                </td>

                {/* ==========================
                    EMAIL
                ========================== */}

                <td className="px-6 py-4">

                  <p className="truncate text-sm text-slate-600">
                    {user.email || "-"}
                  </p>

                </td>

                {/* ==========================
                    ROLE
                ========================== */}

                <td className="px-6 py-4 text-center">

                  <span
                    className={`
                      inline-flex
                      rounded-full
                      px-3
                      py-1.5
                      text-xs
                      font-semibold
                      capitalize
                      ${
                        user.role === "admin"
                          ? "bg-purple-50 text-purple-700 ring-1 ring-purple-100"
                          : "bg-blue-50 text-blue-700 ring-1 ring-blue-100"
                      }
                    `}
                  >
                    {user.role}
                  </span>

                </td>

                {/* ==========================
                    STATUS
                ========================== */}

                <td className="px-6 py-4 text-center">

                  <span
                    className={`
                      inline-flex
                      rounded-full
                      px-3
                      py-1.5
                      text-xs
                      font-semibold
                      ${
                        user.isActive
                          ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
                          : "bg-red-50 text-red-700 ring-1 ring-red-100"
                      }
                    `}
                  >
                    {user.isActive
                      ? "Active"
                      : "Inactive"}
                  </span>

                </td>

                {/* ==========================
                    CREATED
                ========================== */}

                <td className="px-6 py-4 text-center">

                  <span className="text-sm text-slate-600">
                    {user.createdAt
                      ? new Date(
                          user.createdAt
                        ).toLocaleDateString(
                          "en-IN"
                        )
                      : "-"}
                  </span>

                </td>

                {/* ==========================
                    ACTIONS
                ========================== */}

                <td className="px-6 py-4">

                  <div className="flex items-center justify-center gap-2">

                    {/* Edit */}

                    <button
                      type="button"
                      onClick={() =>
                        onEdit(user)
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
                        focus:outline-none
                        focus:ring-4
                        focus:ring-blue-100
                      "
                      title="Edit User"
                    >
                      <Pencil size={16} />
                    </button>

                    {/* Activate / Deactivate */}

                    <button
                      type="button"
                      onClick={() =>
                        onStatus(
                          user._id,
                          user.isActive
                        )
                      }
                      className={`
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-xl
                        transition
                        focus:outline-none
                        focus:ring-4
                        ${
                          user.isActive
                            ? "bg-red-50 text-red-600 hover:bg-red-100 focus:ring-red-100"
                            : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 focus:ring-emerald-100"
                        }
                      `}
                      title={
                        user.isActive
                          ? "Deactivate User"
                          : "Activate User"
                      }
                    >
                      {user.isActive ? (
                        <UserX size={16} />
                      ) : (
                        <UserCheck size={16} />
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