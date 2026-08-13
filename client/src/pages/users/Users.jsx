import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  ChevronLeft,
  ChevronRight,
  Loader,
} from "lucide-react";

import PageHeader from "../../components/common/PageHeader";

import UserSearch from "../../components/users/UserSearch";
import AddUserButton from "../../components/users/AddUserButton";
import UserTable from "../../components/users/UserTable";
import UserModal from "../../components/users/UserModal";
import UserForm from "../../components/users/UserForm";

import {
  getUsers,
  createUser,
  updateUser,
  changeUserStatus,
} from "../../services/userService";

function Users() {
  // ==========================================
  // USERS
  // ==========================================

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  // ==========================================
  // SEARCH
  // ==========================================

  const [search, setSearch] = useState("");

  const [debouncedSearch, setDebouncedSearch] =
    useState("");

  // ==========================================
  // PAGINATION
  // ==========================================

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [totalUsers, setTotalUsers] =
    useState(0);

  const limit = 10;

  // ==========================================
  // MODAL
  // ==========================================

  const [open, setOpen] = useState(false);

  const [editingUser, setEditingUser] =
    useState(null);

  // ==========================================
  // SEARCH DEBOUNCING
  // ==========================================

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());

      setPage(1);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  // ==========================================
  // FETCH USERS
  // ==========================================

  const fetchUsers = async (
    searchValue = debouncedSearch,
    pageValue = page
  ) => {
    try {
      setLoading(true);

      const response = await getUsers(
        searchValue,
        pageValue,
        limit
      );

      setUsers(response.users || []);

      setTotalUsers(
        Number(response.totalUsers) || 0
      );

      setTotalPages(
        Math.max(
          Number(response.totalPages) || 1,
          1
        )
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch users."
      );

      setUsers([]);
      setTotalUsers(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // FETCH WHEN SEARCH OR PAGE CHANGES
  // ==========================================

  useEffect(() => {
    fetchUsers(
      debouncedSearch,
      page
    );
  }, [debouncedSearch, page]);

  // ==========================================
  // ADD USER
  // ==========================================

  const handleAddUser = () => {
    setEditingUser(null);
    setOpen(true);
  };

  // ==========================================
  // CLOSE MODAL
  // ==========================================

  const handleCloseModal = () => {
    setOpen(false);
    setEditingUser(null);
  };

  // ==========================================
  // ADD / EDIT USER
  // ==========================================

  const handleSubmit = async (data) => {
    try {
      if (editingUser) {
        await updateUser(
          editingUser._id,
          data
        );

        toast.success(
          "User updated successfully."
        );
      } else {
        await createUser(data);

        toast.success(
          "User created successfully."
        );
      }

      await fetchUsers(
        debouncedSearch,
        page
      );

      setOpen(false);
      setEditingUser(null);

      return true;
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Operation failed."
      );

      return false;
    }
  };

  // ==========================================
  // EDIT USER
  // ==========================================

  const handleEdit = (user) => {
    setEditingUser(user);
    setOpen(true);
  };

  // ==========================================
  // ACTIVATE / DEACTIVATE USER
  // ==========================================

  const handleStatus = async (
    id,
    status
  ) => {
    try {
      await changeUserStatus(
        id,
        !status
      );

      toast.success(
        !status
          ? "User activated successfully."
          : "User deactivated successfully."
      );

      await fetchUsers(
        debouncedSearch,
        page
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Operation failed."
      );
    }
  };

  // ==========================================
  // PREVIOUS PAGE
  // ==========================================

  const handlePrevious = () => {
    if (page > 1 && !loading) {
      setPage(
        (previousPage) =>
          previousPage - 1
      );
    }
  };

  // ==========================================
  // NEXT PAGE
  // ==========================================

  const handleNext = () => {
    if (
      page < totalPages &&
      !loading
    ) {
      setPage(
        (previousPage) =>
          previousPage + 1
      );
    }
  };

  // ==========================================
  // SHOWING RANGE
  // ==========================================

  const firstUser =
    totalUsers === 0
      ? 0
      : (page - 1) * limit + 1;

  const lastUser = Math.min(
    page * limit,
    totalUsers
  );

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="min-h-full bg-[#f5f7fb] dark:bg-slate-950">

      <div className="mx-auto max-w-[1500px] space-y-6">

        {/* ==========================================
            PAGE HEADER
        ========================================== */}

        <PageHeader
          title="User Management"
          subtitle="Manage system users, roles and account access"
        />

        {/* ==========================================
            SEARCH + ADD USER
        ========================================== */}

        <div
          className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-4
            shadow-sm
            sm:p-5

            dark:border-slate-800
            dark:bg-slate-900
          "
        >

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            {/* SEARCH */}

            <div className="w-full lg:max-w-xl">
              <UserSearch
                search={search}
                setSearch={setSearch}
              />
            </div>

            {/* ADD USER */}

            <div className="w-full lg:w-auto">
              <AddUserButton
                onClick={handleAddUser}
              />
            </div>

          </div>

          {/* SEARCHING INDICATOR */}

          {search !== debouncedSearch && (
            <div className="mt-3 flex items-center gap-2 text-xs font-medium text-blue-600 dark:text-blue-400">

              <Loader
                size={13}
                className="animate-spin"
              />

              Searching...

            </div>
          )}

        </div>

        {/* ==========================================
            USER TABLE
        ========================================== */}

        <UserTable
          users={users}
          loading={loading}
          onEdit={handleEdit}
          onStatus={handleStatus}
        />

        {/* ==========================================
            PAGINATION
        ========================================== */}

        {totalUsers > 0 && (
          <div
            className="
              rounded-2xl
              border
              border-slate-200
              bg-white
              px-5
              py-4
              shadow-sm

              dark:border-slate-800
              dark:bg-slate-900
            "
          >

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              {/* SHOWING USERS */}

              <p className="text-sm text-slate-500 dark:text-slate-400">

                Showing{" "}

                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {firstUser}
                </span>

                {" "}to{" "}

                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {lastUser}
                </span>

                {" "}of{" "}

                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {totalUsers}
                </span>

                {" "}users

              </p>

              {/* PAGINATION CONTROLS */}

              <div className="flex items-center gap-2">

                {/* PREVIOUS */}

                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={
                    page === 1 ||
                    loading
                  }
                  className="
                    inline-flex
                    items-center
                    gap-1
                    rounded-xl
                    border
                    border-slate-200
                    px-3.5
                    py-2
                    text-sm
                    font-medium
                    text-slate-600
                    transition

                    hover:border-blue-200
                    hover:bg-blue-50
                    hover:text-blue-600

                    disabled:cursor-not-allowed
                    disabled:opacity-40

                    dark:border-slate-700
                    dark:text-slate-300
                    dark:hover:border-blue-800
                    dark:hover:bg-blue-950/40
                    dark:hover:text-blue-400
                  "
                >

                  <ChevronLeft size={16} />

                  Previous

                </button>

                {/* CURRENT PAGE */}

                <div
                  className="
                    flex
                    h-9
                    min-w-9
                    items-center
                    justify-center
                    rounded-xl
                    bg-blue-600
                    px-3
                    text-sm
                    font-bold
                    text-white
                  "
                >
                  {page}
                </div>

                {/* TOTAL PAGES */}

                <span className="text-sm text-slate-400 dark:text-slate-500">
                  of {totalPages}
                </span>

                {/* NEXT */}

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={
                    page >= totalPages ||
                    loading
                  }
                  className="
                    inline-flex
                    items-center
                    gap-1
                    rounded-xl
                    border
                    border-slate-200
                    px-3.5
                    py-2
                    text-sm
                    font-medium
                    text-slate-600
                    transition

                    hover:border-blue-200
                    hover:bg-blue-50
                    hover:text-blue-600

                    disabled:cursor-not-allowed
                    disabled:opacity-40

                    dark:border-slate-700
                    dark:text-slate-300
                    dark:hover:border-blue-800
                    dark:hover:bg-blue-950/40
                    dark:hover:text-blue-400
                  "
                >

                  Next

                  <ChevronRight size={16} />

                </button>

              </div>

            </div>

          </div>
        )}

        {/* ==========================================
            USER MODAL
        ========================================== */}

        <UserModal
          isOpen={open}
          onClose={handleCloseModal}
          title={
            editingUser
              ? "Edit User"
              : "Add User"
          }
        >

          <UserForm
            onSubmit={handleSubmit}
            defaultValues={editingUser}
          />

        </UserModal>

      </div>

    </div>
  );
}

export default Users;