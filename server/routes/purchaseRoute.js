import express from "express";

import {
  createPurchase,
  getAllPurchases,
  getPurchaseById,
} from "../controllers/purchaseController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { ROLES } from "../constants/roles.js";

const router = express.Router();

// ==========================
// Create Purchase
// ==========================

router.post(
  "/",
  authMiddleware,
  roleMiddleware(
    ROLES.ADMIN,
    ROLES.PHARMACIST
  ),
  createPurchase
);

// ==========================
// Get All Purchases
// ==========================

router.get(
  "/",
  authMiddleware,
  roleMiddleware(
    ROLES.ADMIN,
    ROLES.PHARMACIST
  ),
  getAllPurchases
);

// ==========================
// Get Purchase By ID
// ==========================

router.get(
  "/:id",
  authMiddleware,
  roleMiddleware(
    ROLES.ADMIN,
    ROLES.PHARMACIST
  ),
  getPurchaseById
);

export default router;