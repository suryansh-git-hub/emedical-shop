import express from "express";
import { createMedicine,getAllMedicines, getMedicineById,updateMedicine,deleteMedicine} from "../controllers/medicineController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { ROLES } from "../constants/roles.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  createMedicine
);

router.get(
  "/",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN, ROLES.PHARMACIST),
  getAllMedicines
);

router.get(
  "/:id",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN, ROLES.PHARMACIST),
  getMedicineById
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  updateMedicine
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  deleteMedicine
);

export default router;