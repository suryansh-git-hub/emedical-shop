import {
  getAllInventoryService,
  getInventoryByMedicineService,
  getLowStockMedicinesService,
  getOutOfStockMedicinesService,
  getNearExpiryMedicinesService,
  getStockMovementHistoryService,
  getExpiredMedicinesService
} from "../services/inventoryService.js";

// =======================================
// Get All Inventory
// =======================================
export const getAllInventory = async (req, res) => {
  try {
    const result = await getAllInventoryService();

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================
// Get Inventory By Medicine
// =======================================
export const getInventoryByMedicine = async (req, res) => {
  try {
    const { medicineId } = req.params;

    const result = await getInventoryByMedicineService(medicineId);

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    res.status(error.statusCode || 404).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================
// Get Low Stock Medicines
// =======================================
export const getLowStockMedicines = async (req, res) => {
  try {
    const result = await getLowStockMedicinesService();

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================
// Get Out Of Stock Medicines
// =======================================
export const getOutOfStockMedicines = async (req, res) => {
  try {
    const result = await getOutOfStockMedicinesService();

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================
// Get Near Expiry Medicines
// =======================================
export const getNearExpiryMedicines = async (req, res) => {
  try {
    const result = await getNearExpiryMedicinesService();

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================
// Get Stock Movement History
// =======================================
export const getStockMovementHistory = async (req, res) => {
  try {
    const { medicineId } = req.params;

    const result = await getStockMovementHistoryService(medicineId);

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getExpiredMedicines = async (
  req,
  res
) => {
  try {
    const result =
      await getExpiredMedicinesService();

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};