import express from "express";

import {
  createSale,
  getAllSales,
  getSaleById,
} from "../controllers/saleController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { ROLES } from "../constants/roles.js";

const router = express.Router();

// ==========================
// Create Sale
// ==========================
router.post(
  "/",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN, ROLES.PHARMACIST),
  createSale
);

// ==========================
// Get All Sales
// ==========================
router.get(
  "/",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN, ROLES.PHARMACIST),
  getAllSales
);

// ==========================
// Get Sale By ID
// ==========================
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN, ROLES.PHARMACIST),
  getSaleById
);

export default router;