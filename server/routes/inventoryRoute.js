import express from "express";

import {
  getAllInventory,
  getInventoryByMedicine,
} from "../controllers/inventoryController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { ROLES } from "../constants/roles.js";

const router = express.Router();

// ==========================
// Get All Inventory
// ==========================
router.get(
  "/",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN, ROLES.PHARMACIST),
  getAllInventory
);

// ==========================
// Get Inventory By Medicine
// ==========================
router.get(
  "/:medicineId",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN, ROLES.PHARMACIST),
  getInventoryByMedicine
);

export default router;