import Purchase from "../models/purchaseModel.js";
import Supplier from "../models/supplierModel.js";
import Medicine from "../models/medicineModel.js";
import Inventory from "../models/inventoryModel.js";

import { MESSAGES } from "../constants/messages.js";

// =======================================
// Create Purchase
// =======================================

export const createPurchaseService =
  async (
    data,
    userId
  ) => {
    const {
      supplier,
      purchaseDate,
      medicines,
    } = data;

    // =====================================
    // Validate Medicines
    // =====================================

    if (
      !medicines ||
      !Array.isArray(medicines) ||
      medicines.length === 0
    ) {
      throw new Error(
        "At least one medicine is required."
      );
    }

    // =====================================
    // Check Supplier
    // =====================================

    const supplierExists =
      await Supplier.findById(
        supplier
      );

    if (!supplierExists) {
      const error = new Error(
        MESSAGES.SUPPLIER_NOT_FOUND
      );

      error.statusCode = 404;

      throw error;
    }

    // =====================================
    // Duplicate Medicine Check
    // =====================================

    const medicineIds =
      medicines.map(
        (item) =>
          item.medicine.toString()
      );

    if (
      new Set(medicineIds).size !==
      medicineIds.length
    ) {
      throw new Error(
        "Duplicate medicines are not allowed."
      );
    }

    // =====================================
    // Generate Invoice Number
    // =====================================

    let invoiceNumber;

    const lastPurchase =
      await Purchase.findOne()
        .sort({
          createdAt: -1,
        })
        .select(
          "invoiceNumber"
        );

    if (
      lastPurchase &&
      lastPurchase.invoiceNumber &&
      lastPurchase.invoiceNumber.startsWith(
        "PUR-"
      )
    ) {
      const lastNumber =
        parseInt(
          lastPurchase.invoiceNumber.split(
            "-"
          )[1],
          10
        );

      invoiceNumber =
        `PUR-${String(
          lastNumber + 1
        ).padStart(5, "0")}`;
    } else {
      invoiceNumber =
        "PUR-00001";
    }

    // =====================================
    // Variables
    // =====================================

    let totalAmount = 0;

    const purchaseMedicines = [];
    const inventoryUpdates = [];

    // =====================================
    // Validate Each Medicine
    // =====================================

    for (
      const item of medicines
    ) {
      const quantity =
        Number(
          item.quantity
        );

      const purchasePrice =
        Number(
          item.purchasePrice
        );

      // ===================================
      // Quantity Validation
      // ===================================

      if (
        !Number.isInteger(
          quantity
        ) ||
        quantity <= 0
      ) {
        throw new Error(
          "Medicine quantity must be a positive whole number."
        );
      }

      // ===================================
      // Price Validation
      // ===================================

      if (
        !Number.isFinite(
          purchasePrice
        ) ||
        purchasePrice < 0
      ) {
        throw new Error(
          "Purchase price must be a valid number."
        );
      }

      // ===================================
      // Find Medicine
      // ===================================

      const medicine =
        await Medicine.findById(
          item.medicine
        ).select(
          "medicineName stock purchasePrice"
        );

      if (!medicine) {
        throw new Error(
          MESSAGES.MEDICINE_NOT_FOUND
        );
      }

      // ===================================
      // Find Inventory
      // ===================================

      let inventory =
        await Inventory.findOne({
          medicine:
            medicine._id,
        });

      // ===================================
      // Create Inventory If Missing
      // ===================================

      if (!inventory) {
        inventory =
          await Inventory.create({
            medicine:
              medicine._id,

            currentStock:
              Number(
                medicine.stock || 0
              ),

            reorderLevel: 20,
          });
      }

      // ===================================
      // Calculate Total
      // ===================================

      const itemTotal =
        purchasePrice *
        quantity;

      totalAmount +=
        itemTotal;

      // ===================================
      // Purchase Medicine
      // ===================================

      purchaseMedicines.push({
        medicine:
          medicine._id,

        quantity,

        purchasePrice,
      });

      // ===================================
      // Store Stock Update
      // ===================================

      inventoryUpdates.push({
        inventory,
        medicine,
        quantity,
      });
    }

    // =====================================
    // Create Purchase
    // =====================================

    const purchase =
      await Purchase.create({
        supplier,

        invoiceNumber,

        purchaseDate,

        medicines:
          purchaseMedicines,

        totalAmount,

        createdBy:
          userId,
      });

    // =====================================
    // UPDATE STOCK
    //
    // Medicine.stock += quantity
    // Inventory.currentStock += quantity
    // =====================================

    for (
      const item of inventoryUpdates
    ) {
      const quantity =
        Number(
          item.quantity
        );

      // ===================================
      // Update Medicine Stock
      // ===================================

      item.medicine.stock =
        Number(
          item.medicine.stock || 0
        ) + quantity;

      // ===================================
      // Update Inventory Stock
      // ===================================

      item.inventory.currentStock =
        Number(
          item.inventory.currentStock ||
            0
        ) + quantity;

      // ===================================
      // Save Medicine
      // ===================================

      await item.medicine.save();

      // ===================================
      // Save Inventory
      // ===================================

      await item.inventory.save();
    }

    // =====================================
    // Return
    // =====================================

    return {
      message:
        MESSAGES.PURCHASE_CREATED,

      purchase,
    };
  };

// =======================================
// Get All Purchases
// Search + Pagination
// =======================================

export const getAllPurchasesService =
  async (
    search = "",
    page = 1,
    limit = 10
  ) => {
    page = Math.max(
      Number(page) || 1,
      1
    );

    limit = Math.max(
      Number(limit) || 10,
      1
    );

    const skip =
      (page - 1) *
      limit;

    // =====================================
    // Search
    // =====================================

    const purchaseQuery = {};

    if (
      search &&
      search.trim()
    ) {
      const searchRegex =
        new RegExp(
          search.trim(),
          "i"
        );

      // Search invoice number
      purchaseQuery.invoiceNumber =
        searchRegex;
    }

    // =====================================
    // Total Items
    // =====================================

    const totalItems =
      await Purchase.countDocuments(
        purchaseQuery
      );

    // =====================================
    // Get Purchases
    // =====================================

    const purchases =
      await Purchase.find(
        purchaseQuery
      )
        .populate(
          "supplier",
          "supplierName contactNumber email"
        )
        .populate(
          "createdBy",
          "name email role"
        )
        .populate(
          "medicines.medicine",
          "medicineName genericName company category unit"
        )
        .sort({
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit)
        .lean();

    // =====================================
    // Pagination
    // =====================================

    const totalPages =
      Math.ceil(
        totalItems / limit
      ) || 1;

    return {
      message:
        MESSAGES.PURCHASES_FETCHED,

      purchases,

      totalItems,

      totalPages,

      currentPage: page,

      limit,
    };
  };

// =======================================
// Get Purchase By ID
// =======================================

export const getPurchaseByIdService =
  async (id) => {
    const purchase =
      await Purchase.findById(
        id
      )
        .populate(
          "supplier",
          "supplierName contactNumber email address"
        )
        .populate(
          "createdBy",
          "name email role"
        )
        .populate(
          "medicines.medicine",
          "medicineName genericName company category unit"
        )
        .lean();

    if (!purchase) {
      const error = new Error(
        MESSAGES.PURCHASE_NOT_FOUND
      );

      error.statusCode = 404;

      throw error;
    }

    return {
      message:
        MESSAGES.PURCHASE_FETCHED,

      purchase,
    };
  };