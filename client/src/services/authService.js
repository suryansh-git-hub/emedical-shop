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

export const registerUser = async (data) => {
  const response = await api.post(
    "/auth/register",
    data
  );

  return response.data;
};

// ==========================
// Forgot Password
// ==========================
// Sends password reset link
// to the user's email.

export const forgotPassword = async (data) => {
  const response = await api.put(
    "/auth/forgot-password",
    data
  );

  return response.data;
};

// ==========================
// Reset Password
// ==========================
// Sets the new password using
// the token received in email.

export const resetPassword = async (
  token,
  data
) => {
  const response = await api.put(
    `/auth/reset-password/${token}`,
    data
  );

  return response.data;
};

// ==========================
// Logout
// ==========================

export const logoutUser = async () => {
  const response = await api.post(
    "/auth/logout"
  );

  return response.data;
};