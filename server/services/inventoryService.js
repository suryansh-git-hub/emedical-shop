import Inventory from "../models/inventoryModel.js";
import { MESSAGES } from "../constants/messages.js";

// ==========================
// Get All Inventory
// ==========================
export const getAllInventoryService = async () => {
  const inventory = await Inventory.find()
    .populate(
      "medicine",
      "medicineName genericName company category batchNumber expiryDate"
    )
    .sort({ createdAt: -1 })
    .lean();

  return {
    message: MESSAGES.INVENTORY_FETCHED,
    inventory,
  };
};

// ==========================
// Get Inventory By Medicine
// ==========================
export const getInventoryByMedicineService = async (medicineId) => {
  const inventory = await Inventory.findOne({
    medicine: medicineId,
  })
    .populate(
      "medicine",
      "medicineName genericName company category batchNumber expiryDate"
    )
    .lean();

  if (!inventory) {
    throw new Error(MESSAGES.INVENTORY_NOT_FOUND);
  }

  return {
    message: MESSAGES.INVENTORY_FETCHED,
    inventory,
  };
};