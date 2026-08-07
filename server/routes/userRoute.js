import express from "express";

import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  changeUserStatus,
} from "../controllers/userController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { ROLES } from "../constants/roles.js";

const router = express.Router();

// =======================================
// Create User
// =======================================

router.post(
  "/",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  createUser
);

// =======================================
// Get All Users
// Supports:
// GET /users
// GET /users?search=rahul
// =======================================

router.get(
  "/",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  getAllUsers
);

// =======================================
// Get User By ID
// =======================================

router.get(
  "/:id",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  getUserById
);

// =======================================
// Update User
// =======================================

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  updateUser
);

// =======================================
// Activate / Deactivate User
// =======================================

router.patch(
  "/:id/status",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  changeUserStatus
);

export default router;