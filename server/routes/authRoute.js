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
import roleMiddleware from "../middleware/roleMiddleware.js";
import { ROLES } from "../constants/roles.js";

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
  roleMiddleware(ROLES.ADMIN),
  getProfile
);


// Logout
router.post(
  "/logout",
  authMiddleware,
  logoutUser
);

export default router;