import Inventory from "../models/inventoryModel.js";
import Medicine from "../models/medicineModel.js";
import Purchase from "../models/purchaseModel.js";
import Sale from "../models/saleModel.js";

import { MESSAGES } from "../constants/messages.js";

// =======================================
// Common Medicine Populate Fields
// =======================================

const MEDICINE_FIELDS = `
  medicineName
  genericName
  company
  category
  batchNumber
  expiryDate
  stock
  unit
  purchasePrice
  sellingPrice
  gst
  medicineImage
`;

// =======================================
// Common Inventory Query
// Search + Filter + Pagination
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
  // Medicine Query
  // =======================================

  const medicineQuery = {};

  // =======================================
  // Search
  // =======================================

  if (search.trim()) {
    const escapedSearch = search
      .trim()
      .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const searchRegex = new RegExp(
      escapedSearch,
      "i"
    );

    medicineQuery.$or = [
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
    ];
  }

  // =======================================
  // Near Expiry
  // =======================================

  if (filter === "near-expiry") {
    const today = new Date();

    const next30Days = new Date();

    next30Days.setDate(
      today.getDate() + 30
    );

    medicineQuery.expiryDate = {
      $gte: today,
      $lte: next30Days,
    };
  }

  // =======================================
  // Expired
  // =======================================

  if (filter === "expired") {
    const today = new Date();

    medicineQuery.expiryDate = {
      $lt: today,
    };
  }

  // =======================================
  // Find Matching Medicines
  // =======================================

  const medicines =
    await Medicine.find(
      medicineQuery
    ).select("_id");

  const medicineIds =
    medicines.map(
      (medicine) => medicine._id
    );

  // =======================================
  // Inventory Query
  // =======================================

  const inventoryQuery = {
    medicine: {
      $in: medicineIds,
    },
  };

  // =======================================
  // Low Stock
  // =======================================

  if (filter === "low-stock") {
    inventoryQuery.$expr = {
      $and: [
        {
          $gt: [
            "$currentStock",
            0,
          ],
        },
        {
          $lte: [
            "$currentStock",
            "$reorderLevel",
          ],
        },
      ],
    };
  }

  // =======================================
  // Out Of Stock
  // =======================================

  if (filter === "out-of-stock") {
    inventoryQuery.currentStock = 0;
  }

  // =======================================
  // Total Records
  // =======================================

  const totalItems =
    await Inventory.countDocuments(
      inventoryQuery
    );

  // =======================================
  // Paginated Inventory
  // =======================================

  const inventory =
    await Inventory.find(
      inventoryQuery
    )
      .populate(
        "medicine",
        MEDICINE_FIELDS
      )
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit)
      .lean();

  // =======================================
  // Pagination
  // =======================================

  const totalPages =
    Math.ceil(
      totalItems / limit
    ) || 1;

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

