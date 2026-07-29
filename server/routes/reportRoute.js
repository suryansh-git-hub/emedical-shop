import express from "express";

import {
  getSalesReport,
  getPurchaseReport,
  getInventoryReport,
  getLowStockReport,
  getExpiredMedicinesReport,getTodaySalesReport,getWeeklySalesReport,getMonthlySalesReport,getProfitReport,getBestSellingMedicinesReport,
} from "../controllers/reportController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { ROLES } from "../constants/roles.js";

const router = express.Router();

// ==========================
// Sales Report
// ==========================
router.get(
  "/sales",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN, ROLES.PHARMACIST),
  getSalesReport
);

// ==========================
// Purchase Report
// ==========================
router.get(
  "/purchases",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN, ROLES.PHARMACIST),
  getPurchaseReport
);

// ==========================
// Inventory Report
// ==========================
router.get(
  "/inventory",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN, ROLES.PHARMACIST),
  getInventoryReport
);

// ==========================
// Low Stock Report
// ==========================
router.get(
  "/low-stock",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN, ROLES.PHARMACIST),
  getLowStockReport
);

// ==========================
// Expired Medicines Report
// ==========================
router.get(
  "/expired-medicines",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN, ROLES.PHARMACIST),
  getExpiredMedicinesReport
);

router.get(
  "/sales/today",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN, ROLES.PHARMACIST),
  getTodaySalesReport
);

router.get(
  "/sales/weekly",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN, ROLES.PHARMACIST),
  getWeeklySalesReport
);

router.get(
  "/sales/monthly",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN, ROLES.PHARMACIST),
  getMonthlySalesReport
);

router.get(
  "/profit",
  authMiddleware,
  roleMiddleware(
    ROLES.ADMIN,
    ROLES.PHARMACIST
  ),
  getProfitReport
);

router.get(
  "/best-selling",
  authMiddleware,
  roleMiddleware(
    ROLES.ADMIN,
    ROLES.PHARMACIST
  ),
  getBestSellingMedicinesReport
);

export default router;