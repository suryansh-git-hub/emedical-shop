import express from "express";

import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getProfile,
  logoutUser,
} from "../controllers/authController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// =======================================
// Public Routes
// =======================================

// Register
router.post(
  "/register",
  registerUser
);


// Login
router.post(
  "/login",
  loginUser
);


// Forgot Password
router.put(
  "/forgot-password",
  forgotPassword
);


// Reset Password
router.put(
  "/reset-password/:token",
  resetPassword
);


// =======================================
// Protected Routes
// =======================================

// Profile
router.get(
  "/profile",
  authMiddleware,
  getProfile
);


// Logout
router.post(
  "/logout",
  authMiddleware,
  logoutUser
);

export default router;