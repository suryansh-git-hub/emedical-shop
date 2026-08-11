import Inventory from "../models/inventoryModel.js";
import Medicine from "../models/medicineModel.js";
import Purchase from "../models/purchaseModel.js";
import Sale from "../models/saleModel.js";

import { MESSAGES } from "../constants/messages.js";

// =======================================
// Common Inventory Query
// =======================================

const getInventoryWithPagination = async ({
  search = "",
  page = 1,
  limit = 10,
  filter = "all",
}) => {
  page = Math.max(Number(page) || 1, 1);
  limit = Math.max(Number(limit) || 10, 1);

  const skip = (page - 1) * limit;

  // =======================================
  // Medicine Search
  // =======================================

  let medicineIds = null;

  if (search.trim()) {
    const searchRegex = new RegExp(
      search.trim(),
      "i"
    );

    const medicines = await Medicine.find({
      $or: [
        {
          medicineName: searchRegex,
        },
        {
          genericName: searchRegex,
        },
        {
          company: searchRegex,
        },
        {
          category: searchRegex,
        },
        {
          batchNumber: searchRegex,
        },
      ],
    }).select("_id");

    medicineIds = medicines.map(
      (medicine) => medicine._id
    );
  }

  // =======================================
  // Inventory Query
  // =======================================

  const inventoryQuery = {};

  // Search
  if (medicineIds !== null) {
    inventoryQuery.medicine = {
      $in: medicineIds,
    };
  }

  // =======================================
  // Filters
  // =======================================

  if (filter === "low-stock") {
    inventoryQuery.currentStock = {
      $gt: 0,
      $lte: 10,
    };
  }

  if (filter === "out-of-stock") {
    inventoryQuery.currentStock = 0;
  }

  // =======================================
  // Near Expiry / Expired
  // =======================================

  if (
    filter === "near-expiry" ||
    filter === "expired"
  ) {
    const today = new Date();

    if (filter === "near-expiry") {
      const next30Days = new Date();

      next30Days.setDate(
        today.getDate() + 30
      );

      const medicines = await Medicine.find({
        expiryDate: {
          $gte: today,
          $lte: next30Days,
        },
      }).select("_id");

      const expiryMedicineIds =
        medicines.map(
          (medicine) => medicine._id
        );

      inventoryQuery.medicine = {
        $in: expiryMedicineIds,
      };
    }

    if (filter === "expired") {
      const medicines = await Medicine.find({
        expiryDate: {
          $lt: today,
        },
      }).select("_id");

      const expiredMedicineIds =
        medicines.map(
          (medicine) => medicine._id
        );

      inventoryQuery.medicine = {
        $in: expiredMedicineIds,
      };
    }
  }

  // =======================================
  // Count
  // =======================================

  const totalItems =
    await Inventory.countDocuments(
      inventoryQuery
    );

  // =======================================
  // Fetch Paginated Data
  // =======================================

  const inventory =
    await Inventory.find(inventoryQuery)
      .populate(
        "medicine",
        `
          medicineName
          genericName
          company
          category
          batchNumber
          expiryDate
        `
      )
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

  const totalPages =
    Math.ceil(totalItems / limit) || 1;

  return {
    inventory,
    totalItems,
    totalPages,
    currentPage: page,
    limit,
  };
};

// =======================================
// Get All Inventory
// =======================================

export const getAllInventoryService = async ({
  search,
  page,
  limit,
}) => {
  const result =
    await getInventoryWithPagination({
      search,
      page,
      limit,
      filter: "all",
    });

  return {
    message: MESSAGES.INVENTORY_FETCHED,
    ...result,
  };
};

// =======================================
// Get Inventory By Medicine
// =======================================

export const getInventoryByMedicineService =
  async (medicineId) => {
    const inventory =
      await Inventory.findOne({
        medicine: medicineId,
      })
        .populate(
          "medicine",
          `
            medicineName
            genericName
            company
            category
            batchNumber
            expiryDate
          `
        )
        .lean();

    if (!inventory) {
      const error = new Error(
        MESSAGES.INVENTORY_NOT_FOUND
      );

      error.statusCode = 404;

      throw error;
    }

    return {
      message:
        MESSAGES.INVENTORY_FETCHED,
      inventory,
    };
  };

// =======================================
// Get Low Stock Medicines
// =======================================

export const getLowStockMedicinesService =
  async ({
    search,
    page,
    limit,
  }) => {
    const result =
      await getInventoryWithPagination({
        search,
        page,
        limit,
        filter: "low-stock",
      });

    return {
      message:
        MESSAGES.LOW_STOCK_MEDICINES_FETCHED,
      ...result,
    };
  };

// =======================================
// Get Out Of Stock Medicines
// =======================================

export const getOutOfStockMedicinesService =
  async ({
    search,
    page,
    limit,
  }) => {
    const result =
      await getInventoryWithPagination({
        search,
        page,
        limit,
        filter: "out-of-stock",
      });

    return {
      message:
        MESSAGES.OUT_OF_STOCK_MEDICINES_FETCHED,
      ...result,
    };
  };

// =======================================
// Get Near Expiry Medicines
// =======================================

export const getNearExpiryMedicinesService =
  async ({
    search,
    page,
    limit,
  }) => {
    const result =
      await getInventoryWithPagination({
        search,
        page,
        limit,
        filter: "near-expiry",
      });

    return {
      message:
        MESSAGES.NEAR_EXPIRY_MEDICINES_FETCHED,
      ...result,
    };
  };

// =======================================
// Get Expired Medicines
// =======================================

export const getExpiredMedicinesService =
  async ({
    search,
    page,
    limit,
  }) => {
    const result =
      await getInventoryWithPagination({
        search,
        page,
        limit,
        filter: "expired",
      });

    return {
      message:
        "Expired medicines fetched successfully.",
      ...result,
    };
  };

// =======================================
// Stock Movement History
// =======================================

export const getStockMovementHistoryService =
  async (medicineId) => {
    const purchases =
      await Purchase.find({
        "medicines.medicine":
          medicineId,
      }).lean();

    const sales =
      await Sale.find({
        "medicines.medicine":
          medicineId,
      }).lean();

    const purchaseHistory =
      purchases.flatMap(
        (purchase) =>
          purchase.medicines
            .filter(
              (item) =>
                item.medicine.toString() ===
                medicineId
            )
            .map((item) => ({
              date:
                purchase.purchaseDate,
              type: "PURCHASE",
              quantity: item.quantity,
              invoiceNumber:
                purchase.invoiceNumber,
            }))
      );

    const saleHistory =
      sales.flatMap(
        (sale) =>
          sale.medicines
            .filter(
              (item) =>
                item.medicine.toString() ===
                medicineId
            )
            .map((item) => ({
              date: sale.saleDate,
              type: "SALE",
              quantity: item.quantity,
              invoiceNumber:
                sale.invoiceNumber,
            }))
      );

    const history = [
      ...purchaseHistory,
      ...saleHistory,
    ].sort(
      (a, b) =>
        new Date(a.date) -
        new Date(b.date)
    );

    return {
      message:
        MESSAGES.STOCK_HISTORY_FETCHED,
      history,
    };
  };