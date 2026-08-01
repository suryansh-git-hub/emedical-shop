import Inventory from "../models/inventoryModel.js";
import Purchase from "../models/purchaseModel.js";
import Sale from "../models/saleModel.js";
import { MESSAGES } from "../constants/messages.js";

// =======================================
// Get All Inventory
// =======================================
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

// =======================================
// Get Inventory By Medicine
// =======================================
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
    const error = new Error(MESSAGES.INVENTORY_NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }

  return {
    message: MESSAGES.INVENTORY_FETCHED,
    inventory,
  };
};

// =======================================
// Get Low Stock Medicines
// =======================================
export const getLowStockMedicinesService = async () => {
  const inventory = await Inventory.find({
    currentStock: {
      $gt: 0,
      $lte: 10,
    },
  })
    .populate(
      "medicine",
      "medicineName genericName company category currentStock"
    )
    .lean();

  return {
    message: MESSAGES.LOW_STOCK_MEDICINES_FETCHED,
    inventory,
  };
};

// =======================================
// Get Out Of Stock Medicines
// =======================================
export const getOutOfStockMedicinesService = async () => {
  const inventory = await Inventory.find({
    currentStock: 0,
  })
    .populate(
      "medicine",
      "medicineName genericName company category"
    )
    .lean();

  return {
    message: MESSAGES.OUT_OF_STOCK_MEDICINES_FETCHED,
    inventory,
  };
};

// =======================================
// Get Near Expiry Medicines
// =======================================
export const getNearExpiryMedicinesService = async () => {
  const today = new Date();

  const next30Days = new Date();
  next30Days.setDate(today.getDate() + 30);

  const inventory = await Inventory.find()
    .populate({
      path: "medicine",
      match: {
        expiryDate: {
          $gte: today,
          $lte: next30Days,
        },
      },
      select:
        "medicineName genericName company category expiryDate",
    })
    .lean();

  const nearExpiry = inventory.filter((item) => item.medicine);

  return {
    message: MESSAGES.NEAR_EXPIRY_MEDICINES_FETCHED,
    inventory: nearExpiry,
  };
};

// =======================================
// Stock Movement History
// =======================================
export const getStockMovementHistoryService = async (medicineId) => {
  const purchases = await Purchase.find({
    "medicines.medicine": medicineId,
  }).lean();

  const sales = await Sale.find({
    "medicines.medicine": medicineId,
  }).lean();

  const purchaseHistory = purchases.flatMap((purchase) =>
    purchase.medicines
      .filter((item) => item.medicine.toString() === medicineId)
      .map((item) => ({
        date: purchase.purchaseDate,
        type: "PURCHASE",
        quantity: item.quantity,
        invoiceNumber: purchase.invoiceNumber,
      }))
  );

  const saleHistory = sales.flatMap((sale) =>
    sale.medicines
      .filter((item) => item.medicine.toString() === medicineId)
      .map((item) => ({
        date: sale.saleDate,
        type: "SALE",
        quantity: item.quantity,
        invoiceNumber: sale.invoiceNumber,
      }))
  );

  const history = [...purchaseHistory, ...saleHistory].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return {
    message: MESSAGES.STOCK_HISTORY_FETCHED,
    history,
  };
};

// =======================================
// Get Expired Medicines
// =======================================
export const getExpiredMedicinesService = async () => {
  const today = new Date();

  const inventory = await Inventory.find()
    .populate({
      path: "medicine",
      match: {
        expiryDate: {
          $lt: today,
        },
      },
      select:
        "medicineName genericName company category expiryDate",
    })
    .lean();

  const expired = inventory.filter(
    (item) => item.medicine
  );

  return {
    message: "Expired medicines fetched successfully.",
    inventory: expired,
  };
};