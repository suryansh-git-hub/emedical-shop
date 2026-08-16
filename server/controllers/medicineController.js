import {
  createMedicineService,
  getAllMedicinesService,
  getMedicineByIdService,
  updateMedicineService,
  deleteMedicineService,
} from "../services/medicineService.js";

// =======================================
// Create Medicine
// =======================================

export const createMedicine = async (
  req,
  res
) => {
  try {
    const medicineData = {
      ...req.body,
    };

    // =======================================
    // Medicine Image
    // =======================================

    if (req.file) {
      medicineData.medicineImage =
        req.file.filename;
    }

    const result =
      await createMedicineService(
        medicineData
      );

    return res.status(201).json({
      success: true,
      message: result.message,
      medicine: result.medicine,
    });
  } catch (error) {
    return res.status(
      error.statusCode || 500
    ).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================
// Get All Medicines
// Search + Filter + Pagination
// =======================================

export const getAllMedicines = async (
  req,
  res
) => {
  try {
    const result =
      await getAllMedicinesService(
        req.query
      );

    // =======================================
    // Disable Browser / Proxy Cache
    // =======================================

    res.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );

    res.set(
      "Pragma",
      "no-cache"
    );

    res.set(
      "Expires",
      "0"
    );

    return res.status(200).json({
      success: true,
      message: result.message,
      medicines:
        result.medicines,
      currentPage:
        result.currentPage,
      totalPages:
        result.totalPages,
      totalMedicines:
        result.totalMedicines,
    });
  } catch (error) {
    return res.status(
      error.statusCode || 500
    ).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================
// Get Medicine By ID
// =======================================

export const getMedicineById = async (
  req,
  res
) => {
  try {
    const result =
      await getMedicineByIdService(
        req.params.id
      );

    return res.status(200).json({
      success: true,
      message: result.message,
      medicine: result.medicine,
    });
  } catch (error) {
    return res.status(
      error.statusCode || 500
    ).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================
// Update Medicine
// =======================================

export const updateMedicine = async (
  req,
  res
) => {
  try {
    const medicineData = {
      ...req.body,
    };

    // =======================================
    // New Medicine Image
    // =======================================
    // If user uploads a new image,
    // send the new filename.
    //
    // If no image is uploaded,
    // medicineImage is NOT added here,
    // so the existing image remains unchanged.

    if (req.file) {
      medicineData.medicineImage =
        req.file.filename;
    }

    const result =
      await updateMedicineService(
        req.params.id,
        medicineData
      );

    return res.status(200).json({
      success: true,
      message: result.message,
      medicine: result.medicine,
    });
  } catch (error) {
    return res.status(
      error.statusCode || 500
    ).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================
// Delete Medicine
// =======================================

export const deleteMedicine = async (
  req,
  res
) => {
  try {
    const result =
      await deleteMedicineService(
        req.params.id
      );

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    return res.status(
      error.statusCode || 500
    ).json({
      success: false,
      message: error.message,
    });
  }
};