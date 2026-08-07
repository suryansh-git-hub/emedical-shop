import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);

  const [editingUser, setEditingUser] =
    useState(null);

  // ==========================
  // Fetch Users
  // ==========================

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await getUsers(search);

      setUsers(response.users);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch users."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search]);

  // ==========================
  // Add / Edit
  // ==========================

 const handleSubmit = async (data) => {
  try {
    if (editingUser) {
      await updateUser(editingUser._id, data);
      toast.success("User updated successfully.");
    } else {
      await createUser(data);
      toast.success("User created successfully.");
    }

    fetchUsers();

    setOpen(false);
    setEditingUser(null);

    return true; // <-- Add this
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "Operation failed."
    );

    return false; // <-- Add this
  }
};

  // ==========================
  // Edit
  // ==========================

  const handleEdit = (user) => {
    setEditingUser(user);

    setOpen(true);
  };

  // ==========================
  // Activate / Deactivate
  // ==========================

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
          ? "User Activated"
          : "User Deactivated"
      );

      fetchUsers();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Operation failed."
      );
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="User Management"
        subtitle="Manage all system users"
      />

      <div className="flex items-center justify-between">
        <UserSearch
          search={search}
          setSearch={setSearch}
        />

        <AddUserButton
          onClick={() => {
            setEditingUser(null);
            setOpen(true);
          }}
        />
      </div>

      <UserTable
        users={users}
        loading={loading}
        onEdit={handleEdit}
        onStatus={handleStatus}
      />

      <UserModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          setEditingUser(null);
        }}
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
  );
}

export default Users;