import Purchase from "../models/purchaseModel.js";
import Supplier from "../models/supplierModel.js";
import Medicine from "../models/medicineModel.js";
import { MESSAGES } from "../constants/messages.js";
import Inventory from "../models/inventoryModel.js";

// ==========================
// Create Purchase
// ==========================
export const createPurchaseService = async (
  data,
  userId
) => {
  const {
    supplier,
    invoiceNumber,
    purchaseDate,
    medicines,
  } = data;

  // Check if medicines array is provided
  if (!medicines || medicines.length === 0) {
    throw new Error(
      "At least one medicine is required."
    );
  }

  // Check duplicate invoice
  const existingPurchase =
    await Purchase.findOne({
      invoiceNumber,
    });

  if (existingPurchase) {
    throw new Error(
      MESSAGES.PURCHASE_ALREADY_EXISTS
    );
  }

  // Check supplier
  const supplierData =
    await Supplier.findById(supplier);

  if (!supplierData) {
    throw new Error(
      MESSAGES.SUPPLIER_NOT_FOUND
    );
  }

  let totalAmount = 0;

  // Validate medicines, calculate total & update inventory
  for (const item of medicines) {
    const medicine =
      await Medicine.findById(
        item.medicine
      );

    if (!medicine) {
      throw new Error(
        MESSAGES.MEDICINE_NOT_FOUND
      );
    }

    totalAmount +=
      item.quantity *
      item.purchasePrice;

    // Check inventory
    let inventory =
      await Inventory.findOne({
        medicine: item.medicine,
      });

    if (inventory) {
      // Increase stock
      inventory.currentStock +=
        item.quantity;

      await inventory.save();
    } else {
      // Create inventory record
      await Inventory.create({
        medicine: item.medicine,
        currentStock: item.quantity,
        reorderLevel: 20,
      });
    }
  }

  // Create Purchase
  const purchase =
    await Purchase.create({
      supplier,
      invoiceNumber,
      purchaseDate,
      medicines,
      totalAmount,
      createdBy: userId,
    });

  return {
    message: MESSAGES.PURCHASE_CREATED,
    purchase,
  };
};

// ==========================
// Get All Purchases
// Supports:
// - Search by invoice number
// - Search by supplier name
// - Pagination
// ==========================
export const getAllPurchasesService = async (
  search = "",
  page = 1,
  limit = 10
) => {
  // Convert values safely to numbers
  page = Math.max(
    Number(page) || 1,
    1
  );

  limit = Math.max(
    Number(limit) || 10,
    1
  );

  const skip = (page - 1) * limit;

  // ==========================================
  // Search Filter
  // ==========================================

  const filter = {};

  if (search.trim()) {
    const searchValue =
      search.trim();

    // Find suppliers matching supplier name
    const matchingSuppliers =
      await Supplier.find({
        supplierName: {
          $regex: searchValue,
          $options: "i",
        },
      }).select("_id");

    const supplierIds =
      matchingSuppliers.map(
        (supplier) => supplier._id
      );

    // Search invoice OR supplier
    filter.$or = [
      {
        invoiceNumber: {
          $regex: searchValue,
          $options: "i",
        },
      },
      {
        supplier: {
          $in: supplierIds,
        },
      },
    ];
  }

  // ==========================================
  // Total Purchases
  // ==========================================

  const totalPurchases =
    await Purchase.countDocuments(
      filter
    );

  // ==========================================
  // Get Purchases
  // ==========================================

  const purchases =
    await Purchase.find(filter)
      .populate(
        "supplier",
        "supplierName contactNumber"
      )
      .populate(
        "createdBy",
        "name email role"
      )
      .populate(
        "medicines.medicine",
        "medicineName company"
      )
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit)
      .lean();

  // ==========================================
  // Total Pages
  // ==========================================

  const totalPages =
    Math.max(
      Math.ceil(
        totalPurchases / limit
      ),
      1
    );

  return {
    message:
      MESSAGES.PURCHASES_FETCHED,

    purchases,

    totalPurchases,

    totalPages,

    currentPage: page,

    limit,
  };
};

// ==========================
// Get Purchase By ID
// ==========================
export const getPurchaseByIdService =
  async (id) => {
    const purchase =
      await Purchase.findById(id)
        .populate(
          "supplier",
          "supplierName contactNumber"
        )
        .populate(
          "createdBy",
          "name email role"
        )
        .populate(
          "medicines.medicine",
          "medicineName company"
        )
        .lean();

    if (!purchase) {
      throw new Error(
        MESSAGES.PURCHASE_NOT_FOUND
      );
    }

    return {
      message:
        MESSAGES.PURCHASE_FETCHED,
      purchase,
    };
  };