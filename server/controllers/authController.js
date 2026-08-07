import {
  loginUserService,
  registerUserService,forgotPasswordService
} from "../services/authService.js";

// =======================================
// Register
// =======================================

export const registerUser = async (req, res) => {
  try {
    const result = await registerUserService(req.body);

    res.status(201).json({
      success: true,
      message: result.message,
      user: result.user,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================
// Login
// =======================================

export const loginUser = async (req, res) => {
  try {
    const result = await loginUserService(req.body);

    res.status(200).json({
      success: true,
      message: result.message,
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================
// Profile
// =======================================

export const getProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

// =======================================
// Logout
// =======================================

export const logoutUser = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logout successful.",
  });
};

// =======================================
// Forgot Password
// =======================================

export const forgotPassword = async (
  req,
  res
) => {
  try {
    const result =
      await forgotPasswordService(req.body);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};