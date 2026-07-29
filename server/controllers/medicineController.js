import { createMedicineService,getAllMedicinesService,getMedicineByIdService,updateMedicineService, deleteMedicineService} from "../services/medicineService.js";

export const createMedicine = async (req, res) => {
  try {
    const result = await createMedicineService(req.body);

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
    const result = await updateMedicineService(
      req.params.id,
      req.body
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