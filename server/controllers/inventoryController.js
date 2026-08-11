import {
  getAllInventoryService,
  getInventoryByMedicineService,
  getLowStockMedicinesService,
  getOutOfStockMedicinesService,
  getNearExpiryMedicinesService,
  getStockMovementHistoryService,
  getExpiredMedicinesService,
} from "../services/inventoryService.js";

// =======================================
// Get All Inventory
// =======================================

export const getAllInventory = async (
  req,
  res
) => {
  try {
    const {
      search = "",
      page = 1,
      limit = 10,
    } = req.query;

    const result =
      await getAllInventoryService({
        search,
        page,
        limit,
      });

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    res.status(
      error.statusCode || 500
    ).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================
// Get Inventory By Medicine
// =======================================

export const getInventoryByMedicine =
  async (req, res) => {
    try {
      const { medicineId } =
        req.params;

      const result =
        await getInventoryByMedicineService(
          medicineId
        );

      res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error) {
      res.status(
        error.statusCode || 404
      ).json({
        success: false,
        message: error.message,
      });
    }
  };

// =======================================
// Get Low Stock
// =======================================

export const getLowStockMedicines =
  async (req, res) => {
    try {
      const {
        search = "",
        page = 1,
        limit = 10,
      } = req.query;

      const result =
        await getLowStockMedicinesService({
          search,
          page,
          limit,
        });

      res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error) {
      res.status(
        error.statusCode || 500
      ).json({
        success: false,
        message: error.message,
      });
    }
  };

// =======================================
// Get Out Of Stock
// =======================================

export const getOutOfStockMedicines =
  async (req, res) => {
    try {
      const {
        search = "",
        page = 1,
        limit = 10,
      } = req.query;

      const result =
        await getOutOfStockMedicinesService({
          search,
          page,
          limit,
        });

      res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error) {
      res.status(
        error.statusCode || 500
      ).json({
        success: false,
        message: error.message,
      });
    }
  };

// =======================================
// Get Near Expiry
// =======================================

export const getNearExpiryMedicines =
  async (req, res) => {
    try {
      const {
        search = "",
        page = 1,
        limit = 10,
      } = req.query;

      const result =
        await getNearExpiryMedicinesService({
          search,
          page,
          limit,
        });

      res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error) {
      res.status(
        error.statusCode || 500
      ).json({
        success: false,
        message: error.message,
      });
    }
  };

// =======================================
// Get Expired
// =======================================

export const getExpiredMedicines =
  async (req, res) => {
    try {
      const {
        search = "",
        page = 1,
        limit = 10,
      } = req.query;

      const result =
        await getExpiredMedicinesService({
          search,
          page,
          limit,
        });

      res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error) {
      res.status(
        error.statusCode || 500
      ).json({
        success: false,
        message: error.message,
      });
    }
  };

// =======================================
// Stock Movement History
// =======================================

export const getStockMovementHistory =
  async (req, res) => {
    try {
      const { medicineId } =
        req.params;

      const result =
        await getStockMovementHistoryService(
          medicineId
        );

      res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error) {
      res.status(
        error.statusCode || 500
      ).json({
        success: false,
        message: error.message,
      });
    }
  };