import express from "express";
import {
  createMedicine,
  getAllMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
} from "../controllers/medicineController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { ROLES } from "../constants/roles.js";
import { upload } from "../middleware/upload.js"; // ✅ Import Multer

const router = express.Router();

// Create Medicine
router.post(
  "/",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  upload.single("medicineImage"), // ✅ Upload one image
  createMedicine
);

// Get All Medicines
router.get(
  "/",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN, ROLES.PHARMACIST),
  getAllMedicines
);

// Get Medicine By ID
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN, ROLES.PHARMACIST),
  getMedicineById
);

// Update Medicine
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  upload.single("medicineImage"),
  updateMedicine
);

// Delete Medicine
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  deleteMedicine
);

export default router;