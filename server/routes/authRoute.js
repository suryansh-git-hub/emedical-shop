import express from "express";
import { loginUser,getProfile,logoutUser } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { ROLES } from "../constants/roles.js";


const router = express.Router();

router.post("/login", loginUser);

// Only Admin can access
router.get(
  "/profile",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  getProfile
);

router.post("/logout",authMiddleware,logoutUser);

export default router;