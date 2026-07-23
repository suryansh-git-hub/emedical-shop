import Supplier from "../models/supplierModel.js";
import { MESSAGES } from "../constants/messages.js";

export const createSupplierService = async (supplierData) => {
  const { email, gstNumber } = supplierData;

  // Check if supplier already exists by email or GST number
  const existingSupplier = await Supplier.findOne({
    $or: [{ email }, { gstNumber }],
  });

  if (existingSupplier) {
    throw new Error(MESSAGES.SUPPLIER_ALREADY_EXISTS);
  }

  const supplier = await Supplier.create(supplierData);

  return {
    message: MESSAGES.SUPPLIER_CREATED,
    supplier,
  };
};

export const getAllSuppliersService = async() => {
  const suppliers = await Supplier.find();
  return {
    message: MESSAGES.SUPPLIERS_FETCHED,
    suppliers,
  }
}

export const getSupplierByIdService = async (id) => {
  const supplier = await Supplier.findById(id);

  if (!supplier) {
    throw new Error(MESSAGES.SUPPLIER_NOT_FOUND);
  }

  return {
    message: MESSAGES.SUPPLIER_FETCHED,
    supplier,
  };
};

export const updateSupplierService = async (id, supplierData) => {
  const supplier = await Supplier.findById(id);

  if (!supplier) {
    throw new Error(MESSAGES.SUPPLIER_NOT_FOUND);
  }

  // Check if email is being changed
  if (
    supplierData.email &&
    supplierData.email !== supplier.email
  ) {
    const existingEmail = await Supplier.findOne({
      email: supplierData.email,
    });

    if (existingEmail) {
      throw new Error(MESSAGES.SUPPLIER_ALREADY_EXISTS);
    }
  }

  // Check if GST Number is being changed
  if (
    supplierData.gstNumber &&
    supplierData.gstNumber !== supplier.gstNumber
  ) {
    const existingGST = await Supplier.findOne({
      gstNumber: supplierData.gstNumber,
    });

    if (existingGST) {
      throw new Error(MESSAGES.SUPPLIER_ALREADY_EXISTS);
    }
  }

  Object.assign(supplier, supplierData);

  await supplier.save();

  return {
    message: MESSAGES.SUPPLIER_UPDATED,
    supplier,
  };
};

export const deleteSupplierService = async (id) => {
  const supplier = await Supplier.findById(id);

  if (!supplier) {
    throw new Error(MESSAGES.SUPPLIER_NOT_FOUND);
  }

  await Supplier.findByIdAndDelete(id);

  return {
    message: MESSAGES.SUPPLIER_DELETED,
  };
};