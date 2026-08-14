import Medicine from "../models/medicineModel.js";
import { MESSAGES } from "../constants/messages.js";
import Inventory from "../models/inventoryModel.js";
import Purchase from "../models/purchaseModel.js";
import Sale from "../models/saleModel.js";

// =======================================
// Create Medicine
// =======================================

export const createMedicineService = async (
  medicineData
) => {
  const existingMedicine =
    await Medicine.findOne({
      batchNumber:
        medicineData.batchNumber,
    });

  if (existingMedicine) {
    const error = new Error(
      MESSAGES.MEDICINE_ALREADY_EXISTS
    );

    error.statusCode = 409;
    throw error;
  }

  if (
    Number(medicineData.sellingPrice) <
    Number(medicineData.purchasePrice)
  ) {
    const error = new Error(
      "Selling price cannot be less than purchase price."
    );

    error.statusCode = 400;
    throw error;
  }

  const medicine =
    await Medicine.create(
      medicineData
    );

  return {
    message:
      MESSAGES.MEDICINE_CREATED,

    medicine,
  };
};

// =======================================
// Get All Medicines
// Search + Filter + Pagination
// =======================================

export const getAllMedicinesService =
  async (query) => {
    const {
      search = "",
      category,
      company,
      expiry,
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      order = "desc",
    } = query;

    // =======================================
    // Filter
    // =======================================

    const filter = {};

    // =======================================
    // Search
    // Medicine Name
    // Generic Name
    // Batch Number
    // =======================================

    if (search.trim()) {
      const searchValue =
        search.trim();

      filter.$or = [
        {
          medicineName: {
            $regex: searchValue,
            $options: "i",
          },
        },
        {
          genericName: {
            $regex: searchValue,
            $options: "i",
          },
        },
        {
          batchNumber: {
            $regex: searchValue,
            $options: "i",
          },
        },
      ];
    }

    // =======================================
    // Filter by Category
    // =======================================

    if (category) {
      filter.category = category;
    }

    // =======================================
    // Filter by Company
    // =======================================

    if (company) {
      filter.company = {
        $regex: company,
        $options: "i",
      };
    }

    // =======================================
    // Filter by Expiry
    // =======================================

    const today = new Date();

    if (expiry === "expired") {
      filter.expiryDate = {
        $lt: today,
      };
    }

    if (expiry === "valid") {
      filter.expiryDate = {
        $gte: today,
      };
    }

    if (expiry === "near") {
      const next30Days =
        new Date();

      next30Days.setDate(
        today.getDate() + 30
      );

      filter.expiryDate = {
        $gte: today,
        $lte: next30Days,
      };
    }

    // =======================================
    // Pagination
    // =======================================

    const currentPage = Math.max(
      Number(page) || 1,
      1
    );

    const pageSize = Math.max(
      Number(limit) || 10,
      1
    );

    const skip =
      (currentPage - 1) *
      pageSize;

    // =======================================
    // Sorting
    // =======================================

    const sort = {};

    sort[sortBy] =
      order === "asc"
        ? 1
        : -1;

    // =======================================
    // Count Matching Medicines
    // =======================================

    const totalMedicines =
      await Medicine.countDocuments(
        filter
      );

    // =======================================
    // Get Medicines
    // =======================================

    const medicines =
      await Medicine.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(pageSize)
        .lean();

    // =======================================
    // Return
    // =======================================

    return {
      message:
        MESSAGES.MEDICINES_FETCHED,

      currentPage,

      totalPages:
        Math.ceil(
          totalMedicines /
            pageSize
        ) || 1,

      totalMedicines,

      medicines,
    };
  };

// =======================================
// Get Medicine By ID
// =======================================

export const getMedicineByIdService =
  async (id) => {
    const medicine =
      await Medicine.findById(id);

    if (!medicine) {
      const error = new Error(
        MESSAGES.MEDICINE_NOT_FOUND
      );

      error.statusCode = 404;
      throw error;
    }

    return {
      message:
        MESSAGES.MEDICINE_FETCHED,

      medicine,
    };
  };

// =======================================
// Update Medicine
// =======================================

export const updateMedicineService =
  async (
    id,
    medicineData
  ) => {
    const medicine =
      await Medicine.findById(id);

    if (!medicine) {
      const error = new Error(
        MESSAGES.MEDICINE_NOT_FOUND
      );

      error.statusCode = 404;
      throw error;
    }

    // =======================================
    // Check Duplicate Batch Number
    // =======================================

    if (
      medicineData.batchNumber &&
      medicineData.batchNumber !==
        medicine.batchNumber
    ) {
      const existingMedicine =
        await Medicine.findOne({
          batchNumber:
            medicineData.batchNumber,
        });

      if (existingMedicine) {
        const error = new Error(
          MESSAGES.MEDICINE_ALREADY_EXISTS
        );

        error.statusCode = 409;
        throw error;
      }
    }

    // =======================================
    // Validate Selling Price
    // =======================================

    const purchasePrice =
      medicineData.purchasePrice ??
      medicine.purchasePrice;

    const sellingPrice =
      medicineData.sellingPrice ??
      medicine.sellingPrice;

    if (
      Number(sellingPrice) <
      Number(purchasePrice)
    ) {
      const error = new Error(
        "Selling price cannot be less than purchase price."
      );

      error.statusCode = 400;
      throw error;
    }

    // =======================================
    // Update
    // =======================================

    Object.assign(
      medicine,
      medicineData
    );

    await medicine.save();

    return {
      message:
        MESSAGES.MEDICINE_UPDATED,

      medicine,
    };
  };

// =======================================
// Delete Medicine
// =======================================

export const deleteMedicineService =
  async (id) => {
    // =======================================
    // Check Medicine
    // =======================================

    const medicine =
      await Medicine.findById(id);

    if (!medicine) {
      const error = new Error(
        MESSAGES.MEDICINE_NOT_FOUND
      );

      error.statusCode = 404;
      throw error;
    }

    // =======================================
    // Check Purchase History
    // =======================================

    const purchaseExists =
      await Purchase.exists({
        "medicines.medicine": id,
      });

    if (purchaseExists) {
      const error = new Error(
        "Medicine cannot be deleted because it exists in purchase history."
      );

      error.statusCode = 400;
      throw error;
    }

    // =======================================
    // Check Sales History
    // =======================================

    const saleExists =
      await Sale.exists({
        "medicines.medicine": id,
      });

    if (saleExists) {
      const error = new Error(
        "Medicine cannot be deleted because it exists in sales history."
      );

      error.statusCode = 400;
      throw error;
    }

    // =======================================
    // Delete Inventory Record
    // =======================================

    await Inventory.deleteOne({
      medicine: id,
    });

    // =======================================
    // Delete Medicine
    // =======================================

    await Medicine.findByIdAndDelete(
      id
    );

    return {
      message:
        MESSAGES.MEDICINE_DELETED,
    };
  };