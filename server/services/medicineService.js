import Medicine from "../models/medicineModel.js";
import { MESSAGES } from "../constants/messages.js";

// =======================================
// Create Medicine
// =======================================
export const createMedicineService = async (medicineData) => {
  const existingMedicine = await Medicine.findOne({
    batchNumber: medicineData.batchNumber,
  });

  if (existingMedicine) {
    const error = new Error(MESSAGES.MEDICINE_ALREADY_EXISTS);
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

  const medicine = await Medicine.create(medicineData);

  

  return {
    message: MESSAGES.MEDICINE_CREATED,
    medicine,
  };
};

// =======================================
// Get All Medicines
// =======================================
export const getAllMedicinesService = async (query) => {
  const {
    search,
    category,
    company,
    expiry,
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    order = "desc",
  } = query;

  const filter = {};

  // ==========================
  // Search
  // ==========================
  if (search) {
    filter.$or = [
      {
        medicineName: {
          $regex: search,
          $options: "i",
        },
      },
      {
        genericName: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  // ==========================
  // Filter by Category
  // ==========================
  if (category) {
    filter.category = category;
  }

  // ==========================
  // Filter by Company
  // ==========================
  if (company) {
  filter.company = {
    $regex: company,
    $options: "i",
  };
}

  // ==========================
  // Filter by Expiry
  // ==========================
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
    const next30Days = new Date();
    next30Days.setDate(today.getDate() + 30);

    filter.expiryDate = {
      $gte: today,
      $lte: next30Days,
    };
  }

  // ==========================
  // Pagination
  // ==========================
  const currentPage = Number(page);
  const pageSize = Number(limit);

  const skip = (currentPage - 1) * pageSize;

  // ==========================
  // Sorting
  // ==========================
  const sort = {};

  sort[sortBy] = order === "asc" ? 1 : -1;

  // ==========================
  // Database Query
  // ==========================
  const totalMedicines = await Medicine.countDocuments(filter);

  const medicines = await Medicine.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(pageSize)
    .lean();

  return {
    message: MESSAGES.MEDICINES_FETCHED,
    currentPage,
    totalPages: Math.ceil(totalMedicines / pageSize),
    totalMedicines,
    medicines,
  };
};

// =======================================
// Get Medicine By ID
// =======================================
export const getMedicineByIdService = async (id) => {
  const medicine = await Medicine.findById(id);

  if (!medicine) {
    const error = new Error(MESSAGES.MEDICINE_NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }

  return {
    message: MESSAGES.MEDICINE_FETCHED,
    medicine,
  };
};

// =======================================
// Update Medicine
// =======================================
export const updateMedicineService = async (id, medicineData) => {
  const medicine = await Medicine.findById(id);

  if (!medicine) {
    const error = new Error(MESSAGES.MEDICINE_NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }

  if (
    medicineData.batchNumber &&
    medicineData.batchNumber !== medicine.batchNumber
  ) {
    const existingMedicine = await Medicine.findOne({
      batchNumber: medicineData.batchNumber,
    });

    if (existingMedicine) {
      const error = new Error(MESSAGES.MEDICINE_ALREADY_EXISTS);
      error.statusCode = 409;
      throw error;
    }
  }

  const purchasePrice =
  medicineData.purchasePrice ??
  medicine.purchasePrice;

const sellingPrice =
  medicineData.sellingPrice ??
  medicine.sellingPrice;

if (Number(sellingPrice) < Number(purchasePrice)) {
  const error = new Error(
    "Selling price cannot be less than purchase price."
  );

  error.statusCode = 400;

  throw error;
}

  Object.assign(medicine, medicineData);

  await medicine.save();

  return {
    message: MESSAGES.MEDICINE_UPDATED,
    medicine,
  };
};

// =======================================
// Delete Medicine
// =======================================
export const deleteMedicineService = async (id) => {
  const medicine = await Medicine.findById(id);

  if (!medicine) {
    const error = new Error(MESSAGES.MEDICINE_NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }

  await Medicine.findByIdAndDelete(id);

  return {
    message: MESSAGES.MEDICINE_DELETED,
  };
};