export const getAllInventoryService =
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
        filter: "all",
      });

    return {
      message:
        MESSAGES.INVENTORY_FETCHED,
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
          MEDICINE_FIELDS
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
// UPDATE INVENTORY STOCK
//
// action:
// "increase"
// "decrease"
// =======================================

export const updateInventoryStockService =
  async (
    medicineId,
    action,
    quantity
  ) => {
    // =======================================
    // Validate Quantity
    // =======================================

    const stockQuantity =
      Number(quantity);

    if (
      !Number.isInteger(
        stockQuantity
      ) ||
      stockQuantity <= 0
    ) {
      const error = new Error(
        "Stock quantity must be a positive whole number."
      );

      error.statusCode = 400;

      throw error;
    }

    // =======================================
    // Validate Action
    // =======================================

    if (
      action !== "increase" &&
      action !== "decrease"
    ) {
      const error = new Error(
        "Invalid stock action. Use increase or decrease."
      );

      error.statusCode = 400;

      throw error;
    }

    // =======================================
    // Find Medicine
    // =======================================

    const medicine =
      await Medicine.findById(
        medicineId
      );

    if (!medicine) {
      const error = new Error(
        MESSAGES.MEDICINE_NOT_FOUND
      );

      error.statusCode = 404;

      throw error;
    }

    // =======================================
    // Find Inventory
    // =======================================

    let inventory =
      await Inventory.findOne({
        medicine: medicineId,
      });

    // =======================================
    // Create Inventory If Missing
    // =======================================

    if (!inventory) {
      inventory =
        await Inventory.create({
          medicine: medicineId,

          currentStock:
            Number(
              medicine.stock || 0
            ),

          reorderLevel: 20,
        });
    }

    // =======================================
    // Current Stock
    // =======================================

    const currentStock =
      Number(
        inventory.currentStock || 0
      );

    const medicineStock =
      Number(
        medicine.stock || 0
      );

    // =======================================
    // Increase Stock
    // =======================================

    if (action === "increase") {
      inventory.currentStock =
        currentStock +
        stockQuantity;

      medicine.stock =
        medicineStock +
        stockQuantity;
    }

    // =======================================
    // Decrease Stock
    // =======================================

    if (action === "decrease") {
      if (
        currentStock <
        stockQuantity
      ) {
        const error = new Error(
          `Cannot decrease stock below 0. Only ${currentStock} units are available.`
        );

        error.statusCode = 400;

        throw error;
      }

      if (
        medicineStock <
        stockQuantity
      ) {
        const error = new Error(
          `Medicine stock is lower than requested quantity. Only ${medicineStock} units are available.`
        );

        error.statusCode = 400;

        throw error;
      }

      inventory.currentStock =
        currentStock -
        stockQuantity;

      medicine.stock =
        medicineStock -
        stockQuantity;
    }

    // =======================================
    // Save Both
    // =======================================

    await inventory.save();

    await medicine.save();

    // =======================================
    // Return Updated Inventory
    // =======================================

    const updatedInventory =
      await Inventory.findById(
        inventory._id
      )
        .populate(
          "medicine",
          MEDICINE_FIELDS
        )
        .lean();

    return {
      message:
        action === "increase"
          ? "Stock increased successfully."
          : "Stock decreased successfully.",

      inventory:
        updatedInventory,

      currentStock:
        updatedInventory.currentStock,

      medicineStock:
        updatedInventory.medicine.stock,
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
    // =======================================
    // Verify Medicine
    // =======================================

    const medicine =
      await Medicine.findById(
        medicineId
      ).select("_id");

    if (!medicine) {
      const error = new Error(
        MESSAGES.MEDICINE_NOT_FOUND
      );

      error.statusCode = 404;

      throw error;
    }

    // =======================================
    // Get Purchases
    // =======================================

    const purchases =
      await Purchase.find({
        "medicines.medicine":
          medicineId,
      })
        .select(
          "medicines invoiceNumber purchaseDate createdAt"
        )
        .lean();

    // =======================================
    // Get Sales
    // =======================================

    const sales =
      await Sale.find({
        "medicines.medicine":
          medicineId,
      }).lean();

    // =======================================
    // Purchase History
    // =======================================

    const purchaseHistory =
      purchases.flatMap(
        (purchase) =>
          purchase.medicines
            .filter(
              (item) =>
                item.medicine.toString() ===
                medicineId.toString()
            )
            .map((item) => ({
              // purchaseDate is just the
              // calendar day the user picked
              // (no real time), so it always
              // shows as 5:30am / midnight
              // UTC. createdAt is the actual
              // moment this purchase was
              // logged, so use that instead.
              date:
                purchase.createdAt ||
                purchase.purchaseDate,

              type: "PURCHASE",

              quantity:
                Number(
                  item.quantity
                ),

              invoiceNumber:
                purchase.invoiceNumber,
            }))
      );

    // =======================================
    // Sale History
    // =======================================

    const saleHistory =
      sales.flatMap(
        (sale) =>
          sale.medicines
            .filter(
              (item) =>
                item.medicine.toString() ===
                medicineId.toString()
            )
            .map((item) => ({
              date:
                sale.saleDate,

              type: "SALE",

              quantity:
                Number(
                  item.quantity
                ),

              invoiceNumber:
                sale.invoiceNumber,
            }))
      );

    // =======================================
    // Combine + Sort
    // Newest First
    // =======================================

    const history = [
      ...purchaseHistory,
      ...saleHistory,
    ].sort(
      (a, b) =>
        new Date(b.date) -
        new Date(a.date)
    );

    // =======================================
    // Response
    // =======================================

    return {
      message:
        MESSAGES.STOCK_HISTORY_FETCHED,

      history,
    };
  };