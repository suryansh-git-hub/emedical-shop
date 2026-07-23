import Medicine from "../models/medicineModel.js";
import { MESSAGES } from "../constants/messages.js";

export const createMedicineService = async (medicineData) => {
  const existingMedicine = await Medicine.findOne({
    batchNumber: medicineData.batchNumber,
  });

  if (existingMedicine) {
    const error = new Error("Medicine with this batch number already exists.");
    error.statusCode = 409;
    throw error;
  }

  const medicine = await Medicine.create(medicineData);

  return {
    message: "Medicine added successfully.",
    medicine,
  };
};

export const getAllMedicinesService = async () => {
  const medicines = await Medicine.find();

  return {
    message: MESSAGES.MEDICINES_FETCHED,
    medicines,
  };
};

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

export const updateMedicineService = async (id, medicineData) => {
  const medicine = await Medicine.findById(id);

  if (!medicine) {
    const error = new Error(MESSAGES.MEDICINE_NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }

  // Check duplicate batch number
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

  Object.assign(medicine, medicineData);

  await medicine.save();

  return {
    message: MESSAGES.MEDICINE_UPDATED,
    medicine,
  };
};

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