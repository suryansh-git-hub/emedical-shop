import api from "./axios";

// ==========================
// Get All Users
// ==========================

export const getUsers = async (search = "") => {
  const response = await api.get("/users", {
    params: { search },
  });

  return response.data;
};

// ==========================
// Get User By ID
// ==========================

export const getUserById = async (id) => {
  const response = await api.get(`/users/${id}`);

  return response.data;
};

// ==========================
// Create User
// ==========================

export const createUser = async (data) => {
  const response = await api.post("/users", data);

  return response.data;
};

// ==========================
// Update User
// ==========================

export const updateUser = async (id, data) => {
  const response = await api.put(
    `/users/${id}`,
    data
  );

  return response.data;
};

// ==========================
// Activate / Deactivate User
// ==========================

export const changeUserStatus = async (
  id,
  isActive
) => {
  const response = await api.patch(
    `/users/${id}/status`,
    { isActive }
  );

  return response.data;
};