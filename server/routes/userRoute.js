import express from "express";
import { createUser,  getAllUsers, getUserById,updateUser,
 } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { ROLES } from "../constants/roles.js";

const router = express.Router();

router.post("/", authMiddleware, roleMiddleware(ROLES.ADMIN), createUser);

router.get("/", authMiddleware, roleMiddleware(ROLES.ADMIN), getAllUsers);

router.get("/:id", authMiddleware, roleMiddleware(ROLES.ADMIN), getUserById);

 router.put("/:id", authMiddleware, roleMiddleware(ROLES.ADMIN), updateUser);

// router.patch("/:id/status", authMiddleware, roleMiddleware(ROLES.ADMIN), changeUserStatus);

export default router;