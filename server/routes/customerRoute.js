import express from "express";
import {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,getCustomerPurchaseHistory
} from "../controllers/customerController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { ROLES } from "../constants/roles.js";

const router = express.Router();

// Create Customer
router.post(
  "/",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN, ROLES.PHARMACIST),
  createCustomer
);

// Get All Customers
router.get(
  "/",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN, ROLES.PHARMACIST),
  getAllCustomers
);

// Customer Purchase History
router.get(
  "/:id/history",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN, ROLES.PHARMACIST),
  getCustomerPurchaseHistory
);

// Get Customer By ID
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN, ROLES.PHARMACIST),
  getCustomerById
);

// Update Customer
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN, ROLES.PHARMACIST),
  updateCustomer
);

// Delete Customer
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  deleteCustomer
);

export default router;