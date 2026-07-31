import {
  createMedicineService,
  getAllMedicinesService,
  getMedicineByIdService,
  updateMedicineService,
  deleteMedicineService,
} from "../services/medicineService.js";

export const createMedicine = async (req, res) => {
  try {
    // Create a new object from the request body
    const medicineData = {
      ...req.body,
    };

    // If an image was uploaded, save its filename
    if (req.file) {
      medicineData.medicineImage = req.file.filename;
    }

    const result = await createMedicineService(medicineData);

    res.status(201).json({
      success: true,
      message: result.message,
      medicine: result.medicine,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllMedicines = async (req, res) => {
  try {
    const result = await getAllMedicinesService(req.query);

    res.status(200).json({
      success: true,
      message: result.message,
      medicines: result.medicines,
       currentPage: result.currentPage,
  totalPages: result.totalPages,
  totalMedicines: result.totalMedicines,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMedicineById = async (req, res) => {
  try {
    const result = await getMedicineByIdService(req.params.id);

    res.status(200).json({
      success: true,
      message: result.message,
      medicine: result.medicine,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateMedicine = async (req, res) => {
  try {
    // Create a new object from the request body
    const medicineData = {
      ...req.body,
    };

    // If a new image was uploaded, replace the old filename
    if (req.file) {
      medicineData.medicineImage = req.file.filename;
    }

    const result = await updateMedicineService(
      req.params.id,
      medicineData
    );

    res.status(200).json({
      success: true,
      message: result.message,
      medicine: result.medicine,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteMedicine = async (req, res) => {
  try {
    const result = await deleteMedicineService(req.params.id);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};