import express from "express";

import {
  getAllInventory,
  getInventoryByMedicine,
  getLowStockMedicines,
  getOutOfStockMedicines,
  getNearExpiryMedicines,getExpiredMedicines,
  getStockMovementHistory,
} from "../controllers/inventoryController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { ROLES } from "../constants/roles.js";

const router = express.Router();

// =======================================
// Get All Inventory
// =======================================
router.get(
  "/",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN, ROLES.PHARMACIST),
  getAllInventory
);

// =======================================
// Get Low Stock Medicines
// =======================================
router.get(
  "/low-stock",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN, ROLES.PHARMACIST),
  getLowStockMedicines
);

// =======================================
// Get Out Of Stock Medicines
// =======================================
router.get(
  "/out-of-stock",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN, ROLES.PHARMACIST),
  getOutOfStockMedicines
);

// =======================================
// Get Near Expiry Medicines
// =======================================
router.get(
  "/near-expiry",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN, ROLES.PHARMACIST),
  getNearExpiryMedicines
);

router.get(
  "/expired",
  authMiddleware,
  roleMiddleware(
    ROLES.ADMIN,
    ROLES.PHARMACIST
  ),
  getExpiredMedicines
);

// =======================================
// Stock Movement History
// =======================================
router.get(
  "/stock-history/:medicineId",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN, ROLES.PHARMACIST),
  getStockMovementHistory
);

// =======================================
// Get Inventory By Medicine
// =======================================
router.get(
  "/:medicineId",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN, ROLES.PHARMACIST),
  getInventoryByMedicine
);

export default router;