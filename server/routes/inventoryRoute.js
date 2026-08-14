import express from "express";

import {
  getAllInventory,
  getInventoryByMedicine,
  getLowStockMedicines,
  getOutOfStockMedicines,
  getNearExpiryMedicines,
  getExpiredMedicines,
  getStockMovementHistory,
  updateInventoryStock,
} from "../controllers/inventoryController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { ROLES } from "../constants/roles.js";

const router = express.Router();

// =======================================
// All Inventory
// =======================================

router.get(
  "/",
  authMiddleware,
  roleMiddleware(
    ROLES.ADMIN,
    ROLES.PHARMACIST
  ),
  getAllInventory
);

// =======================================
// Low Stock
// =======================================

router.get(
  "/low-stock",
  authMiddleware,
  roleMiddleware(
    ROLES.ADMIN,
    ROLES.PHARMACIST
  ),
  getLowStockMedicines
);

// =======================================
// Out Of Stock
// =======================================

router.get(
  "/out-of-stock",
  authMiddleware,
  roleMiddleware(
    ROLES.ADMIN,
    ROLES.PHARMACIST
  ),
  getOutOfStockMedicines
);

// =======================================
// Near Expiry
// =======================================

router.get(
  "/near-expiry",
  authMiddleware,
  roleMiddleware(
    ROLES.ADMIN,
    ROLES.PHARMACIST
  ),
  getNearExpiryMedicines
);

// =======================================
// Expired
// =======================================

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
// Stock History
// =======================================

router.get(
  "/stock-history/:medicineId",
  authMiddleware,
  roleMiddleware(
    ROLES.ADMIN,
    ROLES.PHARMACIST
  ),
  getStockMovementHistory
);

// =======================================
// Add / Remove Stock
// =======================================

router.patch(
  "/:medicineId/stock",
  authMiddleware,
  roleMiddleware(
    ROLES.ADMIN,
    ROLES.PHARMACIST
  ),
  updateInventoryStock
);

// =======================================
// Inventory By Medicine
// =======================================

router.get(
  "/:medicineId",
  authMiddleware,
  roleMiddleware(
    ROLES.ADMIN,
    ROLES.PHARMACIST
  ),
  getInventoryByMedicine
);

export default router;