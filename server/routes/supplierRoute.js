import express from "express";

import {
  createSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
  getSupplierPurchaseHistory,
} from "../controllers/supplierController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { ROLES } from "../constants/roles.js";

const router = express.Router();

// ==========================
// Create Supplier
// ==========================
router.post(
  "/",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  createSupplier
);

// ==========================
// Get All Suppliers
// Search + Pagination handled
// through req.query
// ==========================
router.get(
  "/",
  authMiddleware,
  roleMiddleware(
    ROLES.ADMIN,
    ROLES.PHARMACIST
  ),
  getAllSuppliers
);

// ==========================
// Supplier Purchase History
// ==========================
router.get(
  "/:id/history",
  authMiddleware,
  roleMiddleware(
    ROLES.ADMIN,
    ROLES.PHARMACIST
  ),
  getSupplierPurchaseHistory
);

// ==========================
// Get Supplier By ID
// ==========================
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware(
    ROLES.ADMIN,
    ROLES.PHARMACIST
  ),
  getSupplierById
);

// ==========================
// Update Supplier
// ==========================
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  updateSupplier
);

// ==========================
// Delete Supplier
// ==========================
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  deleteSupplier
);

export default router;