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
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex min-h-[300px] flex-col items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/40">
            <Users
              size={22}
              className="animate-pulse text-blue-600 dark:text-blue-400"
            />
          </div>

          <p className="mt-4 text-sm font-semibold text-slate-700 dark:text-slate-200">
            Loading users...
          </p>

          <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
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
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
          <Users
            size={25}
            className="text-slate-400 dark:text-slate-500"
          />
        </div>

        <h2 className="mt-4 text-lg font-bold text-slate-800 dark:text-slate-100">
          No Users Found
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          No users match your search.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

      {/* ==========================================
          TABLE HEADER
      ========================================== */}

      <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
        <div className="flex items-center justify-between">

          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
              System Users
            </h2>

            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              {users.length} user
              {users.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/40">
            <Users
              size={17}
              className="text-blue-600 dark:text-blue-400"
            />
          </div>

        </div>
      </div>

      {/* ==========================================
          TABLE
      ========================================== */}

      <div className="overflow-x-auto">

        <table className="w-full min-w-[900px]">

          {/* HEAD */}

          <thead className="bg-slate-50 dark:bg-slate-800/70">

            <tr>

              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Name
              </th>

              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Email
              </th>

              <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Role
              </th>

              <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Status
              </th>

              <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Created
              </th>

              <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Actions
              </th>

            </tr>

          </thead>

          {/* BODY */}

          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">

            {users.map((user) => (

              <tr
                key={user._id}
                className="group transition hover:bg-slate-50/80 dark:hover:bg-slate-800/50"
              >

                {/* NAME */}

                <td className="px-6 py-4">

                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                      {user.name
                        ?.charAt(0)
                        ?.toUpperCase() || "U"}
                    </div>

                    <div className="min-w-0">

                      <p className="truncate font-semibold text-slate-800 dark:text-slate-100">
                        {user.name || "-"}
                      </p>

                    </div>

                  </div>

                </td>

                {/* EMAIL */}

                <td className="px-6 py-4">

                  <p className="truncate text-sm text-slate-600 dark:text-slate-300">
                    {user.email || "-"}
                  </p>

                </td>

                {/* ROLE */}

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
                          ? "bg-purple-50 text-purple-700 ring-1 ring-purple-100 dark:bg-purple-950/40 dark:text-purple-300 dark:ring-purple-900"
                          : "bg-blue-50 text-blue-700 ring-1 ring-blue-100 dark:bg-blue-950/40 dark:text-blue-300 dark:ring-blue-900"
                      }
                    `}
                  >
                    {user.role}
                  </span>

                </td>

                {/* STATUS */}

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
                          ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 dark:ring-emerald-900"
                          : "bg-red-50 text-red-700 ring-1 ring-red-100 dark:bg-red-950/40 dark:text-red-300 dark:ring-red-900"
                      }
                    `}
                  >
                    {user.isActive
                      ? "Active"
                      : "Inactive"}
                  </span>

                </td>

                {/* CREATED */}

                <td className="px-6 py-4 text-center">

                  <span className="text-sm text-slate-600 dark:text-slate-300">
                    {user.createdAt
                      ? new Date(
                          user.createdAt
                        ).toLocaleDateString(
                          "en-IN"
                        )
                      : "-"}
                  </span>

                </td>

                {/* ACTIONS */}

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

                        dark:bg-blue-950/40
                        dark:text-blue-400
                        dark:hover:bg-blue-900/50
                        dark:hover:text-blue-300
                        dark:focus:ring-blue-950
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
                            ? "bg-red-50 text-red-600 hover:bg-red-100 focus:ring-red-100 dark:bg-red-950/40 dark:text-red-400 dark:hover:bg-red-900/50 dark:focus:ring-red-950"
                            : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 focus:ring-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-400 dark:hover:bg-emerald-900/50 dark:focus:ring-emerald-950"
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