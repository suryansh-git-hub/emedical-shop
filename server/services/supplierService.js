import Supplier from "../models/supplierModel.js";
import Purchase from "../models/purchaseModel.js";
import { MESSAGES } from "../constants/messages.js";

// ==========================
// Create Supplier
// ==========================
export const createSupplierService = async (supplierData) => {
  const { email, gstNumber } = supplierData;

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

// ==========================
// Get All Suppliers
// ==========================
export const getAllSuppliersService = async () => {
  const suppliers = await Supplier.find();

  return {
    message: MESSAGES.SUPPLIERS_FETCHED,
    suppliers,
  };
};

// ==========================
// Get Supplier By ID
// ==========================
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

// ==========================
// Update Supplier
// ==========================
export const updateSupplierService = async (
  id,
  supplierData
) => {
  const supplier = await Supplier.findById(id);

  if (!supplier) {
    throw new Error(MESSAGES.SUPPLIER_NOT_FOUND);
  }

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

// ==========================
// Delete Supplier
// ==========================
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

// ==========================
// Supplier Purchase History
// ==========================
export const getSupplierPurchaseHistoryService =
  async (supplierId) => {
    const supplier = await Supplier.findById(
      supplierId
    );

    if (!supplier) {
      throw new Error(
        MESSAGES.SUPPLIER_NOT_FOUND
      );
    }

    const purchases = await Purchase.find({
      supplier: supplierId,
    })
      .populate(
        "medicines.medicine",
        "medicineName purchasePrice"
      )
      .sort({ purchaseDate: -1 })
      .lean();

    const totalPurchases =
      purchases.length;

    const totalSpent = purchases.reduce(
      (sum, purchase) =>
        sum + purchase.totalAmount,
      0
    );

    return {
      message:
        "Supplier purchase history fetched successfully.",
      supplier,
      totalPurchases,
      totalSpent,
      purchases,
    };
  };