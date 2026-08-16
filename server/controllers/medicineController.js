import {
  createMedicineService,
  getAllMedicinesService,
  getMedicineByIdService,
  updateMedicineService,
  deleteMedicineService,
} from "../services/medicineService.js";

import uploadImageToCloudinary from "../utils/uploadImageToCloudinary.js";

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

    // If an image was uploaded, send it to
    // Cloudinary and store the permanent URL
    if (req.file) {
      medicineData.medicineImage =
        await uploadImageToCloudinary(
          req.file
        );
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

    // If a new image was uploaded, send it
    // to Cloudinary and store the permanent
    // URL
    if (req.file) {
      medicineData.medicineImage =
        await uploadImageToCloudinary(
          req.file
        );
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