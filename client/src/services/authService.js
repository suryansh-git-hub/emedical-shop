import api from "./axios";

// ==========================
// Login
// ==========================

export const loginUser = async (data) => {
  const response = await api.post(
    "/auth/login",
    data
  );

  return response.data;
};

// ==========================
// Register
// ==========================

export const registerUser = async (
  data
) => {
  const response = await api.post(
    "/auth/register",
    data
  );

  return response.data;
};

// ==========================
// Forgot Password
// ==========================

export const forgotPassword =
  async (data) => {
    const response = await api.put(
      "/auth/forgot-password",
      data
    );

    return response.data;
  };

// ==========================
// Logout
// ==========================

export const logoutUser =
  async () => {
    const response = await api.post(
      "/auth/logout"
    );

    return response.data;
  